import React from "react";
import "./App.css";
import Dog from "./components/Dog.jsx";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <Canvas>
      <Dog />
    </Canvas>
  );
};

export default App;
