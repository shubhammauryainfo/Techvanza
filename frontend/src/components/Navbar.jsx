import React from "react";
import { FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi"; // Added FiShoppingCart for the cart icon

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/" className="text-primary">
            Roots & Threads
          </a>
        </div>

        {/* Search Bar (visible on all screens) */}
        <div className="flex-grow mx-4 relative">
          {" "}
          {/* Added relative for positioning the icon */}
          <input
            type="text"
            placeholder="Search for crafts, artisans, or products..."
            className="w-full py-2 pl-10 pr-4 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" // Added pl-10 for padding-left
          />
          {/* Search Icon inside the search bar */}
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />{" "}
          {/* Positioned the icon */}
        </div>

        {/* Cart Icon */}
        <div className="flex space-x-6 items-center">
          <a
            href="#cart"
            className="text-primary hover:text-gray-900 transition duration-300 flex items-center"
          >
            <FiShoppingCart className="w-6 h-6" /> {/* Cart Icon */}
            <span className="ml-2">Cart</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <FiMenu className="w-6 h-6" /> {/* React Icon used here */}
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-gray-100">
        <a
          href="#cart"
          className="block px-4 py-2 text-primary hover:bg-gray-200 transition duration-300"
        >
          Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
