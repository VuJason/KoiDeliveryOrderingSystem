import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function TrackPage() {
  const [filterPrice, setFilterPrice] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const deliveries = [
    { id: "00001", client: "Christine Books", address: "Phường Bến Nghé, Quận 1, TP.HCM", price: "100.000", type: "Foodstuff", status: "Deliveried" },
    { id: "00002", client: "Emma Watson", address: "Nguyễn Thái Bình, Quận 1, TP.HCM", price: "200.000", type: "Electronics", status: "Deliveried" },
    { id: "00003", client: "John Doe", address: "Lê Lai, Quận 1, TP.HCM", price: "150.000", type: "Clothing", status: "Pending" },
    { id: "00004", client: "Alice Smith", address: "Trần Hưng Đạo, Quận 1, TP.HCM", price: "80.000", type: "Home Appliances", status: "Returned" },
    { id: "00005", client: "Michael Brown", address: "Nguyễn Huệ, Quận 1, TP.HCM", price: "300.000", type: "Books", status: "Delivering" },
    { id: "00006", client: "Sophia Johnson", address: "Lê Văn Sỹ, Quận 3, TP.HCM", price: "250.000", type: "Beauty Products", status: "Pending" },
    { id: "00007", client: "Lucas Martin", address: "Ngô Đức Kế, Quận 1, TP.HCM", price: "175.000", type: "Toys", status: "Declined" },
    { id: "00008", client: "Olivia Taylor", address: "Cầu Ông Lãnh, Quận 1, TP.HCM", price: "90.000", type: "Grocery", status: "Cancelled" },
    { id: "00009", client: "James Anderson", address: "Tôn Thất Tùng, Quận 1, TP.HCM", price: "220.000", type: "Gardening Tools", status: "Delivering" },
    { id: "00010", client: "James Anderson", address: "Nguyễn Xiển, Quận 9, TP.HCM", price: "300.000", type: "Gardening Tools", status: "Declined" }
  ];

  const resetFilters = () => {
    setFilterPrice("");
    setFilterType("");
    setFilterStatus("");
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    return (
      (filterPrice === "" || (filterPrice === "low" ? delivery.price <= 200000 : delivery.price > 200000)) &&
      (filterType === "" || delivery.type.toLowerCase().includes(filterType.toLowerCase())) &&
      (filterStatus === "" || delivery.status.toLowerCase() === filterStatus.toLowerCase())
    );
  });

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
      case "deliveried":
        return "text-green-500 bg-green-100"; // Xanh lá cây cho trạng thái "Delivered"
      case "delivering":
        return "text-blue-500 bg-blue-100"; // Xanh dương cho trạng thái "Delivering"
      case "pending":
        return "text-yellow-500 bg-yellow-100"; // Vàng cho trạng thái "Pending"
      case "returned":
      case "returned":
        return "text-orange-500 bg-orange-100"; // Cam cho trạng thái "Returned"
      case "declined":
        return "text-red-500 bg-red-100"; // Đỏ cho trạng thái "Declined"
      case "cancelled":
        return "text-gray-500 bg-gray-100"; // Xám cho trạng thái "Cancelled"
      default:
        return "text-gray-500 bg-gray-100"; // Mặc định xám cho các trạng thái khác
    }
  };

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        {/* Logo */}
        <div className="w-1/3 flex items-center">
          <svg
            width="86"
            height="24"
            viewBox="0 0 86 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-4"
          >
            <path
              d="M13.5942 11.3448C16.3844 12.1883 19.4666 13.2914 19.4666 16.6656C19.4666 22.1163 16.2222 23.0572 10.512 23.0572C9.60352 23.0572 7.29997 23.0247 5.25598 23.0247V22.9923H0V0.28125H9.83063C14.6648 0.28125 18.2662 0.865248 18.2662 5.7319C18.2662 8.10033 16.5466 9.30077 13.5617 10.339C12.5884 10.6634 11.1933 10.4363 10.1551 10.4363V11.3123C10.804 11.3123 11.6151 11.215 12.3937 11.215C12.8155 11.215 13.2373 11.2474 13.5942 11.3448ZM5.25598 8.16522H8.07864C10.9337 8.16522 12.7831 7.90566 12.7831 6.08878C12.7831 4.2719 11.1284 4.23946 8.07864 4.23946H5.25598V8.16522ZM5.25598 19.1314H7.91641C12.1991 19.1314 13.9835 19.2936 13.9835 16.5359C13.9835 13.9079 11.5826 13.7132 7.00797 13.7132C6.65109 13.7132 6.26175 13.7132 5.48309 13.6808H5.25598V19.1314Z"
              fill="#020066"
            />
            <path
              d="M26.7354 0.28125L30.3691 6.21856C31.1154 7.38656 31.1803 9.1061 31.1803 10.5012H32.0563C32.0563 9.1061 32.1211 7.38656 32.8674 6.21856L36.6309 0.28125H42.4709L34.3922 12.2532V22.7652H28.9416V12.2532L20.863 0.28125H26.7354Z"
              fill="#020066"
            />
            <path
              d="M51.7018 6.93233L59.6831 0.28125H66.6911L57.5093 9.00877L67.5995 22.9923H60.8186L53.324 12.091L50.4689 14.4594V22.9923H45.2129V0.28125H50.4689V6.34834C50.4689 7.32167 49.7876 8.32744 49.3982 9.20344L50.2094 9.56032C50.5987 8.71677 50.9556 7.54878 51.7018 6.93233Z"
              fill="#020066"
            />
            <path
              d="M69.3561 22.9923V0.28125H85.8378V5.40745H74.612V8.94388H85.0267V14.0701H74.612V17.8661H86V22.9923H69.3561Z"
              fill="#020066"
            />
          </svg>
        </div>

        {/* Mục menu ở giữa */}
        <nav className="w-1/3 flex justify-center">
          <ul className="flex space-x-8 text-sm font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Deliveries</li>
            <li className="hover:text-blue-600 cursor-pointer">Account</li>
            <li className="hover:text-blue-600 cursor-pointer">Support</li>
          </ul>
        </nav>

