import React, { useState } from 'react';
import Geocode from 'react-geocode';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

// Example component using the custom hook
const GeoLocationComponent: React.FC = () => {
    const { coordinates, getCoordinates } = useGeoLocation();
    const [address, setAddress] = useState('');
  
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    };
  
    const handleGetCoordinates = () => {
      getCoordinates(address);
    };
  
    return (
      <div>
        <input type="text" value={address} onChange={handleAddressChange} />
        <button onClick={handleGetCoordinates}>Get Coordinates</button>
        {coordinates && (
          <div>
            Latitude: {coordinates.lat}
            <br />
            Longitude: {coordinates.lng}
          </div>
        )}
      </div>
    );
};
export default GeoLocationComponent;
  

export const useGeoLocation = () => {
  //Geocode.setKey(process.env.GEOCODEKEY ?? '');
 setKey("AIzaSyAaMcG537JOivMXCt0Z1RQ6lUm7BTrvzAI");

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const getCoordinates = async (address: string) => {
    try {
      const response = await fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error('Error getting coordinates:', error);
    }
  };

  return { coordinates, getCoordinates };
};