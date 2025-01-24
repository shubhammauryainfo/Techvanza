import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import RegisterButton from "./RegisterButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-50 bg-[#000f38] bg-opacity-70">
        <nav className="flex items-center justify-between px-6 py-3 md:px-12">
          {/* Logo Section */}
          <div className="hidden lg:flex md:text-2xl md:font-bold md:text-white">
            <a href="/">
              <img src="/img/icon.png" alt="Logo" className="w-16 h-16" />
            </a>
          </div>

          {/* Nav Tabs (hidden on mobile) */}
          <ul className="hidden lg:flex space-x-6 text-lg text-white">
          <li>
              <a href="/" className="hover:text-[#41d99f] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#41d99f] transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/conditions" className="hover:text-[#41d99f] transition">
                Conditions
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-[#41d99f] transition">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#41d99f] transition">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Register Button */}
          <div >
        <RegisterButton/>
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <div className="lg:hidden">
            <button
              className="text-white text-2xl"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="flex flex-col items-center bg-[#513e64] bg-opacity-70 w-full text-center text-white py-4 space-y-4 lg:hidden">
              <a
              href="/"
              className="hover:text-[#41d99f] transition"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-[#41d99f] transition"
              onClick={toggleMenu}
            >
              About Us
            </a>
            <a
              href="/conditions"
              className="hover:text-[#41d99f] transition"
              onClick={toggleMenu}
            >
              Conditions
            </a>
            <a
              href="/events"
              className="hover:text-[#41d99f] transition"
              onClick={toggleMenu}
            >
              Upcoming Events
            </a>
            <a
              href="/contact"
              className="hover:text-[#41d99f] transition"
              onClick={toggleMenu}
            >
                Contact Us
  
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
