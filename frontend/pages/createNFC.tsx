import React from "react";

import { Inter } from "next/font/google";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function createNFC() {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center text-center">
        <h1>Create Your NFC</h1>
        <div className="flex-col">
          <input placeholder="Nick Name" />
          <input placeholder="Telegram Handle" />
        </div>
        <Link
          href="/"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button className="  bg-white text-black  py-3 px-20 text-center">
            Create NFC{" "}
          </button>
        </Link>
      </div>
    </section>
  );
}
