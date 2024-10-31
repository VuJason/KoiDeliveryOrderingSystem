import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TrackOrder from "../components/TrackOrder";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Delivery {
  id: number;
  customerName: string;
  destination: string;
  order_date: string;
  price: number;
  status: string;
}

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://103.67.197.66:8080/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setDeliveries(data);
        setFilteredDeliveries(data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
    setError("");
  };

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      setFilteredDeliveries(deliveries);
      return;
    }

    const filtered = deliveries.filter(
      (delivery) => delivery.id.toString() === trackingNumber.trim()
    );

    if (filtered.length > 0) {
      setFilteredDeliveries(filtered);
      setError("");
    } else {
      setError("No delivery found with this tracking number");
      setFilteredDeliveries([]);
    }
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <Header />

      <main className="w-full pb-16">
        <div className="relative w-full h-[800px]">
          <img
            src="./bg.png"
            alt="Delivery Service Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pr-96 bg-opacity-50 flex p-20 flex-col justify-center items-start text-center">
            <h1 className="text-4xl text-white text-left md:text-6xl font-bold mb-6 leading-tight">
              Deliveries Available
            </h1>
            <p className="text-white text-xl md:text-2xl font-semibold text-left">
              We provide an integrated logistics solution built on Express
              Parcel, Cross Border, Warehousing, Freight and Software value
              added services that helps brands deliver faster and provide a
              superior experience
            </p>
          </div>
        </div>

        <div className="mt-10 px-4">
          <div className="px-20 space-y-10">
            <div className="px-40">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight text-center">
                Track your order promptly
              </h2>
              <p className="text-center">
                We provide an integrated logistics solution built on Express
                Parcel, Cross Border, Warehousing, Freight and Software value
                added services that helps brands deliver faster and provide a
                superior experience
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      error ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out`}
                    aria-label="Tracking number input"
                  />
                  {error && (
                    <p className="absolute left-0 -bottom-6 text-red-500 text-sm">
                      {error}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleTrackOrder}
                className="w-40 items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                aria-label="Track Order"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-4">
          <div className="px-20 space-y-10">
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6">Your deliveries</h2>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-b p-3 text-left">Order ID</th>
                      <th className="border-b p-3 text-left">Customer Name</th>
                      <th className="border-b p-3 text-left">
                        Delivery Address
                      </th>
                      <th className="border-b p-3 text-left">Order Date</th>
                      <th className="border-b p-3 text-left">Price</th>
                      <th className="border-b p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliveries.map((delivery) => (
                      <tr key={delivery.id}>
                        <td className="border-b p-3">{delivery.id}</td>
                        <td className="border-b p-3">
                          {delivery.customerName}
                        </td>
                        <td className="border-b p-3">{delivery.destination}</td>
                        <td className="border-b p-3">
                          {new Date(delivery.order_date).toLocaleDateString()}
                        </td>
                        <td className="border-b p-3">${delivery.price}</td>
                        <td className="border-b p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              delivery.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {delivery.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryHistory;
