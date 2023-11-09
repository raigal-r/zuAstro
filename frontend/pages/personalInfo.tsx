import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function PersonalInfo() {
  return (
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col items-center">
        <h1 className="text-3xl mb-1 text-gray-600 text-center">0xDonald</h1>
        <div
          className="bg-center h-72 m-7 "
          style={{
            backgroundImage: `url('images/leo.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="flex justify-center items-center w-full">
          <Link href="/">
            <button className="bg-aGreen text-white font-medium text-xl py-3 w-44 mt-4 text-center">
              Daily Horoscope{" "}
            </button>
          </Link>
        </div>
        <div className="mt-7">
          <h2 className="my-4 text-xl text-aGreen font-medium">
            Your POAP List
          </h2>
          <div className="w-full border-2 border-aGreen h-38 ">
            <div className="flex gap-3 py-2 px-3">
              <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                JM
              </div>
              <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                RC
              </div>
              <div className="flex justify-center items-center rounded-full border-aYellow border-2 h-14 w-14 text-center bg-aYellow">
                SJ
              </div>
              <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                GU
              </div>
              <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                EG
              </div>
            </div>
            <div className="flex gap-3 py-2 px-3">
              <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                JM
              </div>
              <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                RC
              </div>
              <div className="flex justify-center items-center rounded-full border-aYellow border-2 h-14 w-14 text-center bg-aYellow">
                SJ
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <Link href="/">
            <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-44  text-center">
              Social Graph
            </button>
          </Link>
          <Link href="/">
            <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 w-44 text-center">
              Visit Group
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
