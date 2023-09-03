import React from "react";
import "./App.css";
import RoadmapGenerator from "./components/RoadmapGenerator";
import { RoadmapProvider } from "./context/RoadmapContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-screen bg-[#0C0D0E]">
    <Navbar />
    <RoadmapProvider>
      <RoadmapGenerator />
    </RoadmapProvider>
    </div>
  );
}

export default App;