import React from 'react';
import { FiMenu } from 'react-icons/fi'; // Import the menu icon from React Icons

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">Roots & Threads</a>
        </div>

        {/* Search Bar (visible on all screens) */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for crafts, artisans, or products..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            About
          </a>
          <a
            href="#products"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Products
          </a>
          <a
            href="#artisans"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Artisans
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
          }}
        >
          <FiMenu className="w-6 h-6" /> {/* React Icon used here */}
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-gray-100">
        <a
          href="#about"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 transition duration-300"
        >
          About
        </a>
        <a
          href="#products"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 transition duration-300"
        >
          Products
        </a>
        <a
          href="#artisans"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 transition duration-300"
        >
          Artisans
        </a>
        <a
          href="#contact"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 transition duration-300"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
