import React, {useContext, useEffect} from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createContext } from "react";
import { useZuPassSignIn } from "@/hooks/zuPass/useZuPassSignIn";

import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup
} from "../../zupass/packages/passport-interface/src"
import { ArgumentTypeName } from "../../zupass/packages/pcd-types/src"
import { SemaphoreIdentityPCDPackage } from "../../zupass/packages/semaphore-identity-pcd/src"
import { SemaphoreSignaturePCDPackage } from "../../zupass/packages/semaphore-signature-pcd/src";
import {  ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";
import router from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const zuPassLogIn = React.createContext({
  logInTheme: false,
  toggleLogInTheme: () => {},
});

export const zuPassSignValue = React.createContext({
  logInTheme: 'zodiacSign',
  toggleLogInTheme: () => {},
});

// async function zupassSignIn(originalSiteName: string) {
//   try {
//     await openSignedZuzaluSignInPopup(
//       ZUPASS_URL,
//       window.location.origin + "#/popup",
//       originalSiteName
//     );
//     //logInContext.logInTheme = true ; // Assuming logInContext is a state setter function
//   } catch (error) {
//     console.error('Sign in failed:', error);
//   }
// }

export default function Login() {

  const logInContext = useContext(zuPassLogIn);

  useEffect(() => {
    if (logInContext.logInTheme === true) {
      router.push('./personalInfo');
    } 
  }, [logInContext.logInTheme]);

  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center text-center">
        <div
          className="bg-center"
          style={{
            backgroundImage: `url('images/logo.png')`,
            backgroundPosition: "center",
          }}
        >
          Logo
        </div>
        <h1>ZuAstro</h1>
        <Link
          href="/"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button 
            className="  bg-white text-black  py-3 px-20 text-center"
            onClick={() => {
              //zupassSignIn("eth-pcd");
              logInContext.logInTheme = true
            }}
            >
            Connect Zupass{" "}
          </button>
        </Link>
      </div>
    </section>
  );
}
