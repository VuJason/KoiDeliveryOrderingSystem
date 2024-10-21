import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";
import "./PendingCard.scss";

import pendingIcon from "../../../../assets/iconCard/pending.png";

const PendingCard: React.FC = () => {
  return (
    <div className="pending-card">
      <div className="card-content">
        <div className="card-header">
          <span className="title">Total Pending</span>
          <div className="icon-container">
            <img
              src={pendingIcon}
              alt="Pending Icon"
              className="pending-icon"
            />
          </div>
        </div>

        <div className="card-body">
          <h1 className="pending-count">2,040</h1>
          <div className="percentage-growth">
            <ArrowUpOutlined className="growth-icon" />
            <span className="growth-text">1.8% Up from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCard;
