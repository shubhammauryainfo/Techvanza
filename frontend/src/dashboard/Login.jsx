import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hardcoded credentials
  const hardcodedEmail = import.meta.env.VITE_UNAME;
  const hardcodedPassword = import.meta.env.VITE_PASS;
  const Key =import.meta.env.VITE_SESSION_KEY;
  
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === hardcodedEmail && password === hardcodedPassword) {
      // Store session
      sessionStorage.setItem("isLoggedIn",Key);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to the Dashboard!",
      }).then(() => {
        navigate("/dashboard"); // Navigate to the dashboard
      });
    } else {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Head title="BRH - Login" description="Login to access the admin dashboard." />
      <div className="bg-white p-8 m-3 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login - Admin Dashboard</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
