import React, { useState, useEffect } from 'react';

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
