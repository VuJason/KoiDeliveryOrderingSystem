import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSyncAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import DeliveryPagination from "../components/admin/delivery/pagination/DeliveryPagination";

function DeliveryPage() {
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  // Sử dụng dữ liệu từ các trang khác
  const deliveries = [
    { id: "00001", rider: "John Doe", address: "Phường Bến Nghé, Quận 1, TP.HCM", date: "2023-05-15", type: "Foodstuff", status: "Confirmed" },
    { id: "00002", rider: "Jane Smith", address: "Nguyễn Thái Bình, Quận 1, TP.HCM", date: "2023-05-16", type: "Electronics", status: "In Transit" },
    { id: "00003", rider: "Bob Johnson", address: "Lê Lai, Quận 1, TP.HCM", date: "2023-05-17", type: "Clothing", status: "Delivered" },
    { id: "00004", rider: "Alice Brown", address: "Trần Hưng Đạo, Quận 1, TP.HCM", date: "2023-05-18", type: "Home Appliances", status: "Canceled" },
    { id: "00005", rider: "Charlie Wilson", address: "Nguyễn Huệ, Quận 1, TP.HCM", date: "2023-05-19", type: "Books", status: "Confirmed" },
  ];

  const pageSize = 5;

  // Tính toán dữ liệu cho trang hiện tại
  const getFilteredData = () => {
    return deliveries.filter((delivery) => {
      return (
        (filterDate === "" || delivery.date.includes(filterDate)) && 
        (filterType === "" || delivery.type.toLowerCase() === filterType.toLowerCase()) &&
        (filterStatus === "" || delivery.status.toLowerCase() === filterStatus.toLowerCase())
      );
    });
  };

  const filteredData = getFilteredData();
  
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setFilterDate("");
    setFilterType("");
    setFilterStatus("");
    setSearchResults([]);
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
    <div className="w-full px-6 py-6 bg-light-blue">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Deliveries</h2>
      <div className="flex justify-start items-center mb-6 space-x-4">
        <button className="flex items-center text-gray-600 font-medium">
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filter By
        </button>
        <div className="relative">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            <option value="home appliances">Home Appliances</option>
            <option value="books">Books</option>
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
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
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

      {/* Delivery Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">RIDER</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">DELIVERY ADDRESS</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">DATE</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">TYPE</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((delivery) => (
              <tr key={delivery.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{delivery.id}</td>
                <td className="py-2 px-4">{delivery.rider}</td>
                <td className="py-2 px-4">{delivery.address}</td>
                <td className="py-2 px-4">{delivery.date}</td>
                <td className="py-2 px-4">{delivery.type}</td>
                <td className={`py-2 px-4 ${getStatusColor(delivery.status)}`}>{delivery.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
          <DeliveryPagination
          current={currentPage}
          onChange={handlePageChange}
          total={searchResults.length > 0 ? searchResults.length : filteredData.length}
          pageSize={pageSize}
         />
        </div>

  );
}

export default DeliveryPage;