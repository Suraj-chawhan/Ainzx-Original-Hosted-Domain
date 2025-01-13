"use client";

import { Center, OrbitControls, Text3D, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import ChatGPT from "./Chatgpt";
import Cohere from "./Model/Cohere";
import Flux from "./Model/Flux";
import Gemini from "./Model/Gemini";
import Lama from "./Model/Lama";
import Mixtral from "./Model/Mixtral";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Model component for rotation and transitions
function Model({ ModelComponent, textRef, targetRotation }) {
  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += targetRotation * 0.5;
      textRef.current.rotation.x *= 0.92;
      textRef.current.rotation.y *= 0.92;
    }
  });

  return (
    <group ref={textRef}>
      <ModelComponent />
    </group>
  );
}

function ModelHome() {
  const textRef = useRef();
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const models = { ChatGPT, Cohere, Flux, Gemini, Lama, Mixtral };
  const [targetRotation, setTargetRotation] = useState(0);
  const router = useRouter();

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setTargetRotation(Math.PI / 2);

    setTimeout(() => {
      setSelectedModel(newModel);
      setTargetRotation(0);
    }, 600);
  };

  const SelectedModelComponent = models[selectedModel] || ChatGPT;

  const handleMouseMove = (e) => {
    if (textRef.current) {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.6;
      textRef.current.rotation.x = y;
      textRef.current.rotation.y = x;
    }
  };

  return (
    <div className="w-full h-[100vh]" onMouseMove={handleMouseMove}>
      <Canvas className="w-full h-[100vh] flex">
        <ambientLight intensity={0.5} />

        {/* Dropdown for Model Selection */}
        <Html className="w-full flex justify-center absolute bottom-20 z-20">
          <div>
            <select
              value={selectedModel}
              onChange={handleModelChange}
              className="p-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition-all"
            >
              {Object.keys(models).map((modelName) => (
                <option key={modelName} value={modelName}>
                  {modelName}
                </option>
              ))}
            </select>
          </div>
        </Html>

        {/* Render Selected Model */}
        <Model
          textRef={textRef}
          ModelComponent={SelectedModelComponent}
          targetRotation={targetRotation}
        />

        {/* Go to Model Button */}
        <Html className="  w-[100vh] h-[100vh]  flex justify-center items-end absolute bottom-20 sm:justify-start  sm:items-end sm:left-20  sm:bottom-[16]">
          <Link
            href={`/individual-model/${
              selectedModel === "ChatGPT" ? "Chatgpt" : selectedModel
            }`}
            className="w-[20vh] h-[-100vh]"
          >
            <button className="sm:left-0  p-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-teal-700 focus:ring-4 focus:ring-teal-300 transition-all">
              Go to Model
            </button>
          </Link>
        </Html>
      </Canvas>
    </div>
  );
}

export default ModelHome;
