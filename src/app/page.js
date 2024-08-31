// src/app/page.js

import SensorDataGraph from './component/SensorDataGraph';
import LEDControl from './component/LEDControl';

export default function Home() {
  return (
    <div style={containerStyle}>
      <SensorDataGraph />
      <LEDControl />
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5', // Optional: adds a light background color
  padding: '40px 20px', // Adjust padding for more spacing
  gap: '40px', // Add gap between components for better separation
  boxSizing: 'border-box', // Ensure padding is included in height calculations
};
