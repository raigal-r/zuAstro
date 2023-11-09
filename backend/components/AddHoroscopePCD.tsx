import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup
} from "../../zupass/packages/passport-interface"
import { ArgumentTypeName } from "../../zupass/packages/pcd-types"
import { SemaphoreIdentityPCDPackage } from "../../zupass/packages/semaphore-identity-pcd"
import { SemaphoreSignaturePCDPackage } from "../../zupass/packages/semaphore-signature-pcd";
import { useEffect, useState } from "react";
import {  ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";
import React from 'react';


export const DailyHoroscopeComponent: React.FC = () => {
  const [signedMessage, setSignedMessage] = useState("1");
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
        Message to sign:{" "}
        <textarea
          cols={40}
          rows={1}
          value={signedMessage}
          onChange={(e) => {
            setSignedMessage(e.target.value);
          }}
        />
        <br />
        <button onClick={() => addSignatureProofPCD(signedMessage)}>
          prove and add a signature proof
        </button>
    </div>
  );
}

async function zupassSignIn(originalSiteName: string) {
  openSignedZuzaluSignInPopup(
    ZUPASS_URL,
    window.location.origin + "#/popup",
    originalSiteName
  );
}

///////////////////////////////////////////////////////////
async function addSignatureProofPCD(messageToSign: string) {
  const proofUrl = constructZupassPcdProveAndAddRequestUrl<
    typeof SemaphoreSignaturePCDPackage
  >(
    ZUPASS_URL,
    window.location.origin + "#/popup",
    SemaphoreSignaturePCDPackage.name,
    {
      identity: {
        argumentType: ArgumentTypeName.PCD,
        pcdType: SemaphoreIdentityPCDPackage.name,
        value: undefined,
        userProvided: true
      },
      signedMessage: {
        argumentType: ArgumentTypeName.String,
        value: messageToSign,
        userProvided: false
      }
    },
    {
      title: "Semaphore Signature Proof"
    }
  );

  sendZupassRequest(proofUrl);
}
//////////////////////////////////////////////////////