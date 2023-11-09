import { EncryptedPacket } from "@pcd/passport-crypto";
import urlJoin from "url-join";
import {
  UploadEncryptedStorageRequest,
  UploadEncryptedStorageResponseValue
} from "../RequestTypes";
import { APIResult, NamedAPIError, onNamedAPIError } from "./apiResult";
import { httpPost } from "./makeRequest";

/**
 * Asks to upload an e2ee encrypted blob to the Zupass server. The server
 * never learns the user's encryption key.
 *
 * Never rejects. All information encoded in the resolved response.
 */
export async function requestUploadEncryptedStorage(
  zupassServerUrl: string,
  blobKey: string,
  encryptedStorage: EncryptedPacket,
  knownRevision?: string
): Promise<UploadEncryptedStorageResult> {
  return httpPost<UploadEncryptedStorageResult>(
    urlJoin(zupassServerUrl, `/sync/v2/save`),
    {
      onValue: async (resText: string) => ({
        value: JSON.parse(resText) as UploadEncryptedStorageResponseValue,
        success: true
      }),
      onError: onNamedAPIError
    },
    {
      blobKey,
      encryptedBlob: JSON.stringify(encryptedStorage),
      knownRevision
    } satisfies UploadEncryptedStorageRequest
  );
}

export type UploadEncryptedStorageResult = APIResult<
  UploadEncryptedStorageResponseValue,
  NamedAPIError
>;
