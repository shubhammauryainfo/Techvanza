import React from "react";

const Header = ({ title }) => {
  return (
    <header className="text-[#15142c]  shadow-md px-4 py-4">
    <div className="flex justify-center items-center">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
    </div>
  </header>
  );
};

export default Header;
