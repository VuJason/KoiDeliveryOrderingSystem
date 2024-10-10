import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faArrowRightFromBracket,
  faTachometerAlt,
  faUsers,
  faEnvelope,
  faTruck,
  faIdCard,
  faCog,
  faUser,
  faBox,
  faDollarSign,
  faClock,
  faBars,
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Các state cho trường tìm kiếm
  const [customerSearch, setCustomerSearch] = useState("");
  const [orderNumberSearch, setOrderNumberSearch] = useState("");
  const [startDateSearch, setStartDateSearch] = useState("");
  const [endDateSearch, setEndDateSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Số lượng hàng trên mỗi trang

  const [data, setData] = useState([  
    { orderNumber: "00001", date: "01/10/2024", customer: "Christine Books", time: "6:00 am", amount: "100.000", destination: "Phường Bến Nghé, Quận 1, TP.HCM" },
    { orderNumber: "00002", date: "02/10/2024", customer: "Emma Witton", time: "7:00 am", amount: "200.000", destination: "Nguyễn Thái Bình, Quận 1, TP.HCM" },
    { orderNumber: "00003", date: "03/10/2024", customer: "John Doe", time: "9:00 am", amount: "150.000", destination: "Lê Lai, Quận 1, TP.HCM" },
    { orderNumber: "00004", date: "04/10/2024", customer: "Alice Smith", time: "9:00 am", amount: "80.000", destination: "Trần Hưng Đạo, Quận 1, TP.HCM" },
    { orderNumber: "00005", date: "05/10/2024", customer: "Michael Brown", time: "10:00 am", amount: "300.000", destination: "Nguyễn Huệ, Quận 1, TP.HCM" },
    { orderNumber: "00006", date: "06/10/2024", customer: "Sophia Johnson", time: "11:00 am", amount: "250.000", destination: "Lê Văn Sỹ, Quận 3, TP.HCM" },
    { orderNumber: "00007", date: "07/10/2024", customer: "Lucas Martin", time: "12:00 am", amount: "175.000", destination: "Ngô Đức Kế, Quận 1, TP.HCM" },
    { orderNumber: "00008", date: "08/10/2024", customer: "Olivia Taylor", time: "13:00 pm", amount: "90.000", destination: "Cầu Ông Lãnh, Quận 1, TP.HCM" },
    { orderNumber: "00009", date: "09/10/2024", customer: "James Anderson", time: "14:00 pm", amount: "220.000", destination: "Tôn Thất Tùng, Quận 1, TP.HCM" },
    { orderNumber: "00010", date: "10/10/2024", customer: "James Anderson", time: "15:00 pm", amount: "300.000", destination: "Nguyễn Xiển, Quận 9, TP.HCM" },
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Hàm chuyển đổi ngày từ DD/MM/YYYY sang YYYY-MM-DD để so sánh chính xác
  const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`; // Định dạng YYYY-MM-DD
  };

  // Hàm lọc dữ liệu dựa trên các trường tìm kiếm
  const filteredData = data.filter((item) => {
    const isCustomerMatch = customerSearch === "" || item.customer.toLowerCase().includes(customerSearch.toLowerCase());
    const isOrderNumberMatch = orderNumberSearch === "" || item.orderNumber.includes(orderNumberSearch);
    const itemDate = new Date(convertDate(item.date));
    const isStartDateMatch = startDateSearch === "" || itemDate >= new Date(startDateSearch);
    const isEndDateMatch = endDateSearch === "" || itemDate <= new Date(endDateSearch);
    return isCustomerMatch && isOrderNumberMatch && isStartDateMatch && isEndDateMatch;
  });

  // Tính toán chỉ số hàng và phân trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex flex-1">
        <aside className="w-60 bg-white flex flex-col px-6 py-8 shadow-md">
          <div className="text-2xl font-bold text-indigo-600 mb-8">BYKE</div>
          <nav className="flex-1">
            <ul className="space-y-6">
              <li className="flex items-center text-indigo-600 font-semibold">
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                Dashboard
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faUsers} className="mr-3" />
                Users
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                Messages
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faTruck} className="mr-3" />
                Delivery
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faIdCard} className="mr-3" />
                Verify Identity
              </li>
            </ul>
          </nav>
          <div>
            <ul className="space-y-6">
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                Settings
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-3" />
                Log Out
              </li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 p-8 ml-6">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-700" />
            </div>
            <div className="relative w-2/3 mx-8">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="px-10 py-2 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FontAwesomeIcon icon={faBell} className="text-gray-500 text-xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                    <img src="/public/avt koi.png" alt="User Avatar" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-gray-500">Staff</p>
                  </div>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log Out</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Dashboard Cards */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Users</p>
                <h3 className="text-3xl font-bold">40,689</h3>
                <p className="text-green-500">+8.5% from yesterday</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
                <FontAwesomeIcon icon={faBox} className="text-yellow-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Orders</p>
                <h3 className="text-3xl font-bold">10,293</h3>
                <p className="text-green-500">+1.3% from last week</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                <FontAwesomeIcon icon={faDollarSign} className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Payments</p>
                <h3 className="text-3xl font-bold">$89,000</h3>
                <p className="text-red-500">-4.3% from yesterday</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full">
                <FontAwesomeIcon icon={faClock} className="text-pink-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Pending</p>
                <h3 className="text-3xl font-bold">2,040</h3>
                <p className="text-green-500">+1.8% from yesterday</p>
              </div>
            </div>
          </section>

          {/* Sales Details */}
          <section className="bg-white p-6 rounded-md shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Sales Details</h2>
            <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Chart goes here</span>
            </div>
          </section>
          {/* Delivery Information */}
          <section className="bg-white p-6 rounded-md shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-gray-600 mb-2">Customer</label>
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Enter Customer Name"
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Order number</label>
                <input
                  type="text"
                  value={orderNumberSearch}
                  onChange={(e) => setOrderNumberSearch(e.target.value)}
                  placeholder="Enter order number"
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDateSearch}
                  onChange={(e) => setStartDateSearch(e.target.value)}
                  placeholder="Start Date"
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDateSearch}
                  onChange={(e) => setEndDateSearch(e.target.value)}
                  placeholder="End Date"
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Delivery Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Order Number</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Date</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Customer</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Time</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Amount</th>
                    <th className="py-2 px-4 text-left font-medium text-gray-600">Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((item) => (
                    <tr key={item.orderNumber} className="border-b">
                      <td className="py-3 px-4 text-blue-500">{item.orderNumber}</td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.customer}</td>
                      <td className="py-3 px-4">{item.time}</td>
                      <td className="py-3 px-4">{item.amount}</td>
                      <td className="py-3 px-4">{item.destination}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
</section>
{/* Pagination Controls - moved outside the Delivery Information section */}
<div className="flex justify-between items-center mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    Previous
  </button>
  <span className="text-gray-600">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    Next
  </button>
</div>
        </main>
      </div>
    

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;