import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const showDropdownMenu = () => {
    setShowDropdown(true);
  };

  const hideDropdownMenu = () => {
    setShowDropdown(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-[#151718] p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <FaBars />
          </button>
        </div>
        <div
          className={`lg:flex space-x-4 ${
            showMobileMenu ? 'block' : 'hidden'
          }`}
        >
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300"
          >
            Home
          </a>
          <div
            className="relative inline-block text-white"
            onMouseEnter={showDropdownMenu}
            onMouseLeave={hideDropdownMenu}
          >
            <button className="hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300">
              Services
            </button>
            {showDropdown && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 bg-[#151718] text-white rounded-md shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-[#26292b]"
                >
                  Service 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-[#26292b]"
                >
                  Service 2
                </a>
              </div>
            )}
          </div>
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#26292b] px-3 py-2 rounded-md transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
