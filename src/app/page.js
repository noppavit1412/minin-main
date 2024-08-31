import SensorDataGraph from './component/SensorDataGraph';
import LEDControl from './component/LEDControl';

export default function Home() {
  return (
    <>
      <LEDControl/>
      <SensorDataGraph/>
    </>
  );
}
