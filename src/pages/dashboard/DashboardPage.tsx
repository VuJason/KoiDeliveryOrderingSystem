import React, { useState, useMemo, useEffect } from "react";
import DeliveryList from "../../components/admin/delivery/list/DeliveryList";
import DeliveryPagination from "../../components/admin/delivery/pagination/DeliveryPagination";
import DeliverySearchForm from "../../components/admin/filter-delivery/DeliverySearchForm";
import SalesChart from "../../components/admin/salechart/SalesChart";
import "./DashboardPage.scss";

import { orderApi } from '../../services/orderApi';
import { faBox, faClock, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import StatCard from "../../components/admin/card/StatCard";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Card from "../../components/admin/card/Card";

const DashboardPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://103.67.197.66:8080/api/delivery-history", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch delivery orders");
        }

        const data = await response.json();
        setOrders(data);
        updateDashboardStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateDashboardStats = (orders) => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === "Pending").length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.price, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    setDashboardStats({
      totalOrders,
      pendingOrders,
      totalRevenue,
      averageOrderValue,
    });
  };

  const getChartData = (orders) => {
    return orders.map(order => ({
      date: order.order_date,
      total: order.price,
    }));
  };

  const chartData = useMemo(() => getChartData(orders), [orders]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <>
              <Card />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Orders"
                  value={dashboardStats?.totalOrders || 0}
                  icon={faBox}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Pending Orders"
                  value={dashboardStats?.pendingOrders || 0}
                  icon={faClock}
                  color="bg-yellow-500"
                />
                <StatCard
                  title="Total Revenue"
                  value={`$${dashboardStats?.totalRevenue.toFixed(2) || 0}`}
                  icon={faDollarSign}
                  color="bg-green-500"
                />
                <StatCard
                  title="Average Order Value"
                  value={`$${dashboardStats?.averageOrderValue.toFixed(2) || 0}`}
                  icon={faChartLine}
                  color="bg-purple-500"
                />
              </div>

              <DeliverySearchForm />
              <DeliveryList orders={orders} />
              <DeliveryPagination />
              <SalesChart data={chartData || []} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
