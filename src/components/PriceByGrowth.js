import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const calculateEVTypeDistribution = (data) => {
  const distribution = {
    "BEV": 0,
    "PHEV": 0,
  };

  data.forEach((vehicle) => {
    const vehicleType = vehicle["Electric Vehicle Type"];
    if (vehicleType === "Battery Electric Vehicle (BEV)") {
      distribution["BEV"] += 1;
    } else if (vehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
      distribution["PHEV"] += 1;
    }
  });

  return Object.keys(distribution).map((key) => ({
    label: key,  // Now using 'BEV' and 'PHEV' as labels
    value: distribution[key],
  }));
};

function PriceByGrowth(props) {
  const { title, data = [] } = props;
  const distributionData = calculateEVTypeDistribution(data);

  return (
    <PieChart
      series={[
        {
          data: distributionData,
        },
      ]}
      width={400}
      height={300}
    />
  );
}

export default PriceByGrowth;
