import { MenuOutlined, LogoutOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Input, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Notification from "../notification/Notification";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="header">
      <div className="menuSearchWrapper">
        <MenuOutlined className="menuIcon" />
        <Input
          prefix={
            <AiOutlineSearch style={{ marginRight: "5px", color: "#ccc" }} />
          }
          placeholder="Search"
          className="searchBar"
        />
      </div>

      <div className="notificationUserWrapper">
        <div className="notificationBadge">
          <Notification />
        </div>
        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="userInfo">
            <Avatar
              src="https://i.pravatar.cc/300"
              alt="Admin Avatar"
              className="userAvatar"
            />
            <div className="userDetails">
              <div className="userName">{user?.username}</div>
              <div className="userRole">{user?.role}</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
