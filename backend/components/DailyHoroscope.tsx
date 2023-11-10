import React, {useState} from 'react';
import { useDailyHoroscopePrediction } from '../hooks/divineAPI/useDailyHoroscopePrediction'; // Adjust the path

const DailyHoroscopeComponent: React.FC = () => {
  //const horoscopeData = useDailyHoroscopePrediction();
  const [horoscopeData, setHoroscopeData] = useState<string | null>(null);

  const useDailyHoroscopePrediction = async () => {
    try {
      const response = await fetch('https://divineapi.com/api/1.0/get_daily_horoscope.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify({
          api_key: 'b8c27b7a1c450ffdacb31483454e0b54',
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

  return (
    <div>
      <h1>Daily Horoscope</h1>
      {horoscopeData ? (
        <pre>{horoscopeData}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DailyHoroscopeComponent;
