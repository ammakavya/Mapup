import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const chartSetting = {
  width: 400,
  height: 300,
};

const calculateTopElectricVehiclesByCountry = (data) => {
  const vehicleMap = {};

  data.forEach((vehicle) => {
    const model = vehicle.Model;
    
    if (!vehicleMap[model]) {
      vehicleMap[model] = {
        model,
        count: 1, // Initialize with 1 for the first occurrence
      };
    } else {
      vehicleMap[model].count += 1; // Increment count for repeated models
    }
  });

  const sortedVehicles = Object.values(vehicleMap).sort(
    (a, b) => b.count - a.count
  );

  return sortedVehicles.slice(0, 5); // Top 5 electric vehicles
};

function CountryVehicles(props) {
  const { title, data = [] } = props;

  const topVehicles = calculateTopElectricVehiclesByCountry(data);

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <BarChart
        dataset={topVehicles}
        yAxis={[{ scaleType: 'band', dataKey: 'model' }]}
        series={[{ dataKey: 'count', label: 'Usage Count' }]}
        layout="horizontal"
        {...chartSetting}
      />
    </>
  );
}

export default CountryVehicles;
