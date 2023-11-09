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

  useEffect(() => {
    router.push("./login");

    if (!logInContext.logInTheme) {
      router.push("./login");
    } else {
      router.push("./personalInfo");
    }
  }, []);

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
