import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import DashBoard from './components/DashBoard';
import { LineChart } from '@mui/x-charts';
import { createContext } from 'react';

export const VehicleContext = createContext();

function App() {

  const[data,setData] =useState([])
  
  useEffect(() => {
    axios
      .get('/data/Electric_Vehicle_Population_Data.csv', { responseType: 'text' })
      .then((response) => {
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Parsed CSV as JSON:', JSON.stringify(results.data, null, 2));
            setData(results.data);
           
           
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV file:", error);
      });
  }, ["make","Model Year"]);

  return (
    <div className="App">
     <DashBoard data={data}/>
    

    
    </div>
  );
}

export default App;