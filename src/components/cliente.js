import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
const MQTTClient = () => {
  const [client, setClient] = useState(null);
  
  useEffect(() => {
    console.log('hola desde useEffect');
    // Conexión MQTT
    const mqttClient = mqtt.connect('ws://localhost:8083/mqtt', {
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
      // ...other options
    })


    mqttClient.on('connect', () => {
      console.log('Conectado al servidor MQTT');
      mqttClient.subscribe('<topic>');
    });

    mqttClient.on('message', (topic, message) => {
      console.log('Mensaje recibido:', topic, message.toString());
    });

    setClient(mqttClient); // Guardar el cliente MQTT en el estado del componente

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendMessage = () => {
    const message = 'Mensaje de prueba';
    const topic = '<topic>';
    client.publish(topic, message);
  };

  return (
    <div>
      <div>
        {/* Contenido del componente */}
        <button onClick={sendMessage}>Enviar Mensaje</button>
      </div>
    </div>
  );
};

export default MQTTClient;