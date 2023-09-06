import React from "react";
import Navbar from "./NavbarMenu";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";

const Home = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      {isHomePage && <HomePage />} 
      <Outlet />
    </>
  );
};

export default Home;
