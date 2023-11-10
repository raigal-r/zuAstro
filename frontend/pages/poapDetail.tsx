import React from "react";
import { useState, useEffect } from 'react';
import {SignContext} from "./_app"



import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function PoapDetail() {

  console.log(useLoveCompatibility()); 

  return (
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col items-center">
        <div className="flex-col">
          <p className="text-3xl mb-2 text-gray-600">0xTommy - Scorpion</p>
          <p className="text-center text-[1.11rem] my-4 text-aPurple w-full">
            "Consider to get married or hackathonmate?!"
          </p>
        </div>
        <div className=" border-aGreen border-2 h-60 m-7 text-red-500 text-6xl flex justify-center items-center ">
          {" "}
          A+
        </div>
        <h1 className="text-center text-lg mb-4 text-gray-600">
          Matched : Nov 11th, 2023
        </h1>

        <div className="mt-7">
          <h2 className="mb-2 text-xl text-aGreen font-medium">Advice</h2>
          <div className="w-full border-2 border-aGreen h-38 text-gray-600 p-2 ">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is.
          </div>
        </div>
        <div className="grid grid-cols-2 w-full ">
            <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-44  text-center">
              Main Page
            </button>
            <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 w-44 text-center">
              Talk To Telegram
            </button>
        </div>
      </div>
    </section>
  );
}

export const useLoveCompatibility = async () => {
  const [compatibilityData, setCompatibilityData] = useState<string | null>(null);
  const { string, setString } = React.useContext(SignContext);
      try {
        const response = await fetch('https://divineapi.com/api/1.0/get_compatibility.php', {
          method: 'POST',
          headers: {
          },
          body: new URLSearchParams({
            sign_1: string.toLowerCase(), // Replace with your actual API key
            sign_2: "aries",
            api_key: 'b8c27b7a1c450ffdacb31483454e0b54',
          }),
        });

        if (response.ok) {
          const data = await response.text();
          console.log(data);
          setCompatibilityData(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  return compatibilityData;
};

