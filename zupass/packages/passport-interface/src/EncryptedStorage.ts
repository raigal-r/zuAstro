import { getHash } from "@pcd/passport-crypto";
import { PCDCollection } from "@pcd/pcd-collection";
import { PCDPackage, SerializedPCD } from "@pcd/pcd-types";
import stringify from "fast-json-stable-stringify";
import { NetworkFeedApi } from "./FeedAPI";
import { FeedSubscriptionManager } from "./SubscriptionManager";
import { User } from "./zuzalu";

export interface SyncedEncryptedStorageV1 {
  self: User;
  pcds: SerializedPCD[];
}

export interface SyncedEncryptedStorageV2 {
  self: User;

  /**
   * Serialized {@link PCDCollection}.
   */
  pcds: string;
  _storage_version: "v2";
}

export interface SyncedEncryptedStorageV3 {
  // Copied from SyncedEncryptedStorageV2
  self: User;

  /**
   * Serialized {@link PCDCollection}.
   */
  pcds: string;

  /**
   * Serialized {@link FeedSubscriptionManager}
   */
  subscriptions: string;
  _storage_version: "v3";
}

export type SyncedEncryptedStorage =
  | SyncedEncryptedStorageV1
  | SyncedEncryptedStorageV2
  | SyncedEncryptedStorageV3;

export function isSyncedEncryptedStorageV1(
  storage: any
): storage is SyncedEncryptedStorageV1 {
  return storage._storage_version === undefined;
}

export function isSyncedEncryptedStorageV2(
  storage: any
): storage is SyncedEncryptedStorageV2 {
  return storage._storage_version === "v2";
}

export function isSyncedEncryptedStorageV3(
  storage: any
): storage is SyncedEncryptedStorageV3 {
  return storage._storage_version === "v3";
}

/**
 * Deserialize a decrypted storage object and set up the PCDCollection and
 * FeedSubscriptionManager to manage its data.  If the storage comes from
 * an older format which doesn't include subscriptions, then the
 * FeedSubscriptionManager will be empty.
 */
export async function deserializeStorage(
  storage: SyncedEncryptedStorage,
  pcdPackages: PCDPackage[]
): Promise<{
  pcds: PCDCollection;
  subscriptions: FeedSubscriptionManager;
  storageHash: string;
}> {
  let pcds: PCDCollection;
  let subscriptions: FeedSubscriptionManager;

  if (isSyncedEncryptedStorageV3(storage)) {
    pcds = await PCDCollection.deserialize(pcdPackages, storage.pcds);
    subscriptions = FeedSubscriptionManager.deserialize(
      new NetworkFeedApi(),
      storage.subscriptions
    );
  } else if (isSyncedEncryptedStorageV2(storage)) {
    pcds = await PCDCollection.deserialize(pcdPackages, storage.pcds);
    subscriptions = new FeedSubscriptionManager(new NetworkFeedApi());
  } else if (isSyncedEncryptedStorageV1(storage)) {
    pcds = new PCDCollection(pcdPackages);
    await pcds.deserializeAllAndAdd(storage.pcds);
    subscriptions = new FeedSubscriptionManager(new NetworkFeedApi());
  } else {
    throw new Error(
      `Unknown SyncedEncryptedStorage version 
      ${storage["_storage_version"]}`
    );
  }

  return {
    pcds,
    subscriptions,
    storageHash: await getStorageHash(storage)
  };
}

/**
 * Serializes a user's PCDs and relates state for storage.  The result is
 * unencrypted, and always uses the latest format.  The hash uniquely identifies
 * the content, as described in getStorageHash.
 */
export async function serializeStorage(
  user: User,
  pcds: PCDCollection,
  subscriptions: FeedSubscriptionManager
): Promise<{ serializedStorage: SyncedEncryptedStorage; storageHash: string }> {
  const serializedStorage: SyncedEncryptedStorage = {
    pcds: await pcds.serializeCollection(),
    self: user,
    subscriptions: subscriptions.serialize(),
    _storage_version: "v3"
  };
  return {
    serializedStorage: serializedStorage,
    storageHash: await getStorageHash(serializedStorage)
  };
}

/**
 * Calculates a hash to uniquely identify the given seralized storage.
 */
export async function getStorageHash(storage: SyncedEncryptedStorage) {
  return await getHash(stringify(storage));
}
