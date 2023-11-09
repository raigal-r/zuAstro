import { Emitter } from "@pcd/emitter";
import { getHash } from "@pcd/passport-crypto";
import {
  matchActionToPermission,
  PCDAction,
  PCDCollection,
  PCDPermission
} from "@pcd/pcd-collection";
import { ArgsOf, PCDPackage, PCDTypeNameOf } from "@pcd/pcd-types";
import { isFulfilled } from "@pcd/util";
import stringify from "fast-json-stable-stringify";
import { v4 as uuid } from "uuid";
import { CredentialManagerAPI } from "./CredentialManager";
import { IFeedApi } from "./FeedAPI";
import { ListFeedsResponseValue } from "./RequestTypes";

export const enum ZupassFeedIds {
  Devconnect = "1",
  Frogs = "2",
  Email = "3",
  Zuzalu_23 = "4",
  Zuconnect_23 = "5"
}

/**
 * Applies a set of actions to a PCD collection.
 */
export async function applyActions(
  collection: PCDCollection,
  actions: SubscriptionActions[]
): Promise<void> {
  for (const actionSet of actions) {
    for (const action of actionSet.actions) {
      // tryExec already handles any exceptions that can come from executing
      // actions, so we don't need to catch anything here.
      await collection.tryExec(action, actionSet.subscription.feed.permissions);
    }
  }
}

function ensureHasId(sub: Subscription): Subscription {
  if (!sub.id) {
    sub.id = uuid();
  }

  return sub;
}

/**
 * Class responsible for storing the list of feed providers this application is
 * aware of, as well as the list of feeds that each provider can serve, and which
 * of those we are subscribed to.
 */
export class FeedSubscriptionManager {
  public updatedEmitter: Emitter;
  private api: IFeedApi;
  private providers: SubscriptionProvider[];
  private activeSubscriptions: Subscription[];
  private errors: Map<string, SubscriptionError>;

  public constructor(
    api: IFeedApi,
    providers?: SubscriptionProvider[],
    activeSubscriptions?: Subscription[]
  ) {
    this.updatedEmitter = new Emitter();
    this.api = api;
    this.providers = providers ?? [];
    this.activeSubscriptions = (activeSubscriptions ?? []).map(ensureHasId);
    this.errors = new Map();
  }

  public async listFeeds(providerUrl: string): Promise<ListFeedsResponseValue> {
    return this.api.listFeeds(providerUrl).then((r) => {
      if (r.success) {
        return r.value;
      } else {
        throw new Error(r.error);
      }
    });
  }

  /**
   * This "refreshes" a feed. Existing feed errors are cleared, and new
   * ones may be detected.
   *
   * Returns the successful responses. Failures will be recorded in
   * `this.errors` for display to the user.
   */
  public async pollSubscriptions(
    credentialManager: CredentialManagerAPI
  ): Promise<SubscriptionActions[]> {
    const responsePromises: Promise<SubscriptionActions[]>[] = [];

    await credentialManager.prepareCredentials(
      this.activeSubscriptions.map((sub) => sub.feed.credentialRequest)
    );

    for (const subscription of this.activeSubscriptions) {
      // nb: undefined autoPoll defaults to true
      if (subscription.feed.autoPoll === false) {
        continue;
      }
      responsePromises.push(
        this.fetchSingleSubscription(subscription, credentialManager)
      );
    }

    const responses = (await Promise.allSettled(responsePromises))
      .filter(isFulfilled<Awaited<(typeof responsePromises)[number]>>)
      .flatMap((result) => result.value);

    this.updatedEmitter.emit();

    return responses;
  }

  /**
   * Poll a single subscription. Intended for use when resolving errors
   * with a feed that failed to load due to network/connection issues.
   */
  public async pollSingleSubscription(
    subscription: Subscription,
    credentialManager: CredentialManagerAPI
  ) {
    const actions = await this.fetchSingleSubscription(
      subscription,
      credentialManager
    );
    this.updatedEmitter.emit();
    return actions;
  }

