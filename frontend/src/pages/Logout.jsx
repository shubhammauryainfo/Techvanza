import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear sessionStorage and localStorage
        sessionStorage.clear();
        localStorage.clear();

        // Navigate to the login page
        navigate("/login");
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Logging out...</h1>
        </div>
    );
};

export default Logout;