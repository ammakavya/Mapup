import { Grid, Grid2, Paper, Typography } from '@mui/material'
import React from 'react'
import Companies from './Companies'
import YearsGrowth from './YearsGrowth'
import PriceByGrowth from './PriceByGrowth'
import BasePrice from './BasePrice'
import CountryVehicles from './CountryVehicles'
import VehiclesByCity from './VehiclesByCity'

const DashBoard = ({data}) => {
  
  const electricVehicles = data.filter(vehicle => 
    vehicle["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)" || 
    vehicle["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)"
  );
  const ModelYear = new Set(data.map(modelyear=>modelyear["Model Year"]));
  const Compani = new Set(data.map(Company=>Company["Make"]));
  const Countries = new Set(data.map(country=>country["County"]));
  const Cities = new Set(data.map(city=>city["City"]));


  return (
    <div className='container'>
        <div style={{ backgroundColor:"grey",color:'#333', width:'auto',height:"40px",fontStyle:"bold"}}>
          <h2>eletric vehicles population</h2> </div>
         <Grid2 gap={2} container sx={{marginLeft:'5%'}}>
         <Grid2 md={2.2}>
<Paper  elevation={3} sx={{margin:'10px' ,padding:"10px",width:'250px'}}>
<Typography variant='h6'>total vehicles</Typography>
<Typography  sx={{color:"blue"}} variant='h4'>{(`${electricVehicles.length}`)}</Typography>
</Paper>

</Grid2>
          <Grid2 md={2.2}>
<Paper  elevation={3} sx={{margin:'10px' ,padding:"10px",width:'250px'}}>
<Typography variant='h6'>model year</Typography>
<select
        style={{
          width: '200px',
          backgroundColor: 'purple',
          color: 'white',
          height: '30px',
          border: 'none',
          borderRadius: '5px',
          padding: '5px',
        }}
      >
        {Array.from(ModelYear).map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
        ))}
      </select>
</Paper>
          </Grid2>
          <Grid2 md={2.2}>
          <Paper  elevation={3} sx={{margin:'10px' ,padding:"10px",width:'250px'}}>
<Typography variant='h6'>companies</Typography>
<select style={{width:'200px',backgroundColor:'purple',height:'30px',color:"white"}}>
  {Array.from(Compani).map((comp,index)=>(
  <option key={index} value={comp}>{comp}</option>
))}
</select>
</Paper>

</Grid2>
<Grid2 md={2.2}>
<Paper  elevation={3} sx={{margin:'10px' ,padding:"10px",width:'250px'}}>
<Typography variant='h6'>country</Typography>
<select style={{width:'200px',backgroundColor:'purple',height:'30px',color:"white"}}>
  {Array.from(Countries).map((count,index)=>(
    <option key={index} value={count}>{count}</option>
  ))}
</select>
</Paper>

</Grid2>
<Grid2 md={2.2}>
<Paper  elevation={3} sx={{margin:'10px' ,padding:"10px",width:'250px'}}>
<Typography variant='h6'>city</Typography>
<select style={{width:'200px',backgroundColor:'purple',height:'30px',color:"white"}}>
  {Array.from(Cities).map((city,index)=>(
    <option key={index} value={city}>{city}</option>
  ))}
</select>
</Paper>

</Grid2>


          </Grid2> 
          <Grid container sx={{marginLeft:'10px'}}>
            <Grid md={3.2} sx={{margin:"7px"}}>
<Paper elevation={3}>
  
<Companies title="top 10 electric vehicle (EV) companies" data = {data}/>


</Paper>
            </Grid>
            <Grid md={4.7} sx={{margin:"7px"}}>
            <Paper elevation={3}>
<YearsGrowth data ={data} />
</Paper>

</Grid>
<Grid md={3.2} sx={{margin:"7px"}}>
<Paper elevation={3}>

<BasePrice  title="Base Price By model" data={data}/>
</Paper>

</Grid>
          </Grid>
          <Grid container sx={{marginLeft:"10px"}}>
            <Grid md={3.2} sx={{margin:"7px"}}>
<Paper elevation={3}>
<PriceByGrowth data={data}/>
</Paper>
            </Grid>
            <Grid md={4.7} sx={{margin:"7px"}}>
            <Paper elevation={3}>
<VehiclesByCity data ={data}/>
</Paper>

</Grid>
<Grid md={3.2} sx={{margin:"7px"}}>
<Paper elevation={3}>
<CountryVehicles title="Top 5 electric vehicles used by city" data ={data}/>
</Paper>

</Grid>
          </Grid>
    </div>
  )
}

export default DashBoard