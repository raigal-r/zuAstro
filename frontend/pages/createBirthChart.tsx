import React, {useState, useEffect} from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeoLocationComponent from "@/components/GeoLocation";

const inter = Inter({ subsets: ["latin"] });

export default function CreateBirthChart() {

  const [astroData, setAstroData] = useState<{ success: number, data: { svg: string }[] } | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://astroapi-4.divineapi.com/western-api/v1/natal-wheel-chart', {
        method: 'POST',
        headers: {
          'cache-control': 'no-cache',
          'authorization': `Bearer b8c27b7a1c450ffdacb31483454e0b54`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          api_key: 'b8c27b7a1c450ffdacb31483454e0b54',
          full_name: 'Raquel Carrasco',
          place: 'Arenys de Mar, Spain',
          gender: 'female',
          day: '21',
          month: '05',
          year: '2023',
          hour: '00',
          min: '00',
          sec: '43',
          lon: '2.5346498', // This needs to change, not hard coded
          lat: '41.5783288',
          tzone: '1',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAstroData(data);
        console.log('birth chart response:',data);
      } else {
        throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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


        <button 
        className="  bg-white text-black  py-3 px-20 text-center"
        onClick={fetchData}>
          Create BirthChart
        </button>
      </div>
    </section>
  );
}

