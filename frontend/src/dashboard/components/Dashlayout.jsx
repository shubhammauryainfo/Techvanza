import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaSignOutAlt , FaRupeeSign } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { CiViewTable } from "react-icons/ci";

const Dashlayout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Links data defined directly in the component
  const links = [
    { href: "/dashboard", label: "Home", icon: FaHome },
    { href: "/dashboard/teams", label: "Teams", icon: MdGroups2 },
    { href: "/dashboard/feedbacks", label: "Feedbacks", icon: VscFeedback },
    { href: "/dashboard/funds", label: "Fund", icon: FaRupeeSign },
    { href: "/dashboard/point-tables", label: "PointTable", icon: CiViewTable },
    { href: "/logout", label: "Logout", icon: FaSignOutAlt },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full bg-[#15142c] text-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <nav className="p-4 space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <span className="text-lg">{React.createElement(link.icon)}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 bg-[#15142c] text-white shadow-md h-16 flex justify-between items-center px-4 z-50">
          <button
            className="text-white text-2xl focus:outline-none mr-4"
            onClick={toggleSidebar}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="hidden md:flex text-xl font-bold flex-1">BRH Dashboard</h1>
          <div className="flex items-center space-x-2">
            {/* Placeholder for User Logo */}
            <div className="w-8 h-8 rounded-full bg-gray-600">
              <img
                src="/img/icon.png"
                alt="User Logo"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span>BRH</span>
          </div>
        </div>
        {/* Main Content */}
        <div className="mt-16 p-5">{children}</div>
      </div>
    </div>
  );
};

export default Dashlayout;
