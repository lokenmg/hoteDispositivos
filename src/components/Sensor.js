import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MQTTBroker = 'ws://localhost:8083/mqtt'; 


const MotionDetector = ({habitacion, id}) => {
  const [isMotionDetected, setIsMotionDetected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTTBroker,{
        clientId: 'emqx_test',
        username: 'emqx_test',
        password: 'emqx_test',
      });

    mqttClient.on('connect', () => {
      
      setClient(mqttClient);
      mqttClient.subscribe(`hotel/habitación${habitacion}/sensor${id}`); // Suscribirse al tópico de movimiento al conectarse
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === `hotel/habitación${habitacion}/sensor${id}`) {
        const motionStatus = message.toString();
        setIsMotionDetected(motionStatus === '1');
      }
    });

    const generateMotionStatus = () => {
      const motionStatus = Math.random() < 0.5 ? '0' : '1'; // Genera un número aleatorio entre 0 y 1
      mqttClient.publish(`hotel/habitación${habitacion}/sensor${id}`, motionStatus);
    };

    const motionStatusInterval = setInterval(generateMotionStatus, 2000); // Genera un nuevo estado cada 2 segundos

    return () => {
      if (client) {
        clearInterval(motionStatusInterval);
        client.unsubscribe(`hotel/habitación${habitacion}/sensor${id}`); // Desuscribirse del tópico al desconectarse
        client.end();
      }
    };
  }, []);

  return (
    <div>
      <h2>Detector de Movimiento</h2>
      <p>Estado: {isMotionDetected ? 'Movimiento detectado' : 'No se detecta movimiento'}</p>
    </div>
  );
};

export default MotionDetector;