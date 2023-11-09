import React from 'react';
import { useLoveCompatibility } from '../hooks/divineAPI/useLoveCompatibility'; // Adjust the path

const CompatibilityComponent: React.FC = () => {
  const compatibilityData = useLoveCompatibility();

  return (
    <div>
      <h1>Compatibility Data</h1>
      {compatibilityData ? (
        <pre>{compatibilityData}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CompatibilityComponent;
