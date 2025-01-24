import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TeamForm from "./Teamform"; // Assuming TeamForm is your form component

const RegisterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Register Button */}
      <button
        onClick={openModal} // Open modal on click
        className="border-[#0b283d] border-2 rounded-md flex items-center justify-center relative h-[35px] font-semibold w-40 overflow-hidden before:bg-[#2d876c] px-3 text-white text-md transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 bg-transparent before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10 mx-1">Register</span>
        <FaArrowRight className="relative z-10" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg pt-12 shadow-lg relative w-full mx-2 h-4/5 lg:h-full max-w-xl overflow-y-scroll">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="top-3 right-3 bg-red-300 rounded-lg px-2 text-gray-800 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
            {/* TeamForm */}
            <TeamForm /> {/* Render the TeamForm component */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterButton;
