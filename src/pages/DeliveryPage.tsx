import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";
import { useOrderManagement } from "../hooks/useOrderManagement";
import ProductDetailsModal from "../components/admin/delivery/productDetailsModal/ProductDetailsModal";
import Header from "../components/admin/header/Header";
import { orderApi } from '../services/orderApi';

function DeliveryPage() {
  const {
    orders,
    isLoading,
    error,
    currentPage,
    filterDate,
    filterType,
    filterStatus,
    selectedOrderId,
    isModalOpen,
    setCurrentPage,
    setFilterDate,
    setFilterType,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    handleViewDetails,
    handleCloseModal,
    updateOrderStatus
  } = useOrderManagement({
    fetchOrdersFn: orderApi.getDeliveryOrders,
    initialFilters: {
      date: true,
      type: true,
      status: true,
      price: false,
      product: false
    }
  });

  console.log('Orders:', orders);
  console.log('IsLoading:', isLoading);
  console.log('Error:', error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }

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
      <Header currentPage={undefined} />
      
      <section className="mt-12 px-6 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Delivery Management</h2>
        
        {/* Filter Section */}
        <div className="flex justify-start items-center mb-6 space-x-4">
          <button className="flex items-center text-gray-600 font-medium">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter By
          </button>
          
          <div className="relative">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Delivery Type</option>
              <option value="foodstuff">Foodstuff</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home appliances">Home Appliances</option>
              <option value="books">Books</option>
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
                    <th className="py-2 px-4 text-left font-medium text-gray-600">RIDER</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">ADDRESS</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">DATE</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">TYPE</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageData().map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.rider}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.address}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.type}</td>
                      <td className={`py-3 px-4 text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="text-blue-600 hover:underline"
                        >
                          View Details
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

export default DeliveryPage;