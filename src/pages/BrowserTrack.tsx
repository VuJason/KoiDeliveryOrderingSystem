import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailsModal from "../ProductDetailsModal";
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";

function BrowserTrack() {
  const [searchInput, setSearchInput] = useState("");  // Changed from orderNumber
  const [orderNumber, setOrderNumber] = useState("");  
  const [filterPrice, setFilterPrice] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);

  const [deliveries, setDeliveries] = useState([
    { id: "00001", client: "Christine Books", address: "Phường Bến Nghé, Quận 1, TP.HCM", price: "100.000", type: "Foodstuff", status: "Pending" },
    { id: "00002", client: "Emma Watson", address: "Nguyễn Thái Bình, Quận 1, TP.HCM", price: "200.000", type: "Electronics", status: "Pending" },
    { id: "00003", client: "John Doe", address: "Lê Lai, Quận 1, TP.HCM", price: "150.000", type: "Clothing", status: "Pending" },
    { id: "00004", client: "Alice Smith", address: "Trần Hưng Đạo, Quận 1, TP.HCM", price: "80.000", type: "Home Appliances", status: "Pending" },
    { id: "00005", client: "Michael Brown", address: "Nguyễn Huệ, Quận 1, TP.HCM", price: "300.000", type: "Books", status: "Pending" },
    { id: "00006", client: "Sophia Johnson", address: "Lê Văn Sỹ, Quận 3, TP.HCM", price: "250.000", type: "Beauty Products", status: "Pending" },
    { id: "00007", client: "Lucas Martin", address: "Ngô Đức Kế, Quận 1, TP.HCM", price: "175.000", type: "Toys", status: "Pending" },
    { id: "00008", client: "Olivia Taylor", address: "Cầu Ông Lãnh, Quận 1, TP.HCM", price: "90.000", type: "Grocery", status: "Pending" },
    { id: "00009", client: "James Anderson", address: "Tôn Thất Tùng, Quận 1, TP.HCM", price: "220.000", type: "Gardening Tools", status: "Pending" },
    { id: "00010", client: "James Anderson", address: "Nguyễn Xiển, Quận 9, TP.HCM", price: "300.000", type: "Gardening Tools", status: "Pending" }
  ]);

    const pageSize = 5;

    const parsePrice = (price: string) => {
    return parseInt(price.replace(/\./g, ""), 10); 
  };
 // Tính toán dữ liệu cho trang hiện tại
  const getFilteredData = () => {
    let filteredDeliveries = deliveries.filter((delivery) => {
      return (
        (orderNumber === "" || delivery.id.includes(orderNumber)) && 
        (filterType === "" || delivery.type.toLowerCase().includes(filterType.toLowerCase())) &&
        (filterStatus === "" || delivery.status.toLowerCase() === filterStatus.toLowerCase())
      );
    });

    // Thêm logic sắp xếp theo giá
    if (filterPrice === "low") {
    filteredDeliveries.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (filterPrice === "high") {
    filteredDeliveries.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  return filteredDeliveries;
  };

  // Lấy dữ liệu đã được lọc
  const filteredData = getFilteredData();
  
  // Tính toán dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
  const dataToUse = searchResults.length > 0 ? searchResults : filteredData;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return dataToUse.slice(startIndex, endIndex);
};

  // Xử lý khi thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setSearchError("Tracking number required");
      return;
    }
    setSearchError("");
    setOrderNumber(searchInput);  // Update orderNumber with searchInput

    // Save search results
    const results = deliveries.filter(delivery => delivery.id.includes(searchInput));
    setSearchResults(results);
  };

  


  const resetFilters = () => {
    setSearchInput("");  // Reset search input
    setOrderNumber("");
    setFilterPrice("");
    setFilterType("");
    setFilterStatus("");
    setSearchError("");
    setSearchResults([]); // Reset search results
  };




  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500 bg-green-100";
      case "rejected":
        return "text-red-500 bg-red-100";
      case "pending":
        return "text-yellow-500 bg-yellow-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  function handleViewDetails(id: string): void {
     setSelectedDeliveryId(id);
  setIsModalOpen(true);

  document.body.style.overflow = 'hidden';
  }

  function handleCloseModal(): void {
  setIsModalOpen(false);
  setSelectedDeliveryId(null);

  document.body.style.overflow ='unset'
}
function updateDeliveryStatus(id: string, newStatus: string): void {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  }

  return (
    <div className="w-screen overflow-x-hidden bg-light-blue">
      <Header currentPage={undefined} />
      <section className="w-screen h-screen bg-blue-200 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('./track-bg.png')" }}></div>
        <div className="relative z-10 flex items-start justify-start pl-16 h-full">
          <div className="max-w-lg">
            <h1 className="mt-60 text-4xl font-bold text-gray-800 text-left">Delieries Availible</h1>
            <p className="mt-30 text-lg text-gray-600 text-left">
              Manage and confirm or reject delivery orders. You can view the list of all pending deliveries and update their status.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mt-10 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Enter order number"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${searchError ? "border-red-500" : "border-gray-300"}`}
              value={searchInput}  // Use searchInput here
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchError("");
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
            Locate
          </button>
        </div>
      </div>

      <section className="mt-12 px-6 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Deliveries</h2>
        <div className="flex justify-start items-center mb-6 space-x-4">
          <button className="flex items-center text-gray-600 font-medium">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter By
          </button>
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
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Delivery Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
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

        {/* Bảng quản lý đơn hàng */}
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
              {getCurrentPageData().map((delivery) => (
                <tr key={delivery.id} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-700">{delivery.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{delivery.client}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{delivery.address}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{delivery.price}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{delivery.type}</td>
                  <td className={`py-3 px-4 text-sm font-semibold rounded-full ${getStatusColor(delivery.status)} inline-block`}>
                    {delivery.status}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleViewDetails(delivery.id)}
                    >
                   Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  <div className="mt-4">
          <DeliveryPagination
          current={currentPage}
          onChange={handlePageChange}
          total={searchResults.length > 0 ? searchResults.length : filteredData.length}
          pageSize={pageSize}
         />
        </div>
      </section>

      <Footer />
      {isModalOpen &&  (
        <div className="modal-overlay">
          <div className="modal-content">
  <ProductDetailsModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    deliveryId={selectedDeliveryId}
    updateStatus={updateDeliveryStatus}
  />
  </div>
  </div>
)}
    </div>
  );
}

export default BrowserTrack;