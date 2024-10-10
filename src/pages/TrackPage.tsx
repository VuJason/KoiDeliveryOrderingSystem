import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import  Header from "../components/Header";

function TrackPage() {
  const [orderNumber, setOrderNumber] = useState("");  // Biến mới cho tìm kiếm đơn hàng
  const [filterPrice, setFilterPrice] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [searchError, setSearchError] = useState("");

  const handleSearch = () => {
    if (!orderNumber.trim()) { // Kiểm tra ô tìm kiếm
      setSearchError("Tracking number required");
      return;
    }
    setSearchError(""); // Reset lỗi nếu có
    // Logic tìm kiếm ở đây...
  };
   // Chuyển đổi giá từ định dạng chuỗi sang số
  const parsePrice = (price) => {
    return parseInt(price.replace(/\./g, ""),10);// Loại bỏ dấu chấm và chuyển về số
  };


  const deliveries = [
    { id: "00001", client: "Christine Books", address: "Phường Bến Nghé, Quận 1, TP.HCM", price: "100.000", type: "Foodstuff", status: "Confirmed" },
    { id: "00002", client: "Emma Watson", address: "Nguyễn Thái Bình, Quận 1, TP.HCM", price: "200.000", type: "Electronics", status: "Confirmed" },
    { id: "00003", client: "John Doe", address: "Lê Lai, Quận 1, TP.HCM", price: "150.000", type: "Clothing", status: "Rejected" },
    { id: "00004", client: "Alice Smith", address: "Trần Hưng Đạo, Quận 1, TP.HCM", price: "80.000", type: "Home Appliances", status: "Rejected" },
    { id: "00005", client: "Michael Brown", address: "Nguyễn Huệ, Quận 1, TP.HCM", price: "300.000", type: "Books", status: "Confirmed" },
    { id: "00006", client: "Sophia Johnson", address: "Lê Văn Sỹ, Quận 3, TP.HCM", price: "250.000", type: "Beauty Products", status: "Rejected" },
    { id: "00007", client: "Lucas Martin", address: "Ngô Đức Kế, Quận 1, TP.HCM", price: "175.000", type: "Toys", status: "Confirmed" },
    { id: "00008", client: "Olivia Taylor", address: "Cầu Ông Lãnh, Quận 1, TP.HCM", price: "90.000", type: "Grocery", status: "Rejected" },
    { id: "00009", client: "James Anderson", address: "Tôn Thất Tùng, Quận 1, TP.HCM", price: "220.000", type: "Gardening Tools", status: "Confirmed" },
    { id: "00010", client: "James Anderson", address: "Nguyễn Xiển, Quận 9, TP.HCM", price: "300.000", type: "Gardening Tools", status: "Rejected" }
  ];

  const resetFilters = () => {
    setOrderNumber("");  // Reset ô tìm kiếm đơn hàng
    setFilterPrice("");
    setFilterType("");
    setFilterStatus("");
    setSearchError("");
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    return (
      (orderNumber === "" || delivery.id.includes(orderNumber)) &&  // Lọc theo số đơn hàng
      (filterPrice === "" || (filterPrice === "low" ? delivery.price <= 200000 : delivery.price > 200000)) &&
      (filterType === "" || delivery.type.toLowerCase().includes(filterType.toLowerCase())) &&
      (filterStatus === "" || delivery.status.toLowerCase() === filterStatus.toLowerCase())
    );
  });
   // Sắp xếp theo giá nếu có bộ lọc giá
  if (filterPrice === "low") {
    filteredDeliveries.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));  // Sắp xếp từ thấp đến cao
  } else if (filterPrice === "high") {
    filteredDeliveries.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));  // Sắp xếp từ cao đến thấp
  }


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDeliveries.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredDeliveries.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500 bg-green-100"; // Xanh lá cây cho trạng thái "Confirmed"
      case "rejected":
        return "text-red-500 bg-red-100"; // Đỏ cho trạng thái "Rejected"
      default:
        return "text-gray-500 bg-gray-100"; // Mặc định xám cho các trạng thái khác
    }
  };

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Sử dụng Header mới từ components/Header */}
      <Header />
      {/* Hero Section */}
      <section className="w-screen h-screen bg-blue-200 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('./track-bg.png')" }}></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-gray-800 text-left">Deliveries Available</h1>
            <p className="mt-30 text-lg text-gray-600 text-left">
              Enter your order number below to track your delivery. We provide an integrated logistics solution built on Express Parcel, Cross Border, Warehousing, Freight and Software value added services that helps brands deliver faster and provide a superior experience.
            </p>
          </div>
        </div>
      </section>

 {/* Search Section */}
      <div className="relative z-10 mt-10 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Enter order number"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${searchError ? "border-red-500" : "border-gray-300"}`}
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                setSearchError(""); // Reset lỗi khi người dùng nhập liệu
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
            Search
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <section className="mt-12 px-6 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available deliveries</h2>
        <div className="flex justify-start items-center mb-6 space-x-4">
          {/* Bộ lọc */}
            <button className="flex items-center text-gray-600 font-medium">
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              Filter By
            </button>

  {/* Dropdown Price */}
          <div className="relative">
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

            {/* Dropdown Package Type */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Package Type</option>
                <option value="foodstuff">Foodstuff</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home Appliances</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dropdown Delivery Mode */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Delivery Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>

              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
             {/* Nút Reset */}
          <button
            className="text-red-500 flex items-center font-semibold"
            onClick={resetFilters}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
            Reset Filter
          </button>
          </div>


        {/* Delivery Table */}
        <div className="overflow-x-auto">
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
            {currentRows.map((delivery) => (
              <tr key={delivery.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-700">{delivery.id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{delivery.client}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{delivery.address}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{delivery.price}</td>
                <td className="py-3 px-4 text-sm text-blue-600">{delivery.type}</td>
                <td className={`py-3 px-4 text-sm font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                  {delivery.status}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">Cancel</td>
              </tr>
            ))}
          </tbody>

          </table>
        </div>

        {/* Thanh điều hướng trang */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-md ${currentPage === Math.ceil(deliveries.length / rowsPerPage) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {/* Footer */}
            <Footer />

    </div>
  );
}

export default TrackPage;

