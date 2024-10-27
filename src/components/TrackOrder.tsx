import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTrackingNumber(value);
    setError("");
  };

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) {
      setError("Tracking number required");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulating order tracking logic
      alert(`Tracking order: ${trackingNumber}`);
    }, 2000);
  };

  return (
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
        className={`w-40 items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
        aria-label="Track Order"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Track Order"
        )}
      </button>
    </div>
  );
};

export default TrackOrder;