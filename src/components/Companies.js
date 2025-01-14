import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
const chartSetting = {
  xAxis: [  
  ],
  width: 500,
  height: 300,
};
const calculateData = (data) => {
    const companyMap = {};
    data.forEach((vehicle) => {
      const company = vehicle.Make.toLowerCase(); 
      if (!companyMap[company]) {
        companyMap[company] = {
          company,
          total: 0,
        };
      }
      companyMap[company].total += 1; 
    });
    const sortedCompanies = Object.values(companyMap).sort((a, b) => b.total - a.total);
    return sortedCompanies.slice(0, 10);
  };
 function Companies(props) {
    const {title,data=[]} =props;
   
    const newData = calculateData(data)
  return (
   <>
   <Typography>{title}</Typography>
    <BarChart sx={{marginLeft:"30px" }}
      dataset={newData}
      yAxis={[{ scaleType: 'band', dataKey: 'company', }]}
      series={[{ dataKey: 'total'}]}
      layout="horizontal"
      {...chartSetting}
    />
    </>
  );
}
export default Companies
