import React, { useContext, useEffect } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createContext } from "react";
import { useZuPassSignIn } from "@/hooks/zuPass/useZuPassSignIn";
import dynamic from 'next/dynamic';

import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup
} from "@pcd/passport-interface"
import { ArgumentTypeName } from "@pcd/pcd-types"
import { SemaphoreIdentityPCDPackage } from "@pcd/semaphore-identity-pcd"
import { SemaphoreSignaturePCDPackage } from "@pcd/semaphore-signature-pcd";
import {  ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";
import router from "next/router";

const inter = Inter({ subsets: ["latin"] });

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
