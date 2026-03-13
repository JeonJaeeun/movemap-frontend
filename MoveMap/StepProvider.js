// StepProvider.jsx
import React, { useState, useRef, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import StepContext from "./StepContext";

export default function StepProvider({ children }) {
  const [sensorStep, setSensorStep] = useState(0);
  const initialRef = useRef(null);

  useEffect(() => {
    let sub;

    const start = async () => {
      const { granted } = await Pedometer.requestPermissionsAsync();
      if (!granted) return;

      sub = Pedometer.watchStepCount(({ steps }) => {
        if (initialRef.current === null) {
          initialRef.current = steps;
        }

        const diff = steps - initialRef.current;

        setSensorStep(diff >= 0 ? diff : 0);
      });
    };

    start();

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  const distance = Number((sensorStep * 0.0007).toFixed(2));

  return (
    <StepContext.Provider value={{ count: sensorStep, distance }}>
      {children}
    </StepContext.Provider>
  );
}
