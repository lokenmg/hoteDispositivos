import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
const dispositivo = "clima"

const MQTTBroker = 'ws://localhost:8083/mqtt'; // Reemplaza con la URL de tu broker MQTT

const ClimaSwitch = ({habitacion, id }) => {
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
      mqttClient.subscribe(`hotel/habitación${habitacion}/clima${id}`);
    });

    mqttClient.on('message', (topic, message) => {
      const payload = JSON.parse(message.toString());
      setIsOn(payload.status === 'encendido');
    });

    return () => {
      if (client) {
        client.unsubscribe(`hotel/habitación${habitacion}/clima${id}`);
        client.end();
      }
    };
  }, [id]);

  const publishStatus = (status) => {
    if (client) {
      const payload = JSON.stringify({ habitacion, dispositivo, id, status });
      client.publish(`hotel/habitación${habitacion}/clima${id}`, payload);
    }
  };

  const turnOn = () => {
    publishStatus('encendido');
  };

  const turnOff = () => {
    publishStatus('apagado');
  };

  return (
    <div>
      <h2>Clima {id}</h2>
      <p>Estado: {isOn ? 'Encendido' : 'Apagado'}</p>
      <button onClick={turnOn} disabled={isOn}>Encender</button>
      <button onClick={turnOff} disabled={!isOn}>Apagar</button>
    </div>
  );
};

export default ClimaSwitch;