import React, {useState, useEffect} from "react";

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

export const useNatalWheelChart = () => {

  const [astroData, setAstroData] = useState<{ success: number, data: { svg: string }[] } | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://astroapi-4.divineapi.com/western-api/v1/natal-wheel-chart', {
          method: 'POST',
          headers: {
            'cache-control': 'no-cache',
            'authorization': `Bearer ${process.env.DIVINEAPIKEY}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.DIVINEAPIKEY,
            full_name: 'Rahul Kumar',
            place: 'New Delhi, India',
            gender: 'male',
            day: '20',
            month: '05',
            year: '2023',
            hour: '14',
            min: '40',
            sec: '43',
            lon: '77.1025', // This needs to change, not hard coded
            lat: '28.7041',
            tzone: '5.5',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAstroData(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return astroData;
};

