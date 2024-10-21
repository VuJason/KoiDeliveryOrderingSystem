import React from "react";
import "./DeliveryRow.scss";

interface DeliveryRowProps {
  orderNumber: string;
  date: string;
  customer: string;
  time: string;
  amount: string;
  destination: string;
}

const DeliveryRow: React.FC<DeliveryRowProps> = ({
  orderNumber,
  date,
  customer,
  time,
  amount,
  destination,
}) => {
  return (
    <div className="delivery-row">
      <div className="cell order-number">{orderNumber}</div>
      <div className="cell date">{date}</div>
      <div className="cell customer">{customer}</div>
      <div className="cell time">{time}</div>
      <div className="cell amount">{amount}</div>
      <div className="cell destination">{destination}</div>
    </div>
  );
};

export default DeliveryRow;
