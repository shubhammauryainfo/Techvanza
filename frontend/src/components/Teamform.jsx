import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const TeamForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    phone: "",
    playerDetails: [{ name: "", IGN: "", ID: "" }],
    timeSlot: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...formData.playerDetails];
    updatedPlayers[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      playerDetails: updatedPlayers,
    }));
  };

  const addPlayer = () => {
    if (formData.playerDetails.length < 6) {
      setFormData((prevData) => ({
        ...prevData,
        playerDetails: [...prevData.playerDetails, { name: "", IGN: "", ID: "" }],
      }));
    }
  };

  const removePlayer = (index) => {
    const updatedPlayers = formData.playerDetails.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      playerDetails: updatedPlayers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show sending effect
      Swal.fire({
        title: "Sending...",
        text: "Please wait while we process your request.",
        icon: "info",
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        `${API_URL}/api/teams`,
        formData,
        {
          headers: {
            "auth-key": API_KEY,
          },
        }
      );

      if (response.status === 201) {
        // SweetAlert2 Success Alert
        Swal.fire({
          icon: "success",
          title: "Team Created!",
          text: "Your team has been registered successfully.",
          confirmButtonColor: "#28a745",
        });
        // const whatsappGroupLink = "https://chat.whatsapp.com/C3KbPB2446cDDd4NYAd7Tf";
        // window.location.href = whatsappGroupLink;
        const message = `Hello Team"${formData.name}". Kindly Send for Payment 'Hlw'`;
        const phoneNumber = "918976478987";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.location.href = whatsappLink, "_blank";

        setFormData({
          name: "",
          leader: "",
          phone: "",
          playerDetails: [{ name: "", IGN: "", ID: "" }],
          timeSlot: "",
        });
      }
    } catch (error) {
      // SweetAlert2 Error Alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create the team.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="max-w-lg md:max-w-2xl p-4 lg:p-6 bg-[#15142c] h-34 bg-opacity-95 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
        Register a New Team
      </h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-md font-semibold mb-2">Team Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            placeholder="Enter team name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-md font-semibold mb-2">Team Leader</label>
          <input
            type="text"
            name="leader"
            value={formData.leader}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            placeholder="Enter leader name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-md font-semibold mb-2">Phone Number</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-md font-semibold mb-2">Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            required
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {/* <option value="Morning">Morning: 10 AM - 12 PM</option>
            <option value="Afternoon">Afternoon: 2 PM - 4 PM</option> */}
            <option value="Evening">Evening: 8 PM - 10 PM</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-md font-semibold mb-2">Player Details</label>
          {formData.playerDetails.map((player, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center mb-4"
            >
              <input
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                className="col-span-1 sm:col-span-1 px-4 py-2 border rounded-lg bg-gray-700 text-white"
                placeholder="Player Name"
                required
              />
              <input
                type="text"
                value={player.IGN}
                onChange={(e) => handlePlayerChange(index, "IGN", e.target.value)}
                className="col-span-1 sm:col-span-1 px-4 py-2 border rounded-lg bg-gray-700 text-white"
                placeholder="In-Game Name (IGN)"
                required
              />
              <input
                type="number"
                value={player.ID}
                onChange={(e) => handlePlayerChange(index, "ID", e.target.value)}
                className="col-span-1 sm:col-span-1 px-4 py-2 border rounded-lg bg-gray-700 text-white"
                placeholder="Player ID"
                required
              />
              {formData.playerDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  className="text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          {formData.playerDetails.length < 6 && (
            <button
              type="button"
              onClick={addPlayer}
              className="mt-2 text-green-500 font-semibold"
            >
              + Add Player
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold"
        >
          Submit Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
