import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";
import "./OrderCard.scss";

import orderIcon from "../../../../assets/iconCard/order.png";

const OrderCard: React.FC = () => {
  return (
    <div className="order-card">
      <div className="card-content">
        <div className="card-header">
          <span className="title">Total Order</span>
          <div className="icon-container">
            <img src={orderIcon} alt="Order Icon" className="order-icon" />
          </div>
        </div>

        <div className="card-body">
          <h1 className="order-count">10,293</h1>
          <div className="percentage-growth">
            <ArrowUpOutlined className="growth-icon" />
            <span className="growth-text">1.3% Up from past week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
