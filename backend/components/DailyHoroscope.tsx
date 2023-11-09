import React from 'react';
import { useDailyHoroscopePrediction } from '../hooks/divineAPI/useDailyHoroscopePrediction'; // Adjust the path

const DailyHoroscopeComponent: React.FC = () => {
  const horoscopeData = useDailyHoroscopePrediction();

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
