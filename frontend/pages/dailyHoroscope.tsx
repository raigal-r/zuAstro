import React, {useState, useEffect} from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import router from "next/router";
import { SignContext } from './_app';


const inter = Inter({ subsets: ["latin"] });

export default function DailyHoroscope() {

  const { string, setString } = React.useContext(SignContext);


  const [horoscopeData, setHoroscopeData] = useState<any | null>(null);

    const useDailyHoroscopePrediction = async () => {
      console.log('string', string)
      try {
        const response = await fetch('https://divineapi.com/api/1.0/get_daily_horoscope.php', {
          method: 'POST',
          headers: {
          },
          body: new URLSearchParams({
            api_key: 'b8c27b7a1c450ffdacb31483454e0b54',
            sign: string.toLowerCase(),
            date: "2023-11-10",
            timezone: "1",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setHoroscopeData(data)
          console.log(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <section className="h-[100vh] w-full flex justify-center gap-10 ">
      <div className="flex-col w-full h-full items-start ">
        <div className="flex-col">
          <h1 className="text-3xl mb-2 text-gray-600">Daily Horoscope</h1>
          <h1 className="text-right text-lg mb-4 text-gray-600">
            Nov 11th, 2023
          </h1>
        </div>

        <div className="w-full text-gray-600 h-38 mb-4">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a
          type specimen book. It usually begins with:
        </div>
        <div className="w-full text-gray-600 h-38 mb-4">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a
          type specimen book. It usually begins with:
        </div>
        <div className="w-full text-gray-600 h-38 mb-4">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a
          type specimen book. It usually begins with:
        </div>
        <div className="grid grid-cols-2 justify-center items-center w-full">
            <button className="bg-aGreen text-white font-medium text-xl py-3 w-44 mt-4 text-center"
            onClick={() => {
              router.push("./personalInfo");

              //logInContext.logInTheme = true
            }}>
              Main Page{" "}
            </button>
          
            <button 
            className="bg-aPurple text-white font-medium text-xl py-3 w-44 mt-4 text-center"
            onClick={useDailyHoroscopePrediction}
            >
              Share with Group{" "}
            </button>
        </div>
      </div>
    </section>
  );
}
