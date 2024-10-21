import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../admin/header/Header";
import Sidebar from "../admin/sidebar/Sidebar";
import "./AdminLayout.scss";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
