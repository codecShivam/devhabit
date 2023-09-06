import React from "react";
import RoadmapGenerator from "../../components/RoadmapGenerator";
import { RoadmapProvider } from "../../context/RoadmapContext";
import { Outlet } from "react-router-dom";

const Roadmap = () => {
  return (
    <>
      <RoadmapProvider>
        <RoadmapGenerator />
      </RoadmapProvider>
      <Outlet />
    </>
  );
};

export default Roadmap;
