import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      try {
      setUser(JSON.parse(storedUser));
    } catch (error){
      console.error("Error parsing user data:", error);
  }
}
  },  []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsMenuOpen(false);
  };
  const renderAuthSection = () => {
    if (user) {
      return (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User menu"
          >
            <span className="text-sm font-medium">{user.username}</span>
            <RiArrowDropDownLine className="text-2xl" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <Link
                to="/change-password"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 text-blue-600 hover:text-blue-700 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Signup
        </Link>
      </div>
    );
  };
  return (
    <header className="bg-white  text-black p-5 px-28 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-36">
           <div className="flex items-center justify-between w-full">
      <div className="flex-shrink-0">
        <img src="/koilogo.png" alt="Icon Background" width="60" height="29" />
      </div>
          </div>
          <nav className="">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="About"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Destinations"
                >
                  Track
                </Link>
              </li>
              <li>
                <a
                  href="/account"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Destinations"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Destinations"
                >
                  Support
                </a>
              </li>
            </ul>
          </nav>
        </div>
   <div className="flex items-center space-x-10">
          <Link
            to="/order"
            className="flex gap-2 items-center  transition-all transform hover:scale-105"

          >
            <p>Make a delivery</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
        d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0ZM6.75 11.25C6.55109 11.25 6.36032 11.329 6.21967 11.4697C6.07902 11.6103 6 11.8011 6 12C6 12.1989 6.07902 12.3897 6.21967 12.5303C6.36032 12.671 6.55109 12.75 6.75 12.75H15.4395L12.219 15.969C12.1493 16.0387 12.094 16.1215 12.0562 16.2126C12.0185 16.3037 11.9991 16.4014 11.9991 16.5C11.9991 16.5986 12.0185 16.6963 12.0562 16.7874C12.094 16.8785 12.1493 16.9613 12.219 17.031C12.2887 17.1007 12.3715 17.156 12.4626 17.1938C12.5537 17.2315 12.6514 17.2509 12.75 17.2509C12.8486 17.2509 12.9463 17.2315 13.0374 17.1938C13.1285 17.156 13.2113 17.1007 13.281 17.031L17.781 12.531C17.8508 12.4613 17.9063 12.3786 17.9441 12.2874C17.9819 12.1963 18.0013 12.0987 18.0013 12C18.0013 11.9013 17.9819 11.8037 17.9441 11.7125C17.9063 11.6214 17.8508 11.5387 17.781 11.469L13.281 6.969C13.2113 6.89927 13.1285 6.84395 13.0374 6.80621C12.9463 6.76848 12.8486 6.74905 12.75 6.74905C12.6514 6.74905 12.5537 6.76848 12.4626 6.80621C12.3715 6.84395 12.2887 6.89927 12.219 6.969C12.1493 7.03873 12.094 7.12152 12.0562 7.21262C12.0185 7.30373 11.9991 7.40138 11.9991 7.5C11.9991 7.59862 12.0185 7.69627 12.0562 7.78738C12.094 7.87848 12.1493 7.96127 12.219 8.031L15.4395 11.25H6.75Z"
        fill="#00D1FF"
      />
            </svg>
          </Link>

        {renderAuthSection()}
        </div>
      </div>
    </header>
  );
};

export default Header;