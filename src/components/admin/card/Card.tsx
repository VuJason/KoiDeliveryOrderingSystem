import React from "react";
import "./Card.scss";
import OrderCard from "./orderCard/OrderCard";
import PaymentsCard from "./paymentCard/PaymentCard";
import PendingCard from "./pendingCard/PendingCard";
import UserCard from "./userCard/UserCard";

const Card: React.FC = () => {
  return (
    <div className="card-container">
      <UserCard />
      <OrderCard />
      <PaymentsCard />
      <PendingCard />
    </div>
  );
};

export default Card;
