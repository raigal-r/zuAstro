import React, { useState } from 'react';
import Geocode from 'react-geocode';


// Set the API key for the Geocode library (replace 'YOUR_API_KEY' with your actual API key)
Geocode.setKey(process.env.GEOCODEKEY ?? '');

// Custom hook to get latitude and longitude coordinates
export const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const getCoordinates = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error('Error getting coordinates:', error);
    }
  };

  return { coordinates, getCoordinates };
};