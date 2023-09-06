import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-gray-700 text-center mt-16">
        About Us!
      </h1>
      <Outlet />
    </>
  );
};

export default About;
