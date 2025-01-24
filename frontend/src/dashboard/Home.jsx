import React, { useState, useEffect } from "react";
import Layout from './components/Dashlayout';
import Head from '../components/Head';
import Header from './components/Header';
const Home = () => {

  const [formsCount, setFormsCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const [pointTablesCount, setPointTablesCount] = useState(0);
  const [fundsTotal, setFundsTotal] = useState(0); // For total of funds



  async function fetchDataCount(endpoint, processType = 'count') {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoint}`, {
      headers: {
        "auth-key": apiKey || "",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (processType === 'count') {
        return data.length; // Count the number of items in the array
      }

      if (processType === 'total' && Array.isArray(data)) {
        const totalSum = data.reduce((sum, item) => sum + (item.total || 0), 0); // Calculate sum of total field
        return totalSum;
      }
    }

    return 0;
  }

  useEffect(() => {
    async function loadCounts() {
      const [forms, teams, pointTables, funds] = await Promise.all([
        fetchDataCount("forms"),
        fetchDataCount("teams"),
        fetchDataCount("point-tables"),
        fetchDataCount("funds", 'total'), // Pass 'total' to calculate total of total
      ]);

      setFormsCount(forms);
      setTeamsCount(teams);
      setPointTablesCount(pointTables);
      setFundsTotal(funds); // Set the total sum of the funds
    }
    loadCounts();
  }, []);




  return (
    <Layout>
      <Head title="BRH - Dashboard" />
      <Header title="Dashboard Overview" />
      {/* stats sections */}
      <div className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/dashboard/teams">
            <div className="bg-yellow shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700">Teams</h2>
              <p className="text-4xl font-bold text-blue-500 mt-2">{teamsCount}</p>
            </div>
          </a>
          <a href="/dashboard/feedbacks">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700">Feedbacks</h2>
              <p className="text-4xl font-bold text-cyan-500 mt-2">{formsCount}</p>
            </div>
          </a>
          <a href="/dashboard/point-tables">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700">Point Tables</h2>
              <p className="text-4xl font-bold text-yellow-500 mt-2">{pointTablesCount}</p>
            </div>
          </a>
          <a href="/dashboard/funds">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700">Funds</h2>
              <p className="text-4xl font-bold text-green-500 mt-2">₹{fundsTotal}</p>
            </div>
          </a>
        </div>
      </div>

      <div className="text-center my-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Coming Soon...</h2>
        <p className="text-lg text-gray-600">New features and updates are on the way!</p>
      </div>


    </Layout>
  )
}

export default Home

