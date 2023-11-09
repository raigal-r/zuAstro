import React from 'react';
import { useGeneralSignReport } from '../hooks/divineAPI/useGeneralSignReport'; // Adjust the path

const GeneralSignReportComponent: React.FC = () => {
  const signReportData = useGeneralSignReport();

  return (
    <div>
      <h1>General Sign Report</h1>
      {signReportData ? (
        <pre>{JSON.stringify(signReportData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GeneralSignReportComponent;