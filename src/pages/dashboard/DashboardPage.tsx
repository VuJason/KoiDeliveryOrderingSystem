import React, { useState, useMemo, useEffect } from "react";
import Card from "../../components/admin/card/Card";
import DeliveryList from "../../components/admin/delivery/list/DeliveryList";
import DeliveryPagination from "../../components/admin/delivery/pagination/DeliveryPagination";
import DeliverySearchForm from "../../components/admin/filter-delivery/DeliverySearchForm";
import SalesChart from "../../components/admin/salechart/SalesChart";
import "./DashboardPage.scss";

// Import dữ liệu mẫu từ DeliveryList
import { data as deliveryData } from "../../components/admin/delivery/list/DeliveryList";

import { useOrderManagement } from '../../hooks/useOrderManagement';
import { orderApi } from '../../services/orderApi';

import { faBox, faClock, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatCard from "../../components/admin/card/StatCard";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { getStatusColor } from "../../utils/statusColors";
import axios from "axios";

const DashboardPage: React.FC = () => {
  const {
    orders,
    isLoading,
    error,
    currentPage,
    searchInput,
    filterType,
    dashboardStats,
    getChartData,
    getFilteredData,
    setCurrentPage,
    setSearchInput,
    setFilterType,
    handleSearch,
    resetFilters,
    getCurrentPageData
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getNewOrders,
    initialFilters: {
      type: true,
    }
  });

  const chartData = useMemo(() => getChartData(), [orders]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://103.67.197.66:8080/api/revenue", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
    }
    fetchData()
  }, [])
  return (
      <div className="main-content">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {/* Stats Cards */}
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

          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
            <SalesChart data={chartData || []} />
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageData().map((order) => (
                    <tr key={order.orderId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.transport_method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <DeliveryPagination
              current={currentPage}
              onChange={setCurrentPage}
              total={orders.length}
              pageSize={5}
            />
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
