import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";
import { orderApi } from '../services/orderApi';
import { Order } from '../types/order';
import { useOrderManagement } from '../hooks/useOrderManagement';


function DeliveryTrackPage() {
  const {
    isLoading,
    error,
    currentPage,
    searchInput,
    searchError,
    filterPrice,
    filterProduct,
    filterStatus,
    setCurrentPage,
    setSearchInput,
    setFilterPrice,
    setFilterProduct,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    pageSize
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getDeliveryTrackOrders,
    initialFilters: {
      date: false,
      type: false,
      status: true,
      price: true,
      product: true
    }
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500 bg-green-100";
      case "in transit":
        return "text-yellow-500 bg-yellow-100";
      case "delivered":
        return "text-blue-500 bg-blue-100";
      case "canceled":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="w-screen overflow-x-hidden bg-light-blue">
      {/* Sử dụng Header mới từ components/Header */}
      <Header currentPage={undefined} />
      {/* Hero Section */}
      <section className="w-screen h-screen bg-blue-200 relative">
        <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: "url('./koikoi.png')" }}></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-black-800 text-left">Deliveries Available</h1>
            <p className="mt-30 text-lg text-black-600 text-left">
              Enter your order number below to track your delivery. We provide an integrated logistics solution built on Express Parcel, Cross Border, Warehousing, Freight and Software value added services that helps brands deliver faster and provide a superior experience.
            </p>
          </div>
        </div>
      </section>

 {/* Search Section */}
       <div className="relative z-10 mt-10 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Enter delivery product"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${searchError ? "border-red-500" : "border-gray-300"}`}
              value={searchInput}  // Use searchInput here
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchError("");
              }}
            />
            {searchError && (
              <p className="absolute left-0 -bottom-6 text-red-500 text-sm">
                {searchError}
              </p>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="w-40 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Find
          </button>
        </div>
      </div>

      <section className="mt-12 px-6 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Deliveries</h2>
        <div className="flex justify-start items-center mb-6 space-x-4">
          <button className="flex items-center text-gray-600 font-medium">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter By
          </button>
          <div className="relative">
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Delivery Product</option>
              <option value="koi bird">Koi Bird</option>
              <option value="gilbert koi">Gilbert Koi</option>
              <option value="alan koi">Alan Koi</option>
              <option value="koi murray">Koi Murray</option>
              <option value="koi sullivan">Koi Sullivan</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Delivery Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
              <option value="in_transit">In Transit</option>
              <option value="canceled">Canceled</option>
              <option value="rejected">Rejected</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
             {/* Nút Reset */}
          <button
            className="text-red-500 flex items-center font-semibold"
            onClick={resetFilters}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
            Reset Filter
          </button>
          </div>


        {/* Delivery Table */}
<div className="overflow-x-auto">
  {isLoading ? (
    <div className="text-center py-4">Loading...</div>
  ) : error ? (
    <div className="text-center py-4 text-red-500">{error}</div>
  ) : (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">DELIVERY PRODUCT</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">DELIVERY ADDRESS</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">PRICE</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">CUSTOMER</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
        </tr>
      </thead>
      <tbody>
        {getCurrentPageData().map((order) => (
          <tr key={order.id} className="border-b">
            <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{order.product}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{order.address}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{order.price}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
            <td className={`py-3 px-4 text-sm ${getStatusColor(order.status)}`}>
              {order.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

 <div className="mt-4">
          <DeliveryPagination
            current={currentPage}
            onChange={setCurrentPage}
            total={getCurrentPageData().length}
            pageSize={pageSize}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DeliveryTrackPage;