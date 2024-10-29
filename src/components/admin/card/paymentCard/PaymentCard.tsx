import { ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import "./PaymentCard.scss";

import paymentIcon from "../../../../assets/iconCard/payment.png";

const PaymentsCard: React.FC = () => {
  return (
    <div className="payments-card">
      <div className="card-content">
        <div className="card-header">
          <span className="title">Total Payments</span>
          <div className="icon-container">
            <img
              src={paymentIcon}
              alt="Payments Icon"
              className="payments-icon"
            />
          </div>
        </div>

        <div className="card-body">
          <h1 className="payments-amount">$89,000</h1>
          <div className="percentage-decline">
            <ArrowDownOutlined className="decline-icon" />
            <span className="decline-text">4.3% Down from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
