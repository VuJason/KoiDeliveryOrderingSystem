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
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col px-6 py-8 shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600 mb-8">BYKE</div>

        {/* Navigation Items */}
        <nav className="flex-1">
          <ul className="space-y-6">
            {/* Dashboard */}
            <li className="flex items-center text-indigo-600 font-semibold">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Dashboard
            </li>
            {/* Users */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Users
            </li>
            {/* Messages */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              Messages
            </li>
            {/* Delivery */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faTruck} className="mr-3" />
              Delivery
            </li>
            {/* Verify Identity */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faIdCard} className="mr-3" />
              Verify Identity
            </li>
          </ul>
        </nav>

        {/* Settings and Log Out */}
        <div>
          <ul className="space-y-6">
            {/* Settings */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faCog} className="mr-3" />
              Settings
            </li>
            {/* Log Out */}
            <li className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-3" />
              Log Out
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              className="px-4 py-2 w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faBell} className="text-gray-500" />
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
              <img src="/public/avt koi.png" alt="User Avatar" />
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
            {/* Placeholder for the chart */}
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
                placeholder="Enter Customer Name"
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Order number</label>
              <input
                type="text"
                placeholder="Enter order number"
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Start Date</label>
              <input
                type="date"
                placeholder="Start Date"
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">End Date</label>
              <input
                type="date"
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
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00001</td>
                  <td className="py-3 px-4">01/10/2024</td>
                  <td className="py-3 px-4">Christine Books</td>
                  <td className="py-3 px-4">6:00 am</td>
                  <td className="py-3 px-4">100.000</td>
                  <td className="py-3 px-4">Phường Bến Nghé, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00002</td>
                  <td className="py-3 px-4">02/10/2024</td>
                  <td className="py-3 px-4">Emma Watson</td>
                  <td className="py-3 px-4">8:00 am</td>
                  <td className="py-3 px-4">200.000</td>
                  <td className="py-3 px-4">Nguyễn Thái Bình, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00003</td>
                  <td className="py-3 px-4">03/10/2024</td>
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">9:00 am</td>
                  <td className="py-3 px-4">150.000</td>
                  <td className="py-3 px-4">Lê Lai, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00004</td>
                  <td className="py-3 px-4">04/10/2024</td>
                  <td className="py-3 px-4">Alice Smith</td>
                  <td className="py-3 px-4">9:00 am</td>
                  <td className="py-3 px-4">80.000</td>
                  <td className="py-3 px-4">Trần Hưng Đạo, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00005</td>
                  <td className="py-3 px-4">05/10/2024</td>
                  <td className="py-3 px-4">Michael Brown</td>
                  <td className="py-3 px-4">10:00 am</td>
                  <td className="py-3 px-4">300.000</td>
                  <td className="py-3 px-4">Nguyễn Huệ, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00006</td>
                  <td className="py-3 px-4">06/10/2024</td>
                  <td className="py-3 px-4">Sophia Johnson</td>
                  <td className="py-3 px-4">11:00 am</td>
                  <td className="py-3 px-4">250.000</td>
                  <td className="py-3 px-4">Lê Văn Sỹ, Quận 3, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00007</td>
                  <td className="py-3 px-4">07/10/2024</td>
                  <td className="py-3 px-4">Lucas Martin</td>
                  <td className="py-3 px-4">12:00 am</td>
                  <td className="py-3 px-4">175.000</td>
                  <td className="py-3 px-4">Ngô Đức Kế, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00008</td>
                  <td className="py-3 px-4">08/10/2024</td>
                  <td className="py-3 px-4">Olivia Taylor</td>
                  <td className="py-3 px-4">13:00 pm</td>
                  <td className="py-3 px-4">90.000</td>
                  <td className="py-3 px-4">Cầu Ông Lãnh, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00009</td>
                  <td className="py-3 px-4">09/10/2024</td>
                  <td className="py-3 px-4">James Anderson</td>
                  <td className="py-3 px-4">14:00 pm</td>
                  <td className="py-3 px-4">220.000</td>
                  <td className="py-3 px-4">Tôn Thất Tùng, Quận 1, TP.HCM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-blue-500">00010</td>
                  <td className="py-3 px-4">10/10/2024</td>
                  <td className="py-3 px-4">James Anderson</td>
                  <td className="py-3 px-4">15:00 pm</td>
                  <td className="py-3 px-4">300.000</td>
                  <td className="py-3 px-4">Nguyễn Xiển, Quận 9, TP.HCM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;