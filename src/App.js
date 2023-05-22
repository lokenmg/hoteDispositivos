import './App.css';

import React from 'react';
import LightSwitch from './components/Focos';
import TvtSwitch from './components/Tv';
import MotionDetector from './components/Sensor';
//import MQTTClient from './components/cliente';
function App() {
  return (
    <div>   
      <p1>Habitacion 1</p1>
      <h2>Focos</h2> 
      <LightSwitch habitacion="1" id="1" />
      <LightSwitch habitacion="1" id="2" />
      <h2>Televisores</h2>
      <TvtSwitch habitacion="1" id="1"/>
      <TvtSwitch habitacion="1" id="2"/>
      <h2>Detectores de movimiento</h2>
      

      <p1>Habitacion 2</p1>
      <h2>Focos</h2>
      <LightSwitch habitacion="2" id="1" />
      <LightSwitch habitacion="2" id="2" />
      <h2>Televisores</h2>
      <TvtSwitch   habitacion="2" id="1"/>
      <TvtSwitch   habitacion="2" id="2"/>
      
    </div>
  );
}

export default App;
