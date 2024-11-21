import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import ShowMap from "../components/ShowMap";
const FISH_HEALTH_STATUS = {
  EXCELLENT: "excellent",
  GOOD: "good",
  FAIR: "fair",
  POOR: "poor",
} as const;

const Order = () => {
  const getRouteRef = useRef(null);
  const [distance, setDistance] = useState("");

  const [fishDetails, setFishDetails] = useState({
    name: "",
    fish_weight: 0,
    status: FISH_HEALTH_STATUS.GOOD,
  });
  const [fishImages, setFishImages] = useState<File[]>([]);
  const [availableServices, setAvailableServices] = useState([]);

  const [orderDetails, setOrderDetails] = useState({
    quantity: 0,
    original_location: "",
    destination: "",
    transport_method: "",
    additional_services: "",
    order_date: new Date().toISOString(),
  });
  const [orderResponse, setOrderResponse] = useState({
    id: null,
    quantity: 0,
    fish_weight: 0,
    original_location: "",
    destination: "",
    transport_method: "",
    totalCost: 0,
    status: "",
  });
  const [isFishSubmitted, setIsFishSubmitted] = useState(true);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "", // 'success' hoặc 'error'
  });

  const [orderId, setOrderId] = useState<number>();

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://103.67.197.66:8080/api/staff/services/viewService",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAvailableServices(
        data.filter((service) => service.status === "active")
      );
    };
    fetchServices();
  }, []);
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
  const handleDistanceChange = (value: string) => {
    setDistance(value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFishImages((prev) => [...prev, ...filesArray]);
    }
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
    console.log(name);
    if (name === "quantity" || name === "fish_weight") {
      console.log(value);
      if (value === "") {
        setOrderDetails((prev) => ({
          ...prev,
          [name]: null,
        }));
        return;
      }
      const numValue = Number(value);
      console.log(numValue);
      const finalValue = numValue < 0 ? 1 : numValue;
      console.log(finalValue);

      setOrderDetails((prev) => ({
        ...prev,
        [name]: finalValue,
      }));
      return;
    }
    setOrderDetails((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "fish_weight" ? Number(value) : value,
    }));
  };
  const handleOriginChange = (value: string) => {
    setOrderDetails((prev) => ({
      ...prev,
      original_location: value,
    }));
  };

  const handleDestinationChange = (value: string) => {
    setOrderDetails((prev) => ({
      ...prev,
      destination: value,
    }));
  };
  const handleFishSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", fishDetails.name);
      formData.append("status", fishDetails.status);
      formData.append("fish_weight", fishDetails.fish_weight.toString());
      fishImages.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await fetch("http://103.67.197.66:8080/api/koifish", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit fish details");
      }
      // const orderId = data.id;
      const paymentResponse = await fetch(
        `http://103.67.197.66:8080/api/payment/generate-qrcode/${orderId}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = await paymentResponse.text();
      console.log("Payment QR code:", paymentData);
      window.open(paymentData, "_blank");

      if (response.ok) {
        setOrderId(undefined);
        setIsFishSubmitted(true);
        setNotification({
          message: "",
          type: "",
        });
      }
    } catch (error) {
      setNotification({
        message: "Failed to submit fish details",
        type: "error",
      });
    }
  };

  const handlePlaceOrder = async () => {
    setNotification({
      message: "",
      type: "",
    });
    if (
      !orderDetails.quantity ||
      !orderDetails.original_location ||
      !orderDetails.destination ||
      !orderDetails.transport_method
    ) {
      setNotification({
        message: "Vui lòng điền đầy đủ thông tin đơn hàng",
        type: "error",
      });
      return;
    }

    try {
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: orderDetails.original_location,
          destination: orderDetails.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            newDirectionsRenderer.setDirections(result);
            const routeDistance = result.routes[0].legs[0].distance.text;
            setDistance(routeDistance);
          } else {
            alert("No route found or error in fetching route.");
          }
        }
      );

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
      setOrderResponse(data);
      setOrderId(data.id);

      if (response.ok) {
        setIsFishSubmitted(false);
      }
    } catch (error) {
      setNotification({
        message: "Đã có lỗi xảy ra khi đặt hàng",
        type: "error",
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
          <div className="container mx-auto p-4 flex justify-center items-start min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-2xl space-y-4">
              <p>
                <span className="font-semibold">Original Location:</span>{" "}
                {orderResponse.original_location}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {orderResponse.destination}
              </p>
              <p>
                <span className="font-semibold">Distance:</span> {distance}
              </p>
              <p>
                <span className="font-semibold">Transport Method:</span>{" "}
                {orderResponse.transport_method}
              </p>

              <p>
                <span className="font-semibold">Total Cost:</span>
                {orderResponse.totalCost.toLocaleString("vi-VN")} VNĐ
              </p>
              <ShowMap
                origin={orderResponse.original_location}
                destination={orderResponse.destination}
              />
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) =>
                  setFishDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 border rounded mb-4"
              />

              <input
                type="number"
                value={fishDetails.fish_weight}
                placeholder="Fish Weight"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setFishDetails((prev) => ({
                      ...prev,
                      fish_weight: null,
                    }));
                  } else {
                    const numValue = Number(e.target.value);
                    const finalValue = numValue < 0 ? 1 : numValue;

                    setFishDetails((prev) => ({
                      ...prev,
                      fish_weight: finalValue,
                    }));
                  }
                }}
                className="w-full p-2 border rounded mb-4"
              />
              <select
                value={fishDetails.health_status}
                onChange={(e) =>
                  setFishDetails((prev) => ({
                    ...prev,
                    health_status: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mb-4"
              >
                <option value={FISH_HEALTH_STATUS.EXCELLENT}>
                  Excellent Health
                </option>
                <option value={FISH_HEALTH_STATUS.GOOD}>Good Health</option>
                <option value={FISH_HEALTH_STATUS.FAIR}>Fair Health</option>
                <option value={FISH_HEALTH_STATUS.POOR}>Poor Health</option>
              </select>
              <input
                type="file"
                accept="image/*"
                multiple // Add this attribute
                onChange={handleImageChange}
                className="w-full p-2 border rounded mb-4"
              />
              {/* Preview multiple images */}
              <div className="flex flex-wrap gap-4">
                {fishImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Fish preview ${index + 1}`}
                      className="w-40 h-40 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        setFishImages(fishImages.filter((_, i) => i !== index));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {notification.message && (
                <div
                  className={`p-4 rounded-md ${
                    notification.type === "success"
                      ? "bg-green-100 text-green-700 border border-green-400"
                      : "bg-red-100 text-red-700 border border-red-400"
                  }`}
                >
                  {notification.message}
                </div>
              )}
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
                value={orderDetails.quantity}
                placeholder="Enter quantity"
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />

              {/* <input
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
              /> */}

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
                      {availableServices.map((service) => (
                        <option
                          key={service.serviceId}
                          value={service.serviceName}
                        >
                          {service.serviceName} - ${service.price}
                        </option>
                      ))}
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

              <MapComponent
                onOriginChange={handleOriginChange}
                onDestinationChange={handleDestinationChange}
                onDistanceChange={handleDistanceChange}
                getRouteRef={getRouteRef}
              />
              {notification.message && (
                <div
                  className={`p-4 rounded-md ${
                    notification.type === "success"
                      ? "bg-green-100 text-green-700 border border-green-400"
                      : "bg-red-100 text-red-700 border border-red-400"
                  }`}
                >
                  {notification.message}
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
