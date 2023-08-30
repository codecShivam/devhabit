import React from "react";
import "./App.css";
import RoadmapGenerator from "./components/RoadmapGenerator";
import { RoadmapProvider } from "./context/RoadmapContext";

function App() {
  return (
    <RoadmapProvider>
      <RoadmapGenerator />
    </RoadmapProvider>
  );
}

export default App;