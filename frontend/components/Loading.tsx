"use client";
import React from "react";
import Image from "next/image";

import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup
} from "../zupass/packages/passport-interface"
import { ArgumentTypeName } from "../zupass/packages/pcd-types"
import { SemaphoreIdentityPCDPackage } from "../zupass/packages/semaphore-identity-pcd"
import { SemaphoreSignaturePCDPackage } from "../zupass/packages/semaphore-signature-pcd";
import {  ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";

import Link from "next/link";
import { useState,useEffect, useContext } from "react";
import router from "next/router";
import {zuPassLogIn} from "../pages/login"



const Loading = () => {

  const logInContext = useContext(zuPassLogIn);
  

  useEffect(() => {
    if (!logInContext.logInTheme) {
      router.push('./login');
    } else {
      router.push('./personalInfo');
    }
  }, [logInContext]);

 

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
        <p>Connect People by Horoscope</p>
      </div>
    </section>
  );
};

export default Loading;
