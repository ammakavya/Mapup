import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const chartSetting = {
  width: 700,
  height: 330,
};

const calculateVehiclesByYear = (data) => {
  const yearMap = {};

  data.forEach((vehicle) => {
    const year = vehicle["Model Year"];

    if (!yearMap[year]) {
      yearMap[year] = {
        year,
        count: 1, 
      };
    } else {
      yearMap[year].count += 1; 
    }
  });

  const sortedYears = Object.values(yearMap).sort(
    (a, b) => a.year - b.year 
  );

  return sortedYears;
};

function YearsGrowth(props) {
  const { title, data = [] } = props;

  const vehiclesByYear = calculateVehiclesByYear(data);

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <BarChart 
        dataset={vehiclesByYear}
        xAxis={[{ scaleType: 'band', dataKey: 'year', label: 'Year' }]}
        series={[{ dataKey: 'count', label: 'Number of Vehicles' }]}
        layout="vertical"
        {...chartSetting}
      />
    </>
  );
}

export default YearsGrowth;
