import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function CreateNFC() {
  return (
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col items-center">
        <div className="flex-col">
          <p className="text-3xl mb-2 text-gray-600">Create Your NFC</p>
        </div>
        <div></div>

        <div className="grid grid-cols-2 w-full gap-4">
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
