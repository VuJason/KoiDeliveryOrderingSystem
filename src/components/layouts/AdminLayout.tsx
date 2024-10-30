import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../admin/header/Header";
import Sidebar from "../admin/sidebar/Sidebar";
import "./AdminLayout.scss";

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
};

export default AdminLayout;
