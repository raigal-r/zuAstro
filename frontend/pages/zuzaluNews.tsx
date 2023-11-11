import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";

import router from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function ZuzaluNews() {
  return (
    <section className="h-full w-full flex justify-center gap-10 ">
      <div className="flex-col w-full h-full items-start ">
        <div className="flex-col">
          <h1 className="text-3xl mb-2 text-gray-600">Zuzalu Announcements</h1>
          <h1 className="text-right text-lg mb-4 text-gray-600">
            {new Date().toLocaleDateString()}
          </h1>
        </div>
        <div className="text-gray-600">
          <div>
            Closing Ceremony Details Alas, all good things have to come to an
            end, and ZuConnect is no different 😢 but this is just the
            beginning! We have shared a beautiful two weeks, and we're excited
            to celebrate one last time as we part and move into the future.
            After an earlier dinner on Saturday, we will gather in the club Suma
            Han (10 min walk from Minoa). We will have a moment to celebrate the
            time that we have spent together and have a final moment of group
            connection. Then the club will open for its regular programming and
            those of us who want to party can stay and enjoy the night with a
            separate area for our community 🙂
          </div>
          <br />
          Some logistical details for Saturday:
          <br /> - 6:00PM - 8:00PM: Dinner at Minoa Pera 1st floor restaurant
          <br /> - 8:45PM: Meet at the club Suma Han location for closing
          ceremony.
          <br /> - 9:00PM - 10:00PM: Closing Ceremony inside Suma Han.
          <br /> - 10:00PM: Afterparty at Suma Han where we'll have our own area
          (the club will still be open to members of the public during the
          night) <br />{" "}
          <div className="my-6">
            🔔 Important note: you will need a ZuConnect wristband or Hackathon
            wristband or Day Pass wristband for Saturday November 11th to be
            allowed in to the closing ceremony. We may still ask for your ZuPass
            as well at the door. Also, capacity may be an issue so arrive on
            time 🔔
          </div>
        </div>
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

          <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 text-center">
            Share with Group{" "}
          </button>
        </div>
      </div>
    </section>
  );
}
