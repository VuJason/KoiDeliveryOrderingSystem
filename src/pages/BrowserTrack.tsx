import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailsModal from "../components/admin/delivery/productDetailsModal/ProductDetailsModal";
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";
import { orderApi } from '../services/orderApi';
import { Order } from '../types/order';
import { useOrderManagement } from '../hooks/useOrderManagement';

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
    setFilterType,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    handleViewDetails,
    handleCloseModal,
    updateOrderStatus
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getNewOrders,
    initialFilters: {
      type: true,
      price: true,
      status: true
    }
  });

  return (
    <div className="w-screen overflow-x-hidden bg-light-blue">
      <Header currentPage={undefined} />
      <section className="w-screen h-screen bg-blue-200 relative">
        <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: "url('./koikoikoi.png')" }}></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-gray-800 text-left">Deliveries Available</h1>
            <p className="mt-30 text-lg text-gray-600 text-left">
              Manage and confirm or reject delivery orders. You can view the list of all pending deliveries and update their status.
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${searchError ? "border-red-500" : "border-gray-300"}`}
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
                    <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">CLIENT</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">DELIVERY ADDRESS</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">PRICE</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">TYPE</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">EDIT</th>
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
                          className="text-blue-600 hover:underline"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          Details
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