import React from "react";
import { GiSpinningBlades } from "react-icons/gi";
import PieChart from "../PieChart/PieChart";
import Employees from "./Employees";
import useEmployees from "../../Hooks/useEmployee";

function EmployeesFeedback() {
  const { employees, loading } = useEmployees(1000);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        <GiSpinningBlades className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <h1 className="text-2xl sm:text-sm font-bold text-gray-800 mb-3">
        Employee Feedback
      </h1>
      <p className="text-gray-400">
        Review and analyze employee feedback data
      </p>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto mt-5 rounded-md shadow-sm border border-gray-200">
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
            {employees.length > 0 ? (
              employees.map((employee) => (
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

      {/* Mobile Card Layout */}
      <div className="sm:hidden mt-5 space-y-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
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
              <p className="text-gray-700 sm:text-sm ">
                <span className="font-bold ">Notes:</span> {employee.notes}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No employee feedback found.
          </p>
        )}
      </div>

      {/* Chart section */}
      <div className="mt-8 flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <PieChart employees={employees} />
        </div>
      </div>
    </div>
  );
}

export default EmployeesFeedback;
