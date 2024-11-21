import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSyncAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailsModal from "../components/admin/delivery/productDetailsModal/ProductDetailsModal";
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";
import { orderApi } from "../services/orderApi";
import { Order } from "../types/order";
import { useOrderManagement } from "../hooks/useOrderManagement";
import { getStatusColor } from "../utils/statusColors";
import axios from "axios";

function BrowserTrack() {
  const {
    orders,
    isLoading,
    error,
    currentPage,
    searchInput,
    searchError,
    filterPrice,
    filterType,
    filterStatus,
    selectedOrderId,
    isModalOpen,
    setCurrentPage,
    setSearchInput,
    setFilterPrice,
    fetchOrders,
    setFilterType,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    handleViewDetails,
    handleCloseModal,
    updateOrderStatus,
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getNewOrders,
    initialFilters: {
      type: true,
      price: true,
      status: true,
    },
  });
  const handleConfirm = async (orderId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      await axios.put(
        `http://103.67.197.66:8080/api/order/staff/${orderId}/status?status=APPROVED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (orderId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      await axios.put(
        `http://103.67.197.66:8080/api/cancel/${orderId}/staff`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen overflow-x-hidden bg-light-blue">
      <Header currentPage={undefined} />
      <section className="w-screen h-screen bg-blue-200 relative">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: "url('./koikoikoi.png')" }}
        ></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-gray-800 text-left">
              Deliveries Available
            </h1>
            <p className="mt-30 text-lg text-gray-600 text-left">
              Manage and confirm or reject delivery orders. You can view the
              list of all pending deliveries and update their status.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mt-10 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Enter order number"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${
                searchError ? "border-red-500" : "border-gray-300"
              }`}
              value={searchInput}
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
            Locate
          </button>
        </div>
      </div>

      <section className="mt-12 px-6 mb-20">
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
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      ID
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      CUSTOMER
                    </th>

                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      ORIGINAL LOCATION
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      DESTINATION
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      PRICE
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      TYPE
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      STATUS
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageData().map((order) => (
                    <tr key={order.orderId} className="border-b">
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {order.customerName}
                      </td>

                      <td className="py-3 px-4 text-sm text-gray-700 max-w-[150px] truncate overflow-hidden whitespace-nowrap">
                        {order.original_location}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 max-w-[150px] truncate overflow-hidden whitespace-nowrap">
                        {order.destination}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.price)}
                      </td>

                      <td className="py-3 px-4 text-sm text-gray-700">
                        {order.transport_method}
                      </td>
                      <td
                        className={`py-3 px-4 text-sm ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 space-x-3 flex flex-col md:flex-row items-center justify-start">
                        {order.status === "PENDING" && (
                          <button
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                            onClick={() => handleConfirm(order.orderId)}
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                          onClick={() => handleViewDetails(order.orderId)}
                        >
                          Detail
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                          onClick={() => handleDelete(order.orderId)}
                        >
                          Cancel
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
                  total={orders.length}
                  pageSize={5}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {isModalOpen && selectedOrderId && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          deliveryId={selectedOrderId}
          updateStatus={updateOrderStatus}
        />
      )}

      <Footer />
    </div>
  );
}

export default BrowserTrack;
