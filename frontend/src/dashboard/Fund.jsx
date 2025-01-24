import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "./components/Dashlayout";
import Head from "../components/Head";
import Header from "./components/Header";
import Table from "./components/Table";
import { MdDeleteForever, MdAddBox, MdEdit } from "react-icons/md";
import { format } from "date-fns";

const Fund = () => {
  const columns = [
    { key: "gameName", label: "Title" },
    { key: "collected", label: "Collection" },
    { key: "spends", label: "Spend" },
    { key: "total", label: "Total" },
    {
      key: "updatedAt",
      label: "Updated At",
      render: (row) => format(new Date(row.updatedAt), "Pp"),
    },
    {
      key: "action",
      label: "Action",
      width:"5px",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white text-xl rounded hover:bg-blue-600"
            onClick={() => handleEdit(row)}
          >
            <MdEdit />
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white text-xl rounded hover:bg-red-600"
            onClick={() => confirmDelete(row._id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [funds, setFunds] = useState({ gameName: "", collected: "", spends: "" }); // Added state for funds

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/funds`,
        {
          headers: {
            "auth-key": apiKey || "",
          },
        }
      );

      if (response.ok) {
        const fundData = await response.json();
        setData(fundData.reverse());
        setFilteredData(fundData);
      } else {
        console.error("Failed to fetch Fund:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching Fund:", error);
    }
  };

  const deleteFund = async (_id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/funds/${_id}`,
        {
          method: "DELETE",
          headers: {
            "auth-key": apiKey || "",
          },
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((fund) => fund._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((fund) => fund._id !== _id)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The  Fund has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the Fund: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the Fund.",
      });
      console.error("Error deleting Fund:", error);
    }
  };

  const confirmDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      input: 'text',
      inputPlaceholder: 'Enter password',
      inputValidator: (value) => {
        if (value !== '2025') {
          return 'Incorrect password!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFund(_id);
      }
    });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter((fund) => fund.gameName.toLowerCase().includes(term))
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  const handleAddFund = () => {
    setFunds({ gameName: "", collected: "", spends: "" });
  };

  const handleEdit = (fund) => {
    setIsEditing(true);
    setEditingId(fund._id);
    setShowPopup(true);
    setFunds({
      gameName: fund.gameName,
      collected: fund.collected,
      spends: fund.spends,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      gameName: funds.gameName,
      collected: funds.collected,
      spends: funds.spends,
    };

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/funds/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/funds`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "auth-key": apiKey || "",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Swal.fire(
          "Success!",
          `Fund ${isEditing ? "updated" : "created"} successfully.`,
          "success"
        );
        fetchData();
        setFunds({
          gameName: "",
          collected: "",
          spends: "",
        });
        setShowPopup(false);
        setIsEditing(false);
        setEditingId(null);
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} fund:`,
        error
      );
      Swal.fire("Error", `Failed to ${isEditing ? "update" : "create"} fund.`, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Head title="BRH - Funds Details" />
      <Header title="Funds Details" />
      <div className="flex justify-between items-center mt-2 mb-2">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="border border-gray-400 px-4 py-2 rounded w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => {
            setShowPopup(true);
            setIsEditing(false);
            setFunds({ gameName: "", collected: "", spends: "" });
          }}
          className="px-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-xl"
        >
          <MdAddBox />
        </button>
      </div>
      <Table columns={columns} data={filteredData} />
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96  overflow-y-scroll">
            <h2 className="text-lg md:text-xl text-center font-bold mb-4">
              {isEditing ? "Update" : "Create"} Fund
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={funds.gameName} // Corrected to use state variable
                  onChange={(e) => setFunds({ ...funds, gameName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter game name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Collection</label>
                <input
                  type="number"
                  value={funds.collected} // Corrected to use state variable
                  onChange={(e) => setFunds({ ...funds, collected: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter collected amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Spends</label>
                <input
                  type="number"
                  value={funds.spends} // Corrected to use state variable
                  onChange={(e) => setFunds({ ...funds, spends: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter spends amount"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white px-3 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Fund;
