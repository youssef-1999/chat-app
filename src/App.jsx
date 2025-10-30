import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home"; 
import Admin from './Pages/Admin/Admin'
import Chat from './Pages/Chat/Chat'
import Dashboard from "./Pages/Dashboard/Dashboard";


const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
	  {path:'admin-login',element:<Admin/>},
      { path: "chat", element: <Chat  /> },
   
    ],
  },

]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