{/* Nút Pickup a delivery và Avatar */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          {/* Nút Pick up a delivery */}
          <button className="flex items-center text-black font-semibold space-x-2">
            <span>Pick up a delivery</span>
            <div className="flex justify-center items-center w-8 h-8 bg-blue-500 text-white rounded-full">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </button>

          {/* Avatar */}
          <div className="relative">
            <img
              src="/public/avt koi.png" // Thay thế bằng link ảnh avatar thật của bạn
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-orange-500"
            />
          </div>
        </div>
      </header>
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
        <input
          type="text"
          placeholder="Enter order number"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ml-2">
          Search
        </button>
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
                <option value="delivering">Delivering</option>
                <option value="deliveried">Deliveried</option>
                <option value="pending">Pending</option>
                <option value="returned">Returned</option>
                <option value="declined">Declined</option>
                <option value="cancelled">Cancelled</option>

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
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <div>
            <p className="text-sm">&copy; 2024 BYKE, LLC. All rights reserved.</p>
          </div>
          <div className="flex space-x-12">
            <div>
              <h5 className="text-sm font-semibold uppercase">Company</h5>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm hover:underline">Product</a></li>
                <li><a href="#" className="text-sm hover:underline">Why us?</a></li>
                <li><a href="#" className="text-sm hover:underline">About us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold uppercase">Sevices</h5>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm hover:underline">Product</a></li>
                <li><a href="#" className="text-sm hover:underline">Car delivery</a></li>
                <li><a href="#" className="text-sm hover:underline">Motor Byke delivery</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold uppercase">Legal</h5>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm hover:underline">Terms of use</a></li>
                <li><a href="#" className="text-sm hover:underline">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold uppercase">Support</h5>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm hover:underline">Contact us</a></li>
                <li><a href="#" className="text-sm hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-end">
              <h5 className="text-sm font-semibold uppercase">Get in touch</h5>
              <p className="text-sm">+123 456 789</p>
              <p className="text-sm">hello@byke.com</p>
              <address className="text-sm">
                Office 679, 173 Waha Rd, Uyo, Akwa Ibom State, Nigeria, E2 2JA
              </address>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>Follow us on social media:</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li><a href="#" className="text-sm hover:underline"><FontAwesomeIcon icon={faFacebookF} /></a></li>
            <li><a href="#" className="text-sm hover:underline"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a href="#" className="text-sm hover:underline"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li><a href="#" className="text-sm hover:underline"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default TrackPage;

