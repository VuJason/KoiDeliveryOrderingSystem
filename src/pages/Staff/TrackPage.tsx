import React, { useState, useEffect } from 'react';
import { orderApi } from '../../services/orderApi';
import Header from '../../components/Header';

function TrackPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getCustomerOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await orderApi.deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      setError("Failed to delete order");
    }
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
                  <th className="py-2 px-4 text-left font-medium text-gray-600">CUSTOMER NAME</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">DELIVERY ADDRESS</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ORDER DATE</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">PRICE</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.customer || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.address}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{new Date(order.order_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.price}</td>
                    <td className={`py-3 px-4 text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default TrackPage;