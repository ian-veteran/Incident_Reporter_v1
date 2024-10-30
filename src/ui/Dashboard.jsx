import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import DashboardCards from "./DashboardCards";
import DashboardSideBar from "./DashboardSideBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <DashboardSideBar />

      {/* Main Content */}
      <main className="flex-grow p-8 bg-gray-100">
        {/* Top Bar */}

        <div className="sticky top-0 z-10 bg-white shadow-md p-4 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard<span className="text-yellow-600"> Reports </span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img
              src="profile-pic-url"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-red-500"
            />
          </div>
        </div>
        {/* Overview and Sales Chart */}
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
