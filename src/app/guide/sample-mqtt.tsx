"use client";

import { useEffect, useState, useRef } from 'react';
import mqtt from 'mqtt';

type DeviceData = {
  [key: string]: {
    beats_per_minute: number;
    average_bpm: number;
    spo2: number;
    ad8232_signal: number;
  };
};

export default function Mqtt() {
  const [displayData, setDisplayData] = useState<DeviceData>({});
  const latestDataRef = useRef<DeviceData>({});

  useEffect(() => {
    const mqttUrl = `ws://${process.env.NEXT_PUBLIC_MQTT_HOST}:${process.env.NEXT_PUBLIC_MQTT_PORT}`;
    const client = mqtt.connect(mqttUrl);
    
    client.on('connect', () => {
      client.subscribe(['device/#'], (err) => {
        if (!err) {
          console.log('Suscripción exitosa a device/#');
        } else {
          console.error('Error en la suscripción:', err);
        }
      });
    });

    client.on('error', (err) => {
      console.error('Error en la conexión MQTT:', err);
    });

    client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        const deviceId = topic.split('/')[1];
        if (
          typeof data.beats_per_minute === 'number' &&
          typeof data.average_bpm === 'number' &&
          typeof data.spo2 === 'number' &&
          typeof data.ad8232_signal === 'number'
        ) {

          latestDataRef.current = {
            ...latestDataRef.current,
            [deviceId]: data,
          };
        } else {
          console.warn('Mensaje recibido con formato inesperado:', data);
        }
      } catch (error) {
        console.error('Error al parsear el mensaje MQTT:', error);
      }
    });

    const intervalId = setInterval(() => {
      setDisplayData(latestDataRef.current);
    }, 1000);


    return () => {
      client.end();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2>Datos en tiempo real de MQTT</h2>

      {Object.keys(displayData).length === 0 && (
        <p>No hay datos disponibles.</p>
      )}

      {Object.keys(displayData).map((deviceId) => (
        <div key={deviceId} className="my-4 p-4 bg-white shadow rounded">
          <h3>Dispositivo: {deviceId}</h3>
          <p><strong>Beats per Minute:</strong> {displayData[deviceId].beats_per_minute}</p>
          <p><strong>Average BPM:</strong> {displayData[deviceId].average_bpm}</p>
          <p><strong>SPO2:</strong> {displayData[deviceId].spo2}</p>
          <p><strong>AD8232 Signal:</strong> {displayData[deviceId].ad8232_signal}</p>
        </div>
      ))}
    </div>
  );
}
