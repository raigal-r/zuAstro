import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center text-center">
        <h1>Rachael - Taurus</h1>
        <div
          className="bg-center"
          style={{
            backgroundImage: `url('images/logo.png')`,
            backgroundPosition: "center",
          }}
        >
          Horoscope Sign
        </div>
        <Link
          href="/"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button className="  bg-white text-black  py-3 px-20 text-center">
            Daily Horoscope{" "}
          </button>
        </Link>
        <div>
          <h2>Your POAP List</h2>
          <div></div>
        </div>
        <div>
          <Link
            href="/"
            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
          >
            <button className="  bg-white text-black  py-3 px-20 text-center">
              Social Graph{" "}
            </button>
          </Link>
          <Link
            href="/"
            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
          >
            <button className="  bg-white text-black  py-3 px-20 text-center">
              Visit Telegram{" "}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
