import React from "react";
import "./App.css";
import RoadmapGenerator from "./RoadmapGenerator.jsx";
import { RoadmapProvider } from "./RoadmapContext.jsx";

function App() {
  return (
    <RoadmapProvider>
      <RoadmapGenerator />
    </RoadmapProvider>
  );
}

export default App;
