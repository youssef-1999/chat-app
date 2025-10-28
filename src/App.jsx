import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home"; // ✅ Make sure this file exists
import Admin from "./Components/AdminLogin/Admin";

import Chat from "./Components/AdminLogin/Chat";


const router = createBrowserRouter([
  {
    path: "/", // root layout
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // ✅ shows Home at root "/"
      { path: "dashboard", element: <Dashboard /> },
	  {path:'admin-login',element:<Admin/>},
      { path: "chat", element: <Chat  /> },
    //   { path: "chat-service", element: <ChatService  /> },
	// {path:'admin-chat',element:<AdminChat/>},
    //   { path: "employee-chat", element: <EmployeeChat /> },
    ],
  },

]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
