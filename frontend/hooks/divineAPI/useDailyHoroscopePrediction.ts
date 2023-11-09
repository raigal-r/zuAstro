import { useState, useEffect } from 'react';

export const useDailyHoroscopePrediction = () => {
  const [horoscopeData, setHoroscopeData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://divineapi.com/api/1.0/get_daily_horoscope.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adjust the content type as needed
          },
          body: JSON.stringify({
            api_key: process.env.DIVINEAPIKEY, // Replace with your actual API key
          }),
        });

        if (response.ok) {
          const data = await response.text();
          setHoroscopeData(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return horoscopeData;
};
