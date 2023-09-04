import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="bg-[#151718] p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars />
          </button>
        </div>
        <div
          className={`lg:flex space-x-4 ${
            showSidebar
              ? "fixed inset-0 bg-[#151718] w-1/2 min-h-screen z-50 p-4 transform translate-x-0 transition-transform duration-300"
              : "hidden"
          } lg:space-x-6 lg:block lg:w-auto`}
        >
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300 block lg:inline-block"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300 block lg:inline-block"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300 block lg:inline-block"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300 block lg:inline-block"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
