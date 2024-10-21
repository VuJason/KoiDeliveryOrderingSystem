import React from "react";
import DeliveryRow from "../row/DeliveryRow";
import "./DeliveryList.scss";

const data = [
  {
    orderNumber: "#AHGA68",
    date: "23/09/2022",
    customer: "Jacob Marcus",
    time: "2:00 pm",
    amount: "₦3400.00",
    destination: "342 Oron road, Uyo",
  },
  {
    orderNumber: "#BKHJ29",
    date: "25/09/2022",
    customer: "Emily Watson",
    time: "3:30 pm",
    amount: "₦4500.00",
    destination: "456 Ikoyi Crescent, Lagos",
  },
  {
    orderNumber: "#CZLK32",
    date: "26/09/2022",
    customer: "Mark Johnson",
    time: "12:45 pm",
    amount: "₦6200.00",
    destination: "12 Victoria Island, Lagos",
  },
  {
    orderNumber: "#DPLM73",
    date: "27/09/2022",
    customer: "Lucy Collins",
    time: "11:00 am",
    amount: "₦3000.00",
    destination: "78 Awolowo Road, Lagos",
  },
  {
    orderNumber: "#EWMX54",
    date: "28/09/2022",
    customer: "Oliver Smith",
    time: "9:00 am",
    amount: "₦5000.00",
    destination: "90 Opebi Road, Ikeja",
  },
  {
    orderNumber: "#FZXJ91",
    date: "29/09/2022",
    customer: "Sophia Evans",
    time: "4:30 pm",
    amount: "₦2000.00",
    destination: "234 Lekki Phase 1, Lagos",
  },
  {
    orderNumber: "#GQKL67",
    date: "30/09/2022",
    customer: "Ethan James",
    time: "2:30 pm",
    amount: "₦3400.00",
    destination: "15 Airport Road, Abuja",
  },
  {
    orderNumber: "#HTCJ87",
    date: "01/10/2022",
    customer: "Olivia Walker",
    time: "5:00 pm",
    amount: "₦7800.00",
    destination: "33 Maitama, Abuja",
  },
  {
    orderNumber: "#IQMZ72",
    date: "02/10/2022",
    customer: "William Brown",
    time: "1:15 pm",
    amount: "₦2900.00",
    destination: "45 Garki, Abuja",
  },
  {
    orderNumber: "#JZNG44",
    date: "03/10/2022",
    customer: "Ava Harris",
    time: "10:00 am",
    amount: "₦4200.00",
    destination: "120 Wuse Zone 5, Abuja",
  },
  {
    orderNumber: "#KXLR38",
    date: "04/10/2022",
    customer: "James Miller",
    time: "11:45 am",
    amount: "₦3500.00",
    destination: "78 Opebi Road, Ikeja",
  },
  {
    orderNumber: "#LYSM12",
    date: "05/10/2022",
    customer: "Charlotte Lee",
    time: "12:30 pm",
    amount: "₦6000.00",
    destination: "56 Ikoyi Crescent, Lagos",
  },
];

const DeliveryList: React.FC = () => {
  return (
    <div className="delivery-list">
      <div className="header-delivery">
        <div className="cell order-number">Order Number</div>
        <div className="cell date">Date</div>
        <div className="cell customer">Customer</div>
        <div className="cell time">Time</div>
        <div className="cell amount">Amount</div>
        <div className="cell destination">Destination</div>
      </div>

      {data.map((item, index) => (
        <DeliveryRow
          key={index}
          orderNumber={item.orderNumber}
          date={item.date}
          customer={item.customer}
          time={item.time}
          amount={item.amount}
          destination={item.destination}
        />
      ))}
    </div>
  );
};

export default DeliveryList;
