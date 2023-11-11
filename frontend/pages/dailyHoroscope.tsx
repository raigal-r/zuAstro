import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import router from "next/router";
import { SignContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function DailyHoroscope() {
  const { string, setString } = React.useContext(SignContext);

  const [horoscopeData, setHoroscopeData] = useState<any | null>(null);

  const [emotions, setEmotions] = useState("");
  const [health, setHealth] = useState("");
  const [luck, setLuck] = useState("");
  const [personal, setPersonal] = useState("");
  const [profession, setProfession] = useState("");
  const [travel, setTravel] = useState("");

  useEffect(() => {
    const useDailyHoroscopePrediction = async () => {
      console.log("string", string);
      try {
        const response = await fetch(
          "https://divineapi.com/api/1.0/get_daily_horoscope.php",
          {
            method: "POST",
            headers: {},
            body: new URLSearchParams({
              api_key: "b8c27b7a1c450ffdacb31483454e0b54",
              sign: string.toLowerCase(),
              //sign: string,
              date: new Date().toISOString().slice(0, 10),
              timezone: "0",
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHoroscopeData(data);
          console.log(data);

          const emotionss = data.data.prediction.emotions;
          setEmotions(emotionss);
          const health = data.data.prediction.health;
          setHealth(health);
          const luck = data.data.prediction.luck;
          setLuck(luck);
          const personal = data.data.prediction.personal;
          setPersonal(personal);
          const profession = data.data.prediction.profession;
          setProfession(profession);
          const travel = data.data.prediction.travel;
          setTravel(travel);
        } else {
          throw new Error(
            `Failed to fetch data from the API. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useDailyHoroscopePrediction();
  }, []);

  return (
    <section className="h-[100vh] w-full flex justify-center gap-10 ">
      <div className="flex-col w-full h-full items-start ">
        <div className="flex-col">
          <h1 className="text-3xl mb-2 text-gray-600">Daily Horoscope</h1>
          <h1 className="text-right text-lg mb-4 text-gray-600">
            {new Date().toLocaleDateString()}
          </h1>
        </div>

        <div className="w-full text-gray-600 h-38 mb-4">{`${emotions}`}</div>
        <div className="w-full text-gray-600 h-38 mb-4">{`${health}`}</div>
        <div className="w-full text-gray-600 h-38 mb-4">{`${travel}`}</div>
        <div className="grid grid-cols-2 justify-center items-center w-full gap-2">
          <button
            className="bg-aGreen text-white font-medium text-xl py-3 mt-4 text-center"
            onClick={() => {
              router.push("./personalInfo");

              //logInContext.logInTheme = true
            }}
          >
            Main Page{" "}
          </button>

          <button
            className="bg-aPurple text-white font-medium text-xl py-3 mt-4 text-center"
            onClick={() => {
              router.push("./zuzaluNews");

              //logInContext.logInTheme = true
            }}
          >
            Zuzalu News
          </button>
        </div>
      </div>
    </section>
  );
}
