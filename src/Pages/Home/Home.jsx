import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../../Hooks/useEmployee";

function Home() {
  const { employees, loading } = useEmployees();
  const [role, setRole] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role === "admin") {
      navigate("/admin-login");
    } else if (role === "employee" && selectedEmployee) {
      const emp = employees.find((e) => e.employeeName === selectedEmployee);
      if (emp) {
        localStorage.setItem("employeeId", emp.id);
        localStorage.setItem("employeeName", emp.employeeName);
        localStorage.removeItem("isAdmin");
        navigate("/chat");
      }
    } else {
      alert("Please select your role and employee name first!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Choose your role
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        {role === "employee" && (
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">-- Select Employee --</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              employees.map((emp) => (
                <option key={emp.id} value={emp.employeeName}>
                  {emp.employeeName} ({emp.job})
                </option>
              ))
            )}
          </select>
        )}

        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Home;
