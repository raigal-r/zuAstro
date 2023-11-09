"use client";
import React from "react";
import Image from "next/image";

import {
  constructZupassPcdProveAndAddRequestUrl,
  openSignedZuzaluSignInPopup,
} from "@pcd/passport-interface";
import { ArgumentTypeName } from "@pcd/pcd-types";
import { SemaphoreIdentityPCDPackage } from "@pcd/semaphore-identity-pcd";
import { SemaphoreSignaturePCDPackage } from "@pcd/semaphore-signature-pcd";
import { ZUPASS_URL } from "../hooks/zuPass/constants";
import { sendZupassRequest } from "../hooks/zuPass/util";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import router from "next/router";
import { zuPassLogIn } from "../pages/login";

const Loading = () => {
  const logInContext = useContext(zuPassLogIn);

  useEffect(() => {
    router.push('./login');

    if (!logInContext.logInTheme) {
      router.push("./login");
    } else {
      router.push("./personalInfo");
    }
  }, []);

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
        <h1 className="text-lg">ZuAstro</h1>
        <p>Connect People by Horoscope</p>
      </div>
    </section>
  );
};

export default Loading;
