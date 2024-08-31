"use client";
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// SensorStatus Component
const SensorStatus = ({ light_level, flame_status }) => {
  return (
    <div style={statusContainerStyle}>
      <h3>Status</h3>
      <div style={statusContentStyle}>
        <p style={statusTextStyle}>
          LDR Light Level: <span style={{ color: light_level < 20000 ? '#FF9800' : '#4CAF50' }}>{light_level}</span>
        </p>
        <p style={statusTextStyle}>
          Flame Status: <span style={{ color: flame_status ? '#000000' : '#FF5722' }}>{flame_status ? 'No Flame' : 'Flame Detected'}</span>
        </p>
      </div>
    </div>
  );
};

// SensorDataGraph Component
const SensorDataGraph = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light_level, setLightLevel] = useState(0);
  const [flame_status, setFlameStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensordata');
        const data = await response.json();
        const latestData = data[data.length - 1];
        setTemperature(latestData.temperature);
        setHumidity(latestData.humidity);
        setLightLevel(latestData.light_level);
        setFlameStatus(latestData.flame_status);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={graphContainerStyle}>
        <div style={progressBarContainerStyle}>
          <h2>Temperature</h2>
          <CircularProgressbar
            value={temperature}
            maxValue={50}
            text={`${temperature}°C`}
            styles={buildStyles({
              textColor: '#333',
              pathColor: '#d11515',
              trailColor: '#ddd',
              strokeLinecap: 'round',
            })}
          />
        </div>
        <div style={progressBarContainerStyle}>
          <h2>Humidity</h2>
          <CircularProgressbar
            value={humidity}
            maxValue={100}
            text={`${humidity}%`}
            styles={buildStyles({
              textColor: '#333',
              pathColor: '#0072d6',
              trailColor: '#ddd',
              strokeLinecap: 'round',
            })}
          />
        </div>
      </div>
      <SensorStatus light_level={light_level} flame_status={flame_status} />
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '35px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#F7F9FC',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  maxWidth: '800px',
};

const graphContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '150px',
  flexWrap: 'wrap',
  marginBottom: '65px',
};

const progressBarContainerStyle = {
  width: '180px',
  height: '180px',
  textAlign: 'center',
};

const statusContainerStyle = {
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
};

const statusContentStyle = {
  marginTop: '10px',
};

const statusTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

export default SensorDataGraph;
