import React from "react";
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-white py-8 mt-4 mx-4">
      <div className="max-w-7xl items-center mx-auto">
        <div className="grid grid-cols-1 flex-grow md:grid-cols-3 gap-8 justify-center items-center">
          
          {/* Brand/Logo Section */}
          <div>
            <img src="/img/logo.png" alt="brh-logo" className="w-64" />
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
              <li><a href="/events" className="hover:text-gray-300">Upcoming Events</a></li>
              <li><a href="/conditions" className="hover:text-gray-300">Conditions</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li>Email: <a href="mailto:contact@brh.com" className="hover:text-gray-300">connect.brh@gmail.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-gray-300">+8828724893</a></li>
            </ul>
            <h3 className="text-lg font-semibold mt-6">Follow Us</h3>
            <ul className="mt-4 flex space-x-4">
              <li><a href="#" className="hover:text-gray-300 text-2xl"><FaFacebook /></a></li>
              <li><a href="#" className="hover:text-gray-300 text-2xl"><BsTwitterX /></a></li>
              <li><a href="https://www.instagram.com/brh.esports/" className="hover:text-gray-300 text-2xl"><FaInstagramSquare /></a></li>
              <li><a href="https://www.youtube.com/@brh.esportz" className="hover:text-gray-300 text-2xl"><FaYoutube /></a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} BRH. All rights reserved. Developed by <a href="https://nexbytes.rf.gd" className="text-gray-300">Nexbytes</a>.</p>
      </div>
    </footer>
  );
};

export default Footer;
