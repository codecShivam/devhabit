import React from "react";
// import contact from "./contact.css";
import { Outlet } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-gray-700 text-center mt-16">
        Contact Us!
      </h1>

      <Outlet />
    </>
  );
};

export default Contact;
