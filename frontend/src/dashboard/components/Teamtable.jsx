import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const Teamtable = () => {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 6;
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teams`, {
        headers: {
          "auth-key": key,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch teams");
      const result = await response.json();
      setData(result.reverse()); // Fetch data in reverse order
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch data. Please try again later.", "error");
    }
  };

  const handleDeleteTeam = async (teamId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Deleting a team will remove all its players!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}`, {
          method: "DELETE",
          headers: {
            "auth-key": key,
          },
        });
        if (!response.ok) throw new Error("Failed to delete team");

        Swal.fire("Deleted!", "Team has been deleted.", "success");
        await fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error("Error deleting team:", error);
        Swal.fire("Error", "Failed to delete the team. Try again later.", "error");
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  const filteredData = selectedTeam
    ? data.filter((team) => team.name === selectedTeam)
    : data;

  const searchedTeams = filteredData.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.phone.includes(searchTerm)
  );

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = searchedTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const totalPages = Math.ceil(searchedTeams.length / teamsPerPage);

  return (
    <div className="p-6 mt-2">


      {/* Team Search */}
      <div className="flex justify-center mb-3 space-x-4">
        <select
          className="px-4 py-2 rounded-lg border border-gray-300"
          onChange={(e) => {
            setSelectedTeam(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedTeam}
        >
          <option value="">All Teams</option>
          {Array.from(new Set(data.map((team) => team.name))).map(
            (teamName, index) => (
              <option key={index} value={teamName}>
                {teamName}
              </option>
            )
          )}
        </select>
        <input
          type="text"
          placeholder="Search teams..."
          className="px-4 py-2 rounded-lg border border-gray-300 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      {currentTeams.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-2 py-1">Team Name</th>
                <th className="border border-gray-300 px-2 py-1">Leader</th>
                <th className="border border-gray-300 px-2 py-1">Phone</th>
                <th className="border border-gray-300 px-2 py-1">Players | IGN | ID</th>
                <th className="border border-gray-300 px-2 py-1">TimeSlot</th>
                <th className="border border-gray-300 px-2 py-1">Timestamp</th>
                <th className="border border-gray-300 px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTeams.map((team) => (
                <tr key={team._id} className="text-center">
                  <td className="border border-gray-300 px-2 py-1 ">{team.name}</td>
                  <td className="border border-gray-300 px-2 py-1 ">{team.leader}</td>
                  <td className="border border-gray-300 px-2 py-1 ">{team.phone}</td>
                  <td className="border border-gray-300 px-2 py-1 ">
                    <ul className=" list-inside ">
                      {team.playerDetails.map((player, idx) => (
                        <li key={idx} type="1">
                          <strong>{player.name}</strong> - {player.IGN || "N/A"} - {player.ID || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-2 py-1 ">{team.timeSlot}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {formatTimestamp(team.timestamp)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 w-2">
                    <button
                      onClick={() => handleDeleteTeam(team._id)}
                      className="px-2 py-2 text-2xl bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">No team found in the table</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-1 py-1 text-lg bg-gray-300 text-gray-700 rounded-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <GrFormPreviousLink />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
              } rounded-lg`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-1 py-1 text-lg bg-gray-300 text-gray-700 rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <GrFormNextLink />
        </button>
      </div>
    </div>
  );
};

export default Teamtable;
