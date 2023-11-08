import React from "react";

import { Inter } from "next/font/google";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function PoapDetail() {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center text-center">
        <h1>Tommy - Scorpion</h1>
        <h2>
          `&apos;You can consider this person as a potential spouse or a
          hackathon mate&apos;
        </h2>
        <div>A+</div>
        <div>
          <h2>Date Matched: Nov 11th,2023</h2>
        </div>
        <div>
          <h2>Advice</h2>
          <div></div>
        </div>
        <div>
          <Link
            href="/"
            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
          >
            <button className="  bg-white text-black  py-3 px-20 text-center">
              Main{" "}
            </button>
          </Link>
          <Link
            href="/"
            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
          >
            <button className="  bg-white text-black  py-3 px-20 text-center">
              Talk To Telegram{" "}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
