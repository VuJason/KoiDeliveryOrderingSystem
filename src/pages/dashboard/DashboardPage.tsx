import React from "react";
import Card from "../../components/admin/card/Card";
import DeliveryList from "../../components/admin/delivery/list/DeliveryList";
import DeliveryPagination from "../../components/admin/delivery/pagination/DeliveryPagination";
import DeliverySearchForm from "../../components/admin/filter-delivery/DeliverySearchForm";
import SalesChart from "../../components/admin/salechart/SalesChart";
import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Card />
      <SalesChart />
      <DeliverySearchForm />
      <DeliveryList />
      <DeliveryPagination />
    </div>
  );
};

export default DashboardPage;
