import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import router from "next/router";
import TextInput from "@/components/TextInput";

const inter = Inter({ subsets: ["latin"] });

export default function DailyHoroscope() {
  const [nickName, setNickName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");

  const handleInputChange = (
    param: "day" | "month" | "year" | "hour",

    newValue: string
  ) => {
    if (param === "day") {
      setDay(newValue);
    } else if (param === "month") {
      setMonth(newValue);
    } else if (param === "year") {
      setYear(newValue);
    } else if (param === "hour") {
      setHour(newValue);
    }
  };
  return (
    <section className="h-[100vh] w-full flex justify-center gap-10 ">
      <div className="flex-col w-full h-full items-start ">
        <div className="flex-col mb-7">
          <h1 className="text-3xl mb-2 text-gray-600">Create Your NFC Card</h1>
        </div>
        <div>
          <TextInput
            label="Nick Name"
            value={day}
            onChange={(value) => handleInputChange("day", value)}
          />
        </div>
        <div>
          <TextInput
            label="Telegram Handle"
            value={day}
            onChange={(value) => handleInputChange("day", value)}
          />
        </div>
        <div>
          <TextInput
            label="Twitter Handle"
            value={day}
            onChange={(value) => handleInputChange("day", value)}
          />
        </div>
        <div className="flex justify-center items-center w-full gap-2">
          <button
            className="bg-aGreen text-white font-medium text-xl py-3 mt-4 px-4 text-center"
            onClick={() => {
              router.push("./");

              //logInContext.logInTheme = true
            }}
          >
            Create NFC Card
          </button>
        </div>
      </div>
    </section>
  );
}
