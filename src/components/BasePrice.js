import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const chartSetting = {
  width: 500,
  height: 300,
};

const calculateTopCompaniesByBasePrice = (data) => {
  const companyMap = {};

  data.forEach((vehicle) => {
    const company = vehicle.Make;
    const baseMSRP = parseFloat(vehicle["Base MSRP"]) || 0;

    if (!companyMap[company]) {
      companyMap[company] = {
        company,
        totalBasePrice: baseMSRP,
      };
    } else {
      companyMap[company].totalBasePrice += baseMSRP;
    }
  });

  const sortedCompanies = Object.values(companyMap).sort(
    (a, b) => b.totalBasePrice - a.totalBasePrice
  );

  return sortedCompanies.slice(0, 10); // Top 10 companies
};

function BasePrice(props) {
  const { title, data = [] } = props;

  const topCompanies = calculateTopCompaniesByBasePrice(data);

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <BarChart sx={{marginLeft:"20px"}}
        dataset={topCompanies}
        yAxis={[{ scaleType: 'band', dataKey: 'company' }]}
        series={[{ dataKey: 'totalBasePrice', label: 'Total Base Price ($)' }]}
        layout="horizontal"
        {...chartSetting}
      />
    </>
  );
}

export default  BasePrice;
