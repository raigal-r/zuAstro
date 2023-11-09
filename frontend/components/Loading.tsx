"use client";
import React from "react";
import Image from "next/image";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {zuPassLogIn} from "../pages/login"


const Loading = () => {

  const logInContext = useContext(zuPassLogIn);
  const router = useRouter();

  

  useEffect(() => {
    router.push('./login');

    if (!logInContext.logInTheme) {
      router.push('./login');
    } else {
      router.push('./createBirthChart');
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
        <h1>ZuAstro</h1>
        <p>Connect People by Horoscope</p>
      </div>
    </section>
  );
};

export default Loading;
