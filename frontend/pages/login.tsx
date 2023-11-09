import React, { useContext, useEffect, useMemo, useState } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useZuPassSignIn } from "@/hooks/zuPass/useZuPassSignIn";
import dynamic from 'next/dynamic';
import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup,
 //getWithoutProvingUrl,
} from "../packages/passport-interface/src"
import { ArgumentTypeName } from "../packages/pcd-types/src"
import { SemaphoreIdentityPCDPackage } from "../packages/semaphore-identity-pcd/src"
import { SemaphoreSignaturePCDPackage } from "../packages/semaphore-signature-pcd/src";
import {  ZUPASS_URL } from "../hooks/zuPass/constants";
//import { sendZupassRequest } from "../hooks/zuPass/util";
import router from "next/router";
import { CollapsableCode } from "@/components/Core";
//import { CollapsableCode, HomeLink } from "../../components/Core";

const inter = Inter({ subsets: ["latin"] });

export function useZupassPopupMessages() {

  const [pcdStr, setPCDStr] = useState("");
  const [pendingPCDStr, setPendingPCDStr] = useState("");

  // Listen for PCDs coming back from the Zupass popup
  useEffect(() => {
    function receiveMessage(ev: MessageEvent<any>) {
      // Extensions including Metamask apparently send messages to every page. Ignore those.
      if (ev.data.encodedPCD) {
        console.log("Received PCD", ev.data.encodedPCD);
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
      router.push("./personalInfo");
    }
  }, [logInContext.logInTheme]);

 
  return (
    <section className="h-[100vh] w-full flex justify-center items-center bg-[#291432]">
      <div className="flex-col items-center text-center">
        <div
          className="bg-center h-32"
          style={{
            backgroundImage: `url('images/logo.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        {/* <h1 className="text-5xl text-white mt-10 ">ZuAstro</h1> */}
        <Link
          href="/"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button
            className="bg-[#4F9171] text-white font-medium text-xl rounded-3xl py-3 px-20 mt-4 text-center"
            onClick={() => {
              logInContext.logInTheme = true
            }}
          >
            Generate new Birth Chart and store it in my Zupass{" "}
          </button>
        </Link>
        <Link
          // { path: "popup", element: <ZupassPopupRedirect /> },
          href= "popup"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button
            className="bg-[#4F9171] text-white font-medium text-xl rounded-3xl py-3 px-20 mt-4 text-center"
            onClick={() => {
              getProofWithoutProving()
              //logInContext.logInTheme = true
            }}
          >
            Get Birth Chart Stored in my ZuPass{" "}
          </button>
          {formatted && <CollapsableCode code={formatted} />}
        </Link>
      </div>
    </section>
  );
}

export enum PCDRequestType {
  Get = "Get",
  GetWithoutProving = "GetWithoutProving",
  Add = "Add",
  ProveAndAdd = "ProveAndAdd"
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
    returnUrl
  };
  const encReq = encodeURIComponent(JSON.stringify(req));
  return `${zupassClientUrl}#/get-without-proving?request=${encReq}`;
}

export function sendZupassRequest(proofUrl: string) {
  const popupUrl = `/#/popup?proofUrl=${encodeURIComponent(proofUrl)}`;
  console.log('popupUrl', popupUrl)
  window.open(popupUrl, "_blank", "width=450,height=600,top=100,popup");
}

function getProofWithoutProving() {
  const url = getWithoutProvingUrl(
    //ZUPASS_URL,
    "https://zupass.org/",
    window.location.origin + "#/popup",
    SemaphoreSignaturePCDPackage.name
  );
  console.log(window.location.origin)
  sendZupassRequest(url);
}

export function useZupassPopupSetup() {
  // Usually this page redirects immediately. If not, show an error.
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.opener == null) {
      setError("Not a popup window");
      return;
    }

    let params;

    // Hash routing is commonly used in web applications to enable client-side
    // routing without requiring server-side configuration, typically single-page applications.
    // Without hash routing, the server should always serve the same index.html file for any route.
    // Some providers, like Github Pages, don't provide this feature.
    // To read the parameters of a URL with hash routing, the hash must first be removed.
    if (window.location.href.includes(window.location.origin + "/#/")) {
      const url = new URL(window.location.href.replace("#", ""));

      params = url.searchParams;
    } else {
      params = new URLSearchParams(window.location.search);
    }

    const paramsProofUrl = params.get("proofUrl");
    const paramsProof = params.get("proof");
    const paramsEncodingPendingPCD = params.get("encodedPendingPCD");
    const finished = params.get("finished");

    // First, this page is window.open()-ed. Redirect to Zupass.
    if (paramsProofUrl != null) {
      window.location.href = paramsProofUrl;
    } else if (finished) {
      // Later, Zupass redirects back with a result. Send it to our parent.
      if (paramsProof != null) {
        window.opener.postMessage({ encodedPCD: paramsProof }, "*");
      }

      window.close();
      setTimeout(() => {
        setError("Finished. Please close this window.");
      }, 1000 * 3);
    } else if (paramsEncodingPendingPCD != null) {
      // Later, Zupass redirects back with a encodedPendingPCD. Send it to our parent.
      window.opener.postMessage(
        { encodedPendingPCD: paramsEncodingPendingPCD },
        "*"
      );
      window.close();
      setTimeout(() => {
        setError("Finished. Please close this window.");
      }, 1000 * 3);
    }
  }, []);

  return error;
}

export function ZupassPopupRedirect() {
  const error = useZupassPopupSetup();
  return <div>{error}</div>;
}
