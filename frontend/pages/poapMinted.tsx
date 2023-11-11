import React, { useState } from "react";
import router from "next/router";


import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function PoapMinted() {
  return (
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col w-max ">
        <p className="text-3xl mb-2 text-gray-600 text-left bg-fontFamily-josefin-0 ">
          Check Your Special POAP
        </p>
        <div
          className="bg-center h-96 my-7"
          style={{
            backgroundImage: `url('images/poap.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="grid grid-rows-2 w-full gap-2">
          <div className="text-xl text-center font-bold text-red-600">
            Congrautration!!!
            <br /> You Have Earned a Special ZuAsto POAP Reward!
          </div>
            <button className="bg-aPurple text-white font-medium text-xl py-4 mt-4 w-full text-center"
                onClick={() => router.push("./personalInfo")}
              >
              Main Page
            </button>
        </div>

        <div className="grid grid-cols-2 w-full gap-2"></div>
      </div>
    </section>
  );
}
