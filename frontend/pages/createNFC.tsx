import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function CreateNFC() {
  return (
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col w-full">
        <p className="text-3xl mb-2 text-gray-600 text-left ">
          Create Your NFC
        </p>

        {/* need to fix layout */}
        <form className="flex-col w-full">
          <label> Nick Name</label>
          <input placeholder="Nick Name" />
          <label>Telegram Handle</label>
          <input placeholder="Telegram Handle" />
          <label>Twitter Handle</label>
          <input placeholder="Twitter Handle" />
        </form>

        <div className="flex justify-center items-center">
          <Link href="/">
            <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-44  text-center">
              Create NFC
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
