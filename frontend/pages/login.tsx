import React, { useContext, useEffect, useMemo, useState } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useZuPassSignIn } from "@/hooks/zuPass/useZuPassSignIn";
import dynamic from "next/dynamic";
import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup,
  //getWithoutProvingUrl,
} from "../packages/passport-interface/src";
import { ArgumentTypeName } from "../packages/pcd-types/src";
import { SemaphoreIdentityPCDPackage } from "../packages/semaphore-identity-pcd/src";
import { SemaphoreSignaturePCDPackage } from "../packages/semaphore-signature-pcd/src";
import { ZUPASS_URL } from "../hooks/zuPass/constants";
//import { sendZupassRequest } from "../hooks/zuPass/util";
import router from "next/router";
import { CollapsableCode } from "@/components/Core";
//import { CollapsableCode, HomeLink } from "../../components/Core";
import { SignContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export function useZupassPopupMessages() {
  const [pcdStr, setPCDStr] = useState("");
  const [pendingPCDStr, setPendingPCDStr] = useState("");
  const [signString, setSignString] = useState("");
  const { setString } = useContext(SignContext);

  // Listen for PCDs coming back from the Zupass popup
  useEffect(() => {
    function receiveMessage(ev: MessageEvent<any>) {
      // Extensions including Metamask apparently send messages to every page. Ignore those.
      if (ev.data.encodedPCD) {
        console.log("Received PCD", ev.data.encodedPCD);
        const parsedData = JSON.parse(ev.data.encodedPCD);
        console.log("parsedData", parsedData);
        if (parsedData.pcd) {
          const pcdData = JSON.parse(parsedData.pcd);
          if (pcdData.claim) {
            const signedMessage = pcdData.claim.signedMessage;
            console.log("Signed Message: ", signedMessage);
            setString(signedMessage);
            router.push("./personalInfo");
          } else {
            console.log("Unexpected PCD structure");
          }
        }
        setPCDStr(ev.data.encodedPCD);
      } else if (ev.data.encodedPendingPCD) {
        console.log(ev.data);
        setPendingPCDStr(ev.data.encodedPendingPCD);
      }
    }
    window.addEventListener("message", receiveMessage, false);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return [pcdStr, pendingPCDStr];
}

export const zuPassLogIn = React.createContext({
  logInTheme: false,
  toggleLogInTheme: () => {},
});

export const zuPassSignValue = React.createContext({
  logInTheme: "zodiacSign",
  toggleLogInTheme: () => {},
});

export default function Login() {
  const logInContext = useContext(zuPassLogIn);
  const signValueCOntext = useContext(zuPassLogIn);
  const [zupassPCDStr] = useZupassPopupMessages();

  const formatted = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(zupassPCDStr), null, 2);
    } catch (e) {
      return null;
    }
  }, [zupassPCDStr]);

  useEffect(() => {
    if (logInContext.logInTheme === true) {
      router.push("./createBirthChart");
    }
  }, [logInContext.logInTheme]);

  return (
    <section className="h-[100vh] w-[100%] flex justify-center items-center bg-[#F7EEE1]">
      <div className="flex-col items-center justify-center text-center">
        <div
          className="bg-center h-32"
          style={{
            backgroundImage: `url('images/logo3.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="grid grid-rows-2 w-full gap-4 mt-7">
          <button
            className="bg-aGreen text-white font-medium text-xl  py-[1.4rem] w-full px-12 mt-4 text-center"
            onClick={() => {
              router.push("./createBirthChart");

              //logInContext.logInTheme = true
            }}
          >
            Generate New Birth Chart
          </button>
          <button
            className="bg-aPurple text-white font-medium text-xl py-[1.4rem] w-full px-12 mt-4 text-center"
            onClick={() => {
              getProofWithoutProving();
              //logInContext.logInTheme = true
            }}
          >
            Get My Birth Chart{" "}
          </button>
        </div>
      </div>
    </section>
  );
}

export enum PCDRequestType {
  Get = "Get",
  GetWithoutProving = "GetWithoutProving",
  Add = "Add",
  ProveAndAdd = "ProveAndAdd",
}

export interface PCDRequest {
  returnUrl: string;
  type: PCDRequestType;
}

export interface PCDGetWithoutProvingRequest extends PCDRequest {
  pcdType: string;
}

export function getWithoutProvingUrl(
  zupassClientUrl: string,
  returnUrl: string,
  pcdType: string
) {
  const req: PCDGetWithoutProvingRequest = {
    type: PCDRequestType.GetWithoutProving,
    pcdType,
    returnUrl,
  };
  const encReq = encodeURIComponent(JSON.stringify(req));
  return `${zupassClientUrl}#/get-without-proving?request=${encReq}`;
}

export function sendZupassRequest(proofUrl: string) {
  const popupUrl = `${
    window.location.origin
  }/popup?proofUrl=${encodeURIComponent(proofUrl)}`;
  console.log("popupUrl", popupUrl);
  window.open(popupUrl, "_blank", "width=450,height=600,top=100,popup");
}

function getProofWithoutProving() {
  const url = getWithoutProvingUrl(
    //ZUPASS_URL,
    "https://zupass.org/",
    `${window.location.origin}/popup`,
    SemaphoreSignaturePCDPackage.name
  );
  console.log(window.location.origin);
  sendZupassRequest(url);
}
