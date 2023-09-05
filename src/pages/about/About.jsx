import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
    return (
        <>
        <h1 className="text-gray-700">About Us!</h1>
        <Outlet />
        </>
    )
}

export default About;