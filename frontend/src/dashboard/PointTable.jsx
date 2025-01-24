import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "./components/Dashlayout";
import Head from "../components/Head";
import Header from "./components/Header";
import Table from "./components/Table";
import { MdDeleteForever, MdAddBox, MdEdit , MdDownload } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { format } from "date-fns";
import { toJpeg } from "html-to-image";

const PointTable = () => {
  const columns = [
    { key: "name", label: "Name" },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => format(new Date(row.createdAt), "Pp"),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      render: (row) => format(new Date(row.updatedAt), "Pp"),
    },
    {
      key: "action",
      label: "Action",
      width:"8px",
      render: (row) => (
        <div className="flex space-x-2">
              <button
            className="px-2 py-1 bg-green-500 text-white text-xl rounded hover:bg-green-600"
            onClick={() => handleView(row)}
          >
           <CiViewList/>
          </button>
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
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Handle "View" button click
  const handleView = (row) => {
    setSelectedRow(row);
    setShowViewPopup(true);
  };

  // Handle "Download" button inside the modal
  const handleDownload = async (selectedRow) => {
    const elementId = `table-${selectedRow._id}`;
    const element = document.getElementById(elementId);

    if (!element) {
      Swal.fire("Error", "Unable to find the table to download.", "error");
      return;
    }

    Swal.fire({
      title: "Downloading...",
      text: "Please wait while the table is being downloaded.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const dataUrl = await toJpeg(element, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = `${selectedRow.name}-table.jpg`;
      link.href = dataUrl;
      link.click();
      Swal.close();
      Swal.fire("Success", "Table downloaded successfully.", "success");
    } catch (error) {
      console.error("Error downloading the table:", error);
      Swal.close();
      Swal.fire("Error", "Failed to download the table.", "error");
    }
  };

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/point-tables`,
        {
          headers: {
            "auth-key": apiKey || "",
          },
        }
      );

      if (response.ok) {
        const pointData = await response.json();
        setData(pointData.reverse());
        setFilteredData(pointData);
      } else {
        console.error("Failed to fetch Point Table:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching Point Table:", error);
    }
  };

  const deletePoint = async (_id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/point-tables/${_id}`,
        {
          method: "DELETE",
          headers: {
            "auth-key": apiKey || "",
          },
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((point) => point._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((point) => point._id !== _id)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The Point Table has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the point Table: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the Point Table.",
      });
      console.error("Error deleting point Table:", error);
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
    }).then((result) => {
      if (result.isConfirmed) {
        deletePoint(_id);
      }
    });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter((point) => point.name.toLowerCase().includes(term))
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  const handleAddTeam = () => {
    setTeams([
      ...teams,
      { name: "", matches: "", dinner: "", pp: "", kp: "", total: "" },
    ]);
  };

  const handleRemoveTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index][field] = value;
    setTeams(updatedTeams);
  };

  const handleEdit = (point) => {
    setIsEditing(true);
    setEditingId(point._id);
    setName(point.name);
    setTeams(point.teams);
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, teams };

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/point-tables/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/point-tables`;

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
          `Point table ${isEditing ? "updated" : "created"} successfully.`,
          "success"
        );
        fetchData();
        setName("");
        setTeams([]);
        setShowPopup(false);
        setIsEditing(false);
        setEditingId(null);
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} point table:`,
        error
      );
      Swal.fire("Error", `Failed to ${isEditing ? "update" : "create"} point table.`, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Head title="BRH - PointTable" />
      <Header title="PointTable APP" />
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
            setName("");
            setTeams([{ name: "", matches: "", dinner: "", pp: "", kp: "", total: "" }]);
          }}
          className="px-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-xl"
        >
          <MdAddBox />
        </button>
      </div>
      <Table columns={columns} data={filteredData} />
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg  h-[47%] overflow-y-scroll">
            <h2 className="text-lg md:text-xl text-center font-bold mb-4">
              {isEditing ? "Update" : "Create"} Point Table
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter point table name"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Teams</h3>
                {teams.map((team, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    {["name", "matches", "dinner", "pp", "kp"].map(
                      (field) => (
                        <input
                          key={field}
                          type={field === "name" ? "text" : "number"}
                          value={team[field]}
                          onChange={(e) =>
                            handleTeamChange(index, field, e.target.value)
                          }
                          className={`border border-gray-300 rounded px-3 py-1 ${field === "name" ? "w-28" : "w-11"}`}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        required
                        />
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveTeam(index)}
                      className="font-bold text-red-800 px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTeam}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Team
                </button>
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

{showViewPopup && selectedRow && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full h-3/4 overflow-scroll">
            <h2 className="text-lg font-bold mb-4">View Point Table</h2>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 m-1"
                onClick={() => handleDownload(selectedRow)}
              >
                Download
              </button>
              <button
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 m-1"
                onClick={() => setShowViewPopup(false)}
              >
                Close
              </button>
            </div>
            <h1 className="text-xl font-bold text-center mb-4">{selectedRow.name}</h1>
            <div id={`table-${selectedRow._id}`} className="p-4 bg-cover bg-[url('/img/pointtable-bg.png')] ">
      <div className="w-full h-full">
        <table className="table-auto w-full border-separate border-spacing-[0.10rem] border-gray-300 shadow-lg">
       
          <thead>
            <tr className=" bg-[#abadaa]">
            <th colSpan={7} className="border border-gray-300 px-4 py-2 text-center">
              <img src="/img/logo.png" alt="Logo" className="w-full h-24" />
              <p className="text-xl font-bold">DAILY SCRIMS</p>
            </th>
            </tr>
            <tr className=" bg-yellow-500 text-black">
                <th colSpan={7} className="border border-gray-300 text-xl px-4 py-2">Overall Standings</th>
            </tr>
            <tr className="bg-[#d1d2d1] text-gray-700 text-left">
              <th className="border border-gray-400 px-4 py-2">#</th>
              <th className="border border-gray-400 px-4 py-2">Team Name</th>
              <th className="border border-gray-400 px-4 py-2">Matches</th>
              <th className="border border-gray-400 px-4 text-2xl text-yellow-500 py-2"><GiChickenOven/></th>
              <th className="border border-gray-400 px-4 py-2">PP</th>
              <th className="border border-gray-400 px-4 py-2">KP</th>
              <th className="border border-gray-400 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedRow.teams.sort((a, b) => b.total - a.total).map((team, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-50`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175]">{index + 1}</td>
                <td className="border border-gray-300 bg-yellow-400 px-4 py-2">{team.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175]">{team.matches}</td>
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175]">{team.dinner}</td>
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175]">{team.pp}</td>
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175]">{team.kp}</td>
                <td className="border border-gray-300 px-4 py-2 text-center bg-[#506175] font-bold">
                  {team.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-xs font-semibold text-center text-gray-300 pt-3">Made With 💕 By BRH/Nexbytes</h1>
    </div>
          </div>
        </div>
      )}
    </Layout>
    
  );
};

export default PointTable;
