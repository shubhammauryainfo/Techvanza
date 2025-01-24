import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session key `isLoggedIn` exists
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Redirect to the login page if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default Auth;
