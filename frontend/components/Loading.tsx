"use client";
import React from "react";
import Image from "next/image";

import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup,
} from "../packages/passport-interface";
import { ArgumentTypeName } from "../packages/pcd-types";
import { SemaphoreIdentityPCDPackage } from "../packages/semaphore-identity-pcd";
import { SemaphoreSignaturePCDPackage } from "../packages/semaphore-signature-pcd";
import { ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import router from "next/router";
import { zuPassLogIn } from "../pages/login";

const Loading = () => {
  const logInContext = useContext(zuPassLogIn);
  const splashScreenDuration = 2000;
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    // Hide the splash screen after the specified duration
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, splashScreenDuration);

    // Clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, );

  useEffect(() => {
    if (!isVisible) {
      router.push("./login");
    } 
  }, [isVisible]);

  return (
    <section className="h-[100vh] w-full flex justify-center items-center bg-[#F7EEE1]">
      <div className="flex-col items-center text-center">
        <div
          className="bg-center h-32"
          style={{
            backgroundImage: `url('images/logo3.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div>Connect You and Others with Astrology</div>
      </div>
    </section>
  );
};

export default Loading;
