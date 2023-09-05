import React from "react";
import Navbar from "../components/NavbarMenu";
import Roadmap from "./Roadmap";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
