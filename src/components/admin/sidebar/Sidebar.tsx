import {
  DashboardOutlined,
  DeliveredProcedureOutlined,
  IdcardOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import Logout from "../logout-form/LogoutForm";
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const location = useLocation(); // Get the current location for active route highlighting

  // Show the logout confirmation modal
  const showLogoutModal = () => {
    setIsLogoutVisible(true);
  };

  // Handle logout confirmation
  const handleLogoutOk = () => {
    setIsLogoutVisible(false);
    // Add your logout logic here
    console.log("Logged out");
  };

  // Cancel the logout modal
  const handleLogoutCancel = () => {
    setIsLogoutVisible(false);
  };

  // Determine the selected menu item based on the current route
  const selectedKey = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "1";
      case "/users":
        return "2";
      case "/messages":
        return "3";
      case "/delivery":
        return "4";
      case "/verify-identity":
        return "5";
      case "/settings":
        return "6";
      default:
        return "1";
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/koilogo.png" alt="Icon Background" width="60" height="29" />
      </div>
      <Menu mode="vertical" selectedKeys={[selectedKey()]} className="menu">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          <Link to="/messages">Messages</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<DeliveredProcedureOutlined />}>
          <Link to="/delivery">Delivery</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<IdcardOutlined />}>
          <Link to="/verify-identity">Verify Identity</Link>
        </Menu.Item>
        <div className="sidebar-footer">
          <Menu.Item key="6" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<LogoutOutlined />}
            onClick={showLogoutModal}
          >
            Log Out
          </Menu.Item>
        </div>
      </Menu>

      {/* Render the Logout modal */}
      <Logout
        isVisible={isLogoutVisible}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
      />
    </div>
  );
};

export default Sidebar;