  /**
   * Performs the network fetch of a subscription, and inspects the results
   * for validity. The error log for the subscription will be reset and
   * repopulated, so callers should check this in order to determine success.
   */
  private async fetchSingleSubscription(
    subscription: Subscription,
    credentialManager: CredentialManagerAPI
  ): Promise<SubscriptionActions[]> {
    const responses: SubscriptionActions[] = [];
    this.resetError(subscription.id);
    try {
      const result = await this.api.pollFeed(subscription.providerUrl, {
        feedId: subscription.feed.id,
        pcd: await credentialManager.requestCredential({
          signatureType: "sempahore-signature-pcd",
          pcdType: subscription.feed.credentialRequest.pcdType
        })
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      const { actions } = result.value;

      this.validateActions(subscription, actions);

      responses.push({
        actions,
        subscription
      });
    } catch (e) {
      this.setError(subscription.id, {
        type: SubscriptionErrorType.FetchError,
        e: e instanceof Error ? e : undefined
      });
    }

    return responses;
  }

  /**
   * Validates that the actions received in a feed are permitted by the user.
   */
  private validateActions(subscription: Subscription, actions: PCDAction[]) {
    const grantedPermissions = subscription.feed.permissions;
    const failedActions: PCDAction[] = [];
    for (const action of actions) {
      if (!matchActionToPermission(action, grantedPermissions)) {
        failedActions.push(action);
      }
    }
    if (failedActions.length > 0) {
      console.log(subscription);
      this.setError(subscription.id, {
        type: SubscriptionErrorType.PermissionError,
        actions: failedActions
      });
    }
  }

  public getSubscriptionsByProvider(): Map<string, Subscription[]> {
    const result: Map<string, Subscription[]> = new Map();
    const providers = this.getProviders();

    for (const provider of providers) {
      const array = result.get(provider.providerUrl) ?? [];
      result.set(provider.providerUrl, array);

      array.push(
        ...this.activeSubscriptions.filter(
          (s) => s.providerUrl === provider.providerUrl
        )
      );
    }

    return result;
  }

  public unsubscribe(subscriptionId: string): void {
    const existingSubscription = this.getSubscription(subscriptionId);

    if (!existingSubscription) {
      throw new Error(`no subscription with id ${subscriptionId}`);
    }

    this.activeSubscriptions = this.activeSubscriptions.filter(
      (s) => s.id !== subscriptionId
    );

    this.errors.delete(existingSubscription.id);

    const remainingSubscriptionsOnProvider = this.getSubscriptionsForProvider(
      existingSubscription.providerUrl
    );

    if (remainingSubscriptionsOnProvider.length === 0) {
      this.removeProvider(existingSubscription.providerUrl);
    }

    this.updatedEmitter.emit();
  }

  public removeProvider(providerUrl: string): void {
    const subscriptions = this.getSubscriptionsForProvider(providerUrl);

    if (subscriptions.length > 0) {
      throw new Error(
        `can't remove provider ${providerUrl} - have ${subscriptions.length} existing subscriptions`
      );
    }

    this.providers = this.providers.filter(
      (p) => p.providerUrl !== providerUrl
    );
    this.updatedEmitter.emit();
  }

  public getSubscriptionsForProvider(providerUrl: string): Subscription[] {
    return this.activeSubscriptions.filter(
      (s) => s.providerUrl === providerUrl
    );
  }

  public findSubscription(
    providerUrl: string,
    feedId: string
  ): Subscription | undefined {
    return this.activeSubscriptions.find((sub) => {
      sub.providerUrl === providerUrl && sub.id === feedId;
    });
  }

  public async subscribe(
    providerUrl: string,
    info: Feed,
    replace?: boolean
  ): Promise<Subscription> {
    if (!this.hasProvider(providerUrl)) {
      throw new Error(`provider ${providerUrl} does not exist`);
    }

    // This check will be wrong if we want to support multiple subscriptions
    // to the same feed with different credentials (e.g. multiple email
    // PCDs). For now the UI does not allow multiple subs to the same feed.
    const providerSubs = this.getSubscriptionsByProvider().get(providerUrl);
    const existingSubscription =
      providerSubs && providerSubs.find((sub) => sub.feed.id === info.id);

    if (existingSubscription && !replace) {
      throw new Error(
        `already subscribed on provider ${providerUrl} to feed ${info.id} `
      );
    }

    if (
      info.credentialRequest.pcdType &&
      info.credentialRequest.pcdType !== "email-pcd"
    ) {
      throw new Error(
        `non-supported credential PCD requested on ${providerUrl} feed ${info.id}`
      );
    }

    let sub;

    if (existingSubscription) {
      sub = existingSubscription;
      sub.feed = { ...info };
      sub.providerUrl = providerUrl;
    } else {
      sub = {
        id: uuid(),
        feed: { ...info },
        providerUrl: providerUrl,
        subscribedTimestamp: Date.now()
      };

      this.activeSubscriptions.push(sub);
    }
    this.updatedEmitter.emit();

    return sub;
  }

  public updateFeedPermissionsForSubscription(
    subscriptionId: string,
    permissions: PCDPermission[]
  ): void {
    const sub = this.getSubscription(subscriptionId);
    if (!sub) {
      throw new Error(`no subscription found matching ${subscriptionId}`);
    }

    sub.feed.permissions = permissions;

    this.updatedEmitter.emit();
  }

  public getSubscription(subscriptionId: string): Subscription | undefined {
    return this.activeSubscriptions.find((s) => s.id === subscriptionId);
  }

  public getSubscriptionsByProviderAndFeedId(
    providerUrl: string,
    feedId: string
  ): Subscription[] {
    return this.activeSubscriptions.filter(
      (s) => s.feed.id === feedId && s.providerUrl === providerUrl
    );
  }

  public hasProvider(providerUrl: string): boolean {
    return this.getProvider(providerUrl) !== undefined;
  }

  public getProvider(providerUrl: string): SubscriptionProvider | undefined {
    return this.providers.find((p) => p.providerUrl === providerUrl);
  }

  public getOrAddProvider(
    providerUrl: string,
    providerName: string
  ): SubscriptionProvider {
    const existingProvider = this.getProvider(providerUrl);
    if (existingProvider) {
      return existingProvider;
    }
    return this.addProvider(providerUrl, providerName);
  }

  public addProvider(providerUrl: string, providerName: string) {
    if (this.hasProvider(providerUrl)) {
      throw new Error(`provider ${providerUrl} already exists`);
    }

    const newProvider: SubscriptionProvider = {
      providerUrl,
      providerName,
      timestampAdded: Date.now()
    };

    this.providers.push(newProvider);
    this.updatedEmitter.emit();
    return newProvider;
  }

  public getProviders(): SubscriptionProvider[] {
    return this.providers;
  }

  public getActiveSubscriptions(): Subscription[] {
    return this.activeSubscriptions;
  }

  public serialize(): string {
    return stringify({
      providers: this.providers,
      subscribedFeeds: this.activeSubscriptions,
      _storage_version: "v1"
    } satisfies SerializedSubscriptionManager);
  }

  /**
   * Create a FeedSubscriptionManager from serialized data.
   * Upgrades from serialized data based on version number.
   */
  public static deserialize(
    api: IFeedApi,
    serialized: string
  ): FeedSubscriptionManager {
    const parsed = JSON.parse(serialized) as SerializedSubscriptionManager;
    if (parsed._storage_version === undefined) {
      const providers = parsed.providers ?? [];
      const subscribedFeeds = (parsed.subscribedFeeds ?? []).map(
        (
          sub: Subscription & { feed: { credentialType?: string } }
        ): Subscription => {
          const feed: Feed = {
            id: sub.feed.id,
            name: sub.feed.name,
            description: sub.feed.description,
            permissions: sub.feed.permissions,
            credentialRequest: {
              signatureType: "sempahore-signature-pcd",
              ...(sub.feed.credentialType === "email-pcd"
                ? { pcdType: sub.feed.credentialType }
                : {})
            }
          };

          return {
            id: sub.id,
            feed,
            providerUrl: sub.providerUrl,
            subscribedTimestamp: sub.subscribedTimestamp
          };
        }
      );
      return new FeedSubscriptionManager(api, providers, subscribedFeeds);
    }

    return new FeedSubscriptionManager(
      api,
      parsed.providers ?? [],
      parsed.subscribedFeeds ?? []
    );
  }

  public setError(subscriptionId: string, error: SubscriptionError): void {
    console.log({ subscriptionId, error });
    this.errors.set(subscriptionId, error);
  }

  public resetError(subscriptionId: string): void {
    this.errors.delete(subscriptionId);
  }

  public getError(subscriptionId: string): SubscriptionError | null {
    return this.errors.get(subscriptionId) ?? null;
  }

  public getAllErrors(): Map<string, SubscriptionError> {
    return this.errors;
  }

  public async getHash(): Promise<string> {
    return await getHash(this.serialize());
  }
}

export const enum SubscriptionErrorType {
  // The feed contained actions which the user has not permitted
  PermissionError = "permission-error",
  // The feed could not be fetched
  FetchError = "fetch-error"
}

export interface SubscriptionPermissionError {
  type: SubscriptionErrorType.PermissionError;
  actions: PCDAction[];
}

export interface SubscriptionFetchError {
  type: SubscriptionErrorType.FetchError;
  e: Error | undefined;
}

export type SubscriptionError =
  | SubscriptionPermissionError
  | SubscriptionFetchError;

export interface SubscriptionActions {
  actions: PCDAction[];
  subscription: Subscription;
}

interface SerializedSubscriptionManagerV1 {
  providers: SubscriptionProvider[];
  subscribedFeeds: Subscription[];
  _storage_version: "v1";
}

export type SerializedSubscriptionManager = SerializedSubscriptionManagerV1;

export interface SubscriptionProvider {
  providerUrl: string;
  providerName: string;
  timestampAdded: number;
}

// The configuration of the credential required by a feed server
export interface CredentialRequest {
  // Can be extended as more signature types are supported
  signatureType: "sempahore-signature-pcd";
  // Can be extended as more PCD types are supported
  // Including a PCD in the credential is optional. We might also want to
  // query on more than just type of PCD in future.
  pcdType?: "email-pcd";
}

export interface Feed<T extends PCDPackage = PCDPackage> {
  id: string;
  name: string;
  description: string;
  inputPCDType?: PCDTypeNameOf<T>;
  partialArgs?: ArgsOf<T>;
  permissions: PCDPermission[];
  credentialRequest: CredentialRequest;
  /**
   * If false, the feed will not automatically poll for updates.
   *
   * @default true
   */
  autoPoll?: boolean;
}

export interface Subscription {
  // A UUID which identifies the subscription locally
  id: string;
  // The URL of the provider of the feed
  providerUrl: string;
  // The feed object as fetched when subscribing
  feed: Feed;
  // Timestamp of when subscription was created
  subscribedTimestamp: number;
}
