import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    quantity: 0,
    fish_weight: 0,
    original_location: "",
    destination: "",
    transport_method: "",
    order_date: new Date().toISOString(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "fish_weight" ? Number(value) : value,
    }));
  };
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://103.67.197.66:8080/api/order", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      console.log("Order placed successfully:", data);
    } catch (error) {
      console.error("Error placing order:", error);
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
              Package delivery
            </h1>
            <p className="text-white text-xl md:text-2xl font-semibold text-left">
              We provide an integrated logistics solution built on Express
              Parcel, Cross Border, Warehousing, Freight and Software value
              added services that helps brands deliver faster and provide a
              superior experience
            </p>
          </div>
        </div>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-2xl space-y-4">
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              step="0.1"
              name="fish_weight"
              placeholder="Enter fish weight (kg)"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="original_location"
              placeholder="Enter origin location"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="destination"
              placeholder="Enter destination"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="transport_method"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Transport Method</option>
              <option value="Air">Air</option>
              <option value="Sea">Sea</option>
              <option value="Ground">Ground</option>
            </select>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
