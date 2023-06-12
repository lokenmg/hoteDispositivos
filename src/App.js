import './App.css';

import React from 'react';
import LightSwitch from './components/Focos';
import TvtSwitch from './components/Tv';
import MotionDetector from './components/Sensor';
import ClimaSwitch from './components/Clima';
//import MQTTClient from './components/cliente';
function App() {
  return (
    <div>
      {/* <p1>Habitacion 1</p1>
      <h2>Focos</h2> 
      <LightSwitch habitacion="1" id="1" />
      <LightSwitch habitacion="1" id="2" />
      <h2>Televisores</h2>
      <TvtSwitch habitacion="1" id="3"/>
      <h2>Aire acondicionado</h2>
      <ClimaSwitch habitacion="1" id="4"/>
      <h2>Detectores de movimiento</h2>
      <MotionDetector habitacion="1" id="5"/>
      <MotionDetector habitacion="1" id="6"/>   */}


      <p1>Habitacion 2</p1>
      <h2>Focos</h2>
      <LightSwitch habitacion="2" id="7" />
      <LightSwitch habitacion="2" id="8" />
      <h2>Televisores</h2> 
      <TvtSwitch habitacion="2" id="9"/>
      <h2>Aire acondicionado</h2>
      <ClimaSwitch habitacion="2" id="10"/>
      <h2>Detectores de movimiento</h2>
      <MotionDetector habitacion="2" id="11"/>
      <MotionDetector habitacion="2" id="12"/>
      

      {/* <p1>Habitacion 3</p1>
      <h2>Focos</h2> 
      <LightSwitch habitacion="3" id="13" />
      <LightSwitch habitacion="3" id="14" />
      <h2>Televisores</h2>
      <TvtSwitch habitacion="3" id="15"/>
      <h2>Aire acondicionado</h2>
      <ClimaSwitch habitacion="3" id="16"/>
      <h2>Detectores de movimiento</h2>
      <MotionDetector habitacion="3" id="17"/>
      <MotionDetector habitacion="3" id="18"/> */}


      {/* <p1>Habitacion 4</p1>
      <h2>Focos</h2> 
      <LightSwitch habitacion="4" id="19" />
      <LightSwitch habitacion="4" id="20" />
      <h2>Televisores</h2>
      <TvtSwitch habitacion="4" id="21"/>
      <h2>Aire acondicionado</h2>
      <ClimaSwitch habitacion="4" id="22"/>
      <h2>Detectores de movimiento</h2>
      <MotionDetector habitacion="4" id="23"/>
      <MotionDetector habitacion="4" id="24"/>  */}
    </div>
  );
}

export default App;
