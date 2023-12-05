import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Box from "./Box";
import Plane from "./Plane";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Devhabit", "AiMentor", "Roadmap", "Community"];

const ThreeScene = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <h1 className="absolute left-[52%] text-6xl bottom-[53%] text-gray-400 font-semibold z-10 px-12 text-transparent">
        <TextTransition springConfig={presets.wobbly}>
          {TEXTS[index]}
        </TextTransition>
      </h1>
      <div className="z-0">
        <Canvas>
          <OrbitControls />
          <Stars />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Physics>
            <Box />
            <Plane />
          </Physics>
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeScene;
