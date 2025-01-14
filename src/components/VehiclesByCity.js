import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const chartSetting = {
  width: 700,
  height: 300,
};

const calculateTopElectricVehiclesByCity = (data) => {
  const cityMap = {};

  data.forEach((vehicle) => {
    const city = vehicle.City;
    const model = vehicle.Model;

    // Initialize city map if not present
    if (!cityMap[city]) {
      cityMap[city] = {};
    }

    // Increment count for the specific model in the city
    if (!cityMap[city][model]) {
      cityMap[city][model] = 1;
    } else {
      cityMap[city][model] += 1;
    }
  });

  // Convert city map to a flat array, then sort and limit to top 5
  const cityData = Object.keys(cityMap).map((city) => {
    const vehicles = cityMap[city];
    const topModels = Object.keys(vehicles).map((model) => ({
      model,
      count: vehicles[model],
    }));

    // Sort models by count in descending order and take the top 5
    const topModelsSorted = topModels.sort((a, b) => b.count - a.count).slice(0, 5);
    return { city, topModels: topModelsSorted };
  });

  // Sort cities by the total count of vehicles used in descending order
  const sortedCities = cityData.sort((a, b) => {
    const totalA = a.topModels.reduce((sum, model) => sum + model.count, 0);
    const totalB = b.topModels.reduce((sum, model) => sum + model.count, 0);
    return totalB - totalA;
  });

  return sortedCities.slice(0, 5); // Top 5 cities
};

function VehiclesByCity(props) {
  const { title, data = [] } = props;

  const topCities = calculateTopElectricVehiclesByCity(data);

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <BarChart sx={{marginLeft:"20px"}}
        dataset={topCities.flatMap((city) =>
          city.topModels.map((model) => ({
            city: city.city,
            model: model.model,
            count: model.count,
          }))
        )}
        xAxis={[{ scaleType: 'band', dataKey: 'city', label: 'City' }]}
        yAxis={[{ scaleType: 'linear', dataKey: 'count', label: '' }]}
        series={[{ dataKey: 'count', label: 'Vehicle Count' }]}
        layout="vertical"
        {...chartSetting}
      />
    </>
  );
}

export default VehiclesByCity;
