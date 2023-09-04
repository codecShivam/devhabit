import React from "react";
import Navbar from "../components/Navbar";
import RoadmapGenerator from "../components/RoadmapGenerator";
import { RoadmapProvider } from "../context/RoadmapContext";

const Home = () => {
  return (
    <>
      <Navbar />
      <RoadmapProvider>
        <RoadmapGenerator />
      </RoadmapProvider>
    </>
  );
};

export default Home;