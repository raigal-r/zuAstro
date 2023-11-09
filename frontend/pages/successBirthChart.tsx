import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function SuccessBirthChart() {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center ">
        <h1>Your Birthchart</h1>
        <div
          className="bg-center"
          style={{
            backgroundImage: `url('images/logo.png')`,
            backgroundPosition: "center",
          }}
        >
          BirthChart Image
        </div>
        <Link href="/">
          <button className="  bg-white text-black  py-3 px-20 text-center">
            Save Your BirthChart
          </button>
        </Link>
      </div>
    </section>
  );
}
