import React from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeoLocationComponent from "@/components/GeoLocation";

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
        <div>
         <GeoLocationComponent />
        </div>

        <Link href="/">
          <button className="  bg-white text-black  py-3 px-20 text-center">
            Create BirthChart
          </button>
        </Link>
      </div>
    </section>
  );
}
