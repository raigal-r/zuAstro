import { useState, useEffect } from 'react';

export const useLoveCompatibility = () => {
  const [compatibilityData, setCompatibilityData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://divineapi.com/api/1.0/get_compatibility.php', {
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
          setCompatibilityData(data);
        } else {
          throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return compatibilityData;
};
