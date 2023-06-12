import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const dispositivo = "sensor"
const MQTTBroker = 'ws://localhost:8083/mqtt';

const MotionDetector = ({ habitacion, id }) => {
  const [isMotionDetected, setIsMotionDetected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTTBroker, {
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
    });

    mqttClient.on('connect', () => {
      setClient(mqttClient);
      mqttClient.subscribe(`hotel/habitación${habitacion}/sensor${id}`);
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === `hotel/habitación${habitacion}/sensor${id}`) {
        const payload = JSON.parse(message.toString()); // Parsear el mensaje recibido como JSON
        const { id, habitacion, dispositivo, status } = payload; // Extraer los datos del payload

        setIsMotionDetected(status === 1);
      }
    });

    const generateMotionStatus = () => {
      const motionStatus = Math.random() < 0.5 ? 0 : 1;
      const payload = {
        id,
        dispositivo,
        status: motionStatus,
        "habitacion":{
          "numero": habitacion
        }
      };
      mqttClient.publish(`hotel/habitación${habitacion}/sensor${id}`, JSON.stringify(payload)); // Enviar el payload como JSON
    };

    const motionStatusInterval = setInterval(generateMotionStatus, 2000);

    return () => {
      if (client) {
        clearInterval(motionStatusInterval);
        client.unsubscribe(`hotel/habitación${habitacion}/sensor${id}`);
        client.end();
      }
    };
  }, []);

  return (
    <div>
      <h2>Detector de Movimiento</h2>
      <p>Estado: {isMotionDetected ? '1' : '0'}</p>
    </div>
  );
};

export default MotionDetector;
