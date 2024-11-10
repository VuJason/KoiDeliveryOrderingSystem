import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Order = () => {
  const [fishDetails, setFishDetails] = useState({
    name: "",
    fish_weight: 0
  });
  const [orderDetails, setOrderDetails] = useState({
    quantity: 0,
    original_location: "",
    destination: "",
    transport_method: "",
    additional_services: "",
    order_date: new Date().toISOString(),
  });
  const [qrCode, setQrCode] = useState<string>("");

  const [isFishSubmitted, setIsFishSubmitted] = useState(false);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notification, setNotification] = useState({
    message: '',
    type: '' // 'success' hoặc 'error'
  });

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!selectedServices.includes(value) && value !== "") {
      const newServices = [...selectedServices, value];
      setSelectedServices(newServices);
      setOrderDetails((prev) => ({
        ...prev,
        additional_services: newServices.join(", "),
      }));
    }
    setIsSelectOpen(false);
  };

  const removeService = (serviceToRemove: string) => {
    const newServices = selectedServices.filter(
      (service) => service !== serviceToRemove
    );
    setSelectedServices(newServices);
    setOrderDetails((prev) => ({
      ...prev,
      additional_services: newServices.join(", "),
    }));
  };

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

  const handleFishSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://103.67.197.66:8080/api/koifish", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fishDetails),
      });

      if (response.ok) {
        setIsFishSubmitted(true);
        setNotification({
          message: "Fish details submitted successfully",
          type: "success"
        });
      }
    } catch (error) {
      setNotification({
        message: "Failed to submit fish details",
        type: "error"
      });
    }
  };
  const handlePlaceOrder = async () => {
    setNotification({
      message: "",
      type: ""
    })
    if (!orderDetails.quantity || !orderDetails.original_location || !orderDetails.destination || !orderDetails.transport_method) {
      setNotification({
        message: 'Vui lòng điền đầy đủ thông tin đơn hàng',
        type: 'error'
      });
      return;
    }



    try {
      const token = localStorage.getItem("token");
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

      const orderId = data.id;
      const paymentResponse = await fetch(`http://103.67.197.66:8080/api/payment/generate-qrcode/${orderId}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      const paymentData = await paymentResponse.text();
      console.log("Payment QR code:", paymentData);
      window.open(paymentData, '_blank');


    } catch (error) {
      setNotification({
        message: 'Đã có lỗi xảy ra khi đặt hàng',
        type: 'error'
      });
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
        {!isFishSubmitted && (
          <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-2xl space-y-4">
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) => setFishDetails(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="number"
                placeholder="Fish Weight"
                onChange={(e) => setFishDetails(prev => ({ ...prev, fish_weight: Number(e.target.value) }))}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleFishSubmit}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Submit Fish Details
              </button>
            </div>
          </div>
        )}
        {isFishSubmitted && (
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
              <div className="relative">
                <div
                  className="w-full p-2 border rounded min-h-[42px] cursor-pointer flex flex-wrap gap-2"
                  onClick={() => setIsSelectOpen(true)}
                >
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service) => (
                      <div
                        key={service}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        <span>{service}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeService(service);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">
                      Click to select additional services
                    </span>
                  )}
                </div>

                {isSelectOpen && (
                  <div className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10">
                    <select
                      size={6}
                      className="w-full p-2"
                      onChange={handleServiceChange}
                      onBlur={() => setIsSelectOpen(false)}
                    >
                      <option value="">Select Additional Services</option>
                      <option value="Express Delivery">Express Delivery</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Package Tracking">Package Tracking</option>
                      <option value="Warehousing">Warehousing</option>
                      <option value="Custom Clearance">Custom Clearance</option>
                      <option value="Fragile Handling">Fragile Handling</option>
                    </select>
                  </div>
                )}
              </div>

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
              {notification.message && (
                <div className={`p-4 rounded-md ${notification.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-400'
                  : 'bg-red-100 text-red-700 border border-red-400'
                  }`}>
                  {notification.message}
                </div>
              )}
              {qrCode && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={qrCode}
                    alt="Payment QR Code"
                    className="w-64 h-64" // Adjust size as needed
                  />
                </div>
              )}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Order;
