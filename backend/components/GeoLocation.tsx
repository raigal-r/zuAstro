import React, { useState } from 'react';
import Geocode from 'react-geocode';
import useGeoLocation from '../components/GeoLocation'
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