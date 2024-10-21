import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";
import "./UserCard.scss";

import userIcon from "../../../../assets/iconCard/user.png";

const UserCard: React.FC = () => {
  return (
    <div className="user-card">
      <div className="card-content">
        <div className="card-header">
          <span className="title">Total User</span>
          <div className="icon-container">
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </div>
        </div>

        <div className="card-body">
          <h1 className="user-count">40,689</h1>
          <div className="percentage-growth">
            <ArrowUpOutlined className="growth-icon" />
            <span className="growth-text">8.5% Up from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
