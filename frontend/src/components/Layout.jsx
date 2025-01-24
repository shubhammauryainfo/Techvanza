import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
const Layout = ({ children }) => {
  return (
    <div className="bg-[url('/img/body-bg.webp')] ">
      <Navbar /> 
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
