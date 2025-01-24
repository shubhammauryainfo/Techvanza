import React, { useState } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

const Table = ({ columns, data, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto mt-3">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-3 py-2 border border-gray-300 font-semibold"
                style={{ width: column.width || 'auto' }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.length > 0 ? (
            currentPageData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 py-1 border border-gray-300"
                    style={{ width: column.width || 'auto' }}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 border border-gray-300 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-green-300 text-gray-800 rounded-l hover:bg-green-400 disabled:bg-gray-200"
          >
            <GrLinkPrevious />
          </button>
          <div className="px-4 py-2 text-gray-700">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-green-300 text-gray-800 rounded-r hover:bg-green-400 disabled:bg-gray-200"
          >
            <GrLinkNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
