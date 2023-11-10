import React, { useState } from "react";
import Geocode from "react-geocode";
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

interface GeoLocationComponentProps {
  setCoordinates: (coordinates: { lat: number; lng: number } | null) => void;
}

// Example component using the custom hook
const GeoLocationComponent: React.FC<GeoLocationComponentProps> = ({ setCoordinates }) => {
  const { coordinates, getCoordinates } = useGeoLocation();
  const [address, setAddress] = useState("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleGetCoordinates = async () => {
    const result = await getCoordinates(address);
    setCoordinates(result);
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <input
        className="bg-white border-solid border-2 border-aGreen rounded-md py-1 px-4 mt-6"
        type="text"
        value={address}
        onChange={handleAddressChange}
      />
      <button
        className=" py-3 px-4  text-center bg-aGreen text-white mt-7"
        onClick={handleGetCoordinates}
      >
        Get Coordinates
      </button>
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
  setKey("AIzaSyAaMcG537JOivMXCt0Z1RQ6lUm7BTrvzAI");

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getCoordinates = async (address: string) => {
    try {
      const response = await fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      setCoordinates({ lat, lng });
      return { lat, lng };
    } catch (error) {
      console.error("Error getting coordinates:", error);
      return null;
    }
  };

  return { coordinates, getCoordinates };
};
