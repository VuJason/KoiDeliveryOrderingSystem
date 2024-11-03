import React, { useState, useEffect } from 'react';
import { orderApi } from '../../services/orderApi'
import Header from '../../components/Header';
import DeliveryPagination from '../../components/admin/delivery/pagination/DeliveryPagination';
import Footer from '../../components/Footer';

function TrackPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Adjust as needed

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://103.67.197.66:8080/api/track-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return orders.slice(startIndex, startIndex + pageSize);
  };

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
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Your Deliveries</h2>
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
                  <th className="py-2 px-4 text-left font-medium text-gray-600">CLIENT</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ADDRESS</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">PRICE</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.address}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.price}</td>
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
            total={orders.length}
            pageSize={pageSize}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TrackPage;