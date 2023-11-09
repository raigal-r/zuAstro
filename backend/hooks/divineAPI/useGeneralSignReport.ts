import { useState, useEffect } from 'react';

export const useGeneralSignReport = () => {
  const [signReportData, setSignReportData] = useState<any | null>(null); // Adjust the type according to the response data structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://astroapi-4.divineapi.com/western-api/v1/general-sign-report', {
          method: 'POST',
          headers: {
            'cache-control': 'no-cache',
            'authorization': `Bearer ${process.env.DIVINEAPIKEY}`, // Replace with your actual API access token
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.DIVINEAPIKEY, // Replace with your actual API key
            full_name: 'Rahul Kumar',
            place: 'New Delhi, India',
            gender: 'male',
            day: '24',
            month: '05',
            year: '2023',
            hour: '14',
            min: '40',
            sec: '43',
            lon: '77.1025',
            lat: '28.7041',
            tzone: '5.5',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSignReportData(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return signReportData;
};
