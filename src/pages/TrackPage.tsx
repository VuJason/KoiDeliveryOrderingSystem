import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";
import { orderApi } from '../services/orderApi';
import { Order } from '../types/order';
import { useOrderManagement } from '../hooks/useOrderManagement';

function TrackPage() {
  const {
    orders,
    isLoading,
    error,
    currentPage,
    searchInput,
    searchError,
    filterPrice,
    filterProduct,
    filterType,
    filterStatus,
    selectedOrderId,
    isModalOpen,
    setCurrentPage,
    setSearchInput,
    setFilterPrice,
    setFilterProduct,
    setFilterType,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    handleViewDetails,
    handleCloseModal,
    updateOrderStatus,
    handleDeleteOrder
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getTrackOrders,
    initialFilters: {
      date: false,
      type: true,
      status: true,
      price: true,
      product: true
    }
  });

  return (
    <div className="w-screen overflow-x-hidden bg-light-blue">
      <Header currentPage={undefined} />
      <section className="w-screen h-screen bg-blue-200 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('./track-bg.png')" }}></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-gray-800 text-left">Track Your Delivery</h1>
            <p className="mt-30 text-lg text-gray-600 text-left">
              Enter your order number below to track your delivery. We provide real-time tracking updates for all your shipments.
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter tracking number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchError && (
              <p className="absolute left-0 -bottom-6 text-red-500 text-sm">
                {searchError}
              </p>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="w-40 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Track
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <section className="mt-12 px-6 mb-20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
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
            <button
              className="text-red-500 flex items-center font-semibold"
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
              Reset Filter
            </button>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">CLIENT</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ADDRESS</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">PRICE</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">TYPE</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.address}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.price}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.type}</td>
                    <td className={`py-3 px-4 text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <DeliveryPagination
                current={currentPage}
                onChange={setCurrentPage}
                total={getCurrentPageData().length}
                pageSize={pageSize}
              />
            </div>
          </>
        )}
      </div>


      <Footer />
    </div>
  );
}

export default TrackPage;