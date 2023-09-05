import React from "react";
import contact from "./contact.css";
import { Outlet } from "react-router-dom";

const Contact = () => {
    return (
        <>

<h1 className="text-gray-700">Contact Us!</h1>

        <Outlet />
        </>
    )
}

export default Contact;