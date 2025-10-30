import React, { useState, useMemo } from "react";
import { GiSpinningBlades } from "react-icons/gi";
import PieChart from "../PieChart/PieChart";
import Employees from "./Employees";

function EmployeesFeedback({ employees = [], loading }) {
  const [scoreFilter, setScoreFilter] = useState(""); 
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const empDate = new Date(emp.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchScore =
        !scoreFilter || String(emp.score) === String(scoreFilter);
      const matchStart = !start || empDate >= start;
      const matchEnd = !end || empDate <= end;

      return matchScore && matchStart && matchEnd;
    });
  }, [employees, scoreFilter, startDate, endDate]);

  // لو البيانات لسه بتتحمل
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        <GiSpinningBlades className="animate-spin text-3xl" />
      </div>
    );
  }



  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Employee Feedback
      </h1>
      <p className="text-gray-400 mb-4">
        Review and analyze employee feedback data
      </p>

      {/* 🔍 Filters Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 bg-gray-50 p-4 rounded-md border">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Filter by Score</label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Enter score"
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setScoreFilter("");
            setStartDate("");
            setEndDate("");
          }}
          className="mt-2 sm:mt-6 bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* 🧾 Table */}
      <div className="hidden sm:block overflow-x-auto rounded-md shadow-sm border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="text-gray-700 capitalize text-sm font-semibold bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left border-b">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left border-b">
                Employee Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left border-b">Score</th>
              <th className="px-4 sm:px-6 py-3 text-left border-b">Notes</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <Employees key={employee.id} employee={employee} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-6 italic whitespace-nowrap"
                >
                  No employee feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="sm:hidden mt-5 space-y-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="border border-gray-200 rounded-md p-4 shadow-sm"
            >
              <p className="text-gray-700 text-sm">
                <span className="font-bold">Date:</span> {employee.date}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-bold">Employee Name:</span>{" "}
                {employee.employeeName}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-bold">Score:</span> {employee.score}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-bold">Notes:</span> {employee.notes}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No employee feedback found.
          </p>
        )}
      </div>

      {/* 📊 Chart */}
      <div className="mt-8 flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <PieChart employees={filteredEmployees} />
        </div>
      </div>
    </div>
  );
}

export default EmployeesFeedback;
