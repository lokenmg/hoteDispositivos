//Realizamos las importaciones necesarias
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

//Se declara el URL del broker MQTT
const MQTTBroker = 'ws://localhost:8083/mqtt';
const dispositivo = "foco"

//Se declara el componente LightSwitch que recibe como parámetros habitación e id del broker
const LightSwitch = ({habitacion, id }) => {
  const [isOn, setIsOn] = useState(false);
  const [client, setClient] = useState(null);

//Se declara el useEffect el cual contiene la informacion del cliente
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTTBroker, {
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
    });

//Se declara el cliente y se suscribe al tópico de foco al conectarse
    mqttClient.on('connect', () => {
      setClient(mqttClient);
      mqttClient.subscribe(`hotel/foco${id}/habitación${habitacion}`);
    });

//Se declara el mensaje que se recibe del tópico de foco
    mqttClient.on('message', (topic, message) => {
      const payload = JSON.parse(message.toString());
      setIsOn(payload.status === 1);
    });

    return () => {
      if (client) {
        client.unsubscribe(`hotel/foco${id}/habitación${habitacion}`);
        client.end();
      }
    };
  }, [id]);

//Se declara el estado del foco y se publica el estado
  const publishStatus = (status) => {
    if (client) {
      const payload = JSON.stringify({ 
        id, 
        status,
        dispositivo,
        "habitacion": {
          "numero": habitacion
        }
       });
      client.publish(`hotel/foco${id}/habitación${habitacion}`, payload);
    }
  };

//Se declara la función de encender y apagar el foco
  const turnOn = () => {
    publishStatus(1);
  };

  const turnOff = () => {
    publishStatus(0);
  };

//Se declara el componente que se va a mostrar en la página
  return (
    <div>
      <h2>Foco {id}</h2>
      <p>Estado: {isOn ? 'Encendido' : 'Apagado'}</p>
      <button onClick={turnOn} disabled={isOn}>Encender</button>
      <button onClick={turnOff} disabled={!isOn}>Apagar</button>
    </div>
  );
};

export default LightSwitch;