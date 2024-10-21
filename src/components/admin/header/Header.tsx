import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Notification from "../notification/Notification";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="header">
      {/* Menu Icon and Search Bar closer together */}
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

      {/* Notification and User Info closer together */}
      <div className="notificationUserWrapper">
        <div className="notificationBadge">
          <Notification />
        </div>
        <div className="userInfo">
          <Avatar
            src="https://i.pravatar.cc/300"
            alt="Admin Avatar"
            className="userAvatar"
          />
          <div className="userDetails">
            <div className="userName">John Doe</div>
            <div className="userRole">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
