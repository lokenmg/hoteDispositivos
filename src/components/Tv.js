import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MQTTBroker = 'ws://localhost:8083/mqtt'; // Reemplaza con la URL de tu broker MQTT
const dispositivo = "television"

const TvtSwitch = ({habitacion, id }) => {
  const [isOn, setIsOn] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTTBroker, {
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
    });

    mqttClient.on('connect', () => {
      
      setClient(mqttClient);
      mqttClient.subscribe(`hotel/habitación${habitacion}/tv${id}`);
    });

    mqttClient.on('message', (topic, message) => {
      const payload = JSON.parse(message.toString());
      setIsOn(payload.status === 1);
    });

    return () => {
      if (client) {
        client.unsubscribe(`hotel/habitación${habitacion}/tv${id}`);
        client.end();
      }
    };
  }, [id]);

  const publishStatus = (status) => {
    if (client) {
      const payload = JSON.stringify({ 
        id, 
        dispositivo,
        status,
        "habitacion":{
          "numero": habitacion
        }
       });
      client.publish(`hotel/habitación${habitacion}/tv${id}`, payload);
    }
  };

  const turnOn = () => {
    publishStatus(1);
  };

  const turnOff = () => {
    publishStatus(0);
  };

  return (
    <div>
      <h2>Tv {id}</h2>
      <p>Estado: {isOn ? 'Encendido' : 'Apagado'}</p>
      <button onClick={turnOn} disabled={isOn}>Encender</button>
      <button onClick={turnOff} disabled={!isOn}>Apagar</button>
    </div>
  );
};

export default TvtSwitch;
