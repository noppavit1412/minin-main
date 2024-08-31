"use client";
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// SensorStatus Component
const SensorStatus = ({ light_level, flame_status }) => {
  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '10px', 
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      textAlign: 'center' // Center align text
    }}>
      <h3>Status</h3>
      <br></br>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>LDR_light_level: <span style={{ color: light_level === 1 ? 'green' : 'red' }}>{light_level === 1 ? 'On' : 'Off'}</span></p>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Flame Status: <span style={{ color: flame_status === 1 ? 'orange' : 'black' }}>{flame_status === 1 ? 'Bright' : 'Dark'}</span></p>
    </div>
  );
};

// SensorDataGraph Component
const SensorDataGraph = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light_level, setLightLevel] = useState(0); // Initialize with 0
  const [flame_status, setFlameStatus] = useState(0); // Initialize with 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensordata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
  
        if (!Array.isArray(data) || data.length === 0) {
          console.error('Data is not an array or is empty');
          return;
        }
  
        const latestData = data[data.length - 1]; // Assuming latest data has the latest status
        setTemperature(latestData.temperature);
        setHumidity(latestData.humidity);
        setLightLevel(latestData.light_level); // Ensure correct field is used
        setFlameStatus(latestData.flame_status); // Ensure correct field is used
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };    

    fetchData();
    
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', // Use space-around for closer alignment
        alignItems: 'center', 
        gap: '10px', // Reduce the gap
        flexWrap: 'wrap' // Allow wrapping on smaller screens
      }}>
        <div style={{ width: '180px', height: '180px' }}> {/* Adjust width and height */}
          <h2>Temperature</h2>
          <CircularProgressbar
            value={temperature}
            maxValue={50} // Adjust according to your needs
            text={`${temperature}°C`}
            styles={buildStyles({
              textColor: '#333',
              pathColor: 'rgba(255, 99, 132, 1)',
              trailColor: '#ddd',
              strokeLinecap: 'round',
            })}
          />
        </div>
        <div style={{ width: '180px', height: '180px' }}> {/* Adjust width and height */}
          <h2>Humidity</h2>
          <CircularProgressbar
            value={humidity}
            maxValue={100} // Adjust according to your needs
            text={`${humidity}%`}
            styles={buildStyles({
              textColor: '#333',
              pathColor: 'rgba(54, 162, 235, 1)',
              trailColor: '#ddd',
              strokeLinecap: 'round',
            })}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the SensorStatus component */}
        <SensorStatus light_level={light_level} flame_status={flame_status} />
      </div>
    </div>
  );
};

export default SensorDataGraph;
