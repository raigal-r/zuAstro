import React, { useState } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Divide } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function PersonalInfo() {

  return (
    <section className="h-[100vh] w-full flex justify-center ">
      
      <div className="flex-col w-max ">
        <p className="text-3xl mb-2 text-gray-600 text-left ">
          Check Your BirthChart
        </p>
        <div
          className="bg-center h-96 my-7 "
          style={{
            backgroundImage: `url('images/birthchart.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="grid grid-rows-2 w-full gap-2">
          <Link href="/">
            <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-full text-center">
              Save Your Birthchart
            </button>
          </Link>
          <Link href="/">
            <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 w-full text-center">
              Main Page
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 w-full gap-2"></div>
      </div>
    </section>
  );
}
