import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../../Hooks/useEmployee";

function AdminLogin() {
  const navigate = useNavigate();
  const { employees, loading } = useEmployees();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      if (!selectedEmployee) {
        alert("Select an employee to chat with!");
        return;
      }

      const emp = employees.find((e) => e.employeeName === selectedEmployee);
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("employeeId", emp.id);
      localStorage.setItem("employeeName", emp.employeeName);

      navigate("/chat");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        {loading ? (
          <p className="text-gray-500 text-center mb-3">Loading employees...</p>
        ) : (
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">-- Select Employee to Chat --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.employeeName}>
                {emp.employeeName} ({emp.job})
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login & Chat
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
