import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function CreateBirthChart() {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center ">
        <h1>Create Your BirthChart for Horoscope</h1>
        <div>
          <h2>Birthdate</h2>
        </div>
        <div>
          <h2>Place You Were Born</h2>
        </div>

        <Link
          href="/"
          className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
        >
          <button className="  bg-white text-black  py-3 px-20 text-center">
            Create BirthChart
          </button>
        </Link>
      </div>
    </section>
  );
}
