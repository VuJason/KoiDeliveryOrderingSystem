import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white  text-black p-5 px-28 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-36">
          <div className="flex items-center">
            <svg
              width="86"
              height="29"
              viewBox="0 0 86 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5942 16.3448C16.3844 17.1883 19.4666 18.2914 19.4666 21.6656C19.4666 27.1163 16.2222 28.0572 10.512 28.0572C9.60352 28.0572 7.29997 28.0247 5.25598 28.0247V27.9923H0V5.28125H9.83063C14.6648 5.28125 18.2662 5.86525 18.2662 10.7319C18.2662 13.1003 16.5466 14.3008 13.5617 15.339C12.5884 15.6634 11.1933 15.4363 10.1551 15.4363V16.3123C10.804 16.3123 11.6151 16.215 12.3937 16.215C12.8155 16.215 13.2373 16.2474 13.5942 16.3448ZM5.25598 13.1652H8.07864C10.9337 13.1652 12.7831 12.9057 12.7831 11.0888C12.7831 9.2719 11.1284 9.23946 8.07864 9.23946H5.25598V13.1652ZM5.25598 24.1314H7.91641C12.1991 24.1314 13.9835 24.2936 13.9835 21.5359C13.9835 18.9079 11.5826 18.7132 7.00797 18.7132C6.65109 18.7132 6.26175 18.7132 5.48309 18.6808H5.25598V24.1314Z"
                fill="#020066"
              />
              <path
                d="M26.7354 5.28125L30.3691 11.2186C31.1154 12.3866 31.1803 14.1061 31.1803 15.5012H32.0563C32.0563 14.1061 32.1211 12.3866 32.8674 11.2186L36.6309 5.28125H42.4709L34.3922 17.2532V27.7652H28.9416V17.2532L20.863 5.28125H26.7354Z"
                fill="#020066"
              />
              <path
                d="M51.7018 11.9323L59.6831 5.28125H66.6911L57.5093 14.0088L67.5995 27.9923H60.8186L53.324 17.091L50.4689 19.4594V27.9923H45.2129V5.28125H50.4689V11.3483C50.4689 12.3217 49.7876 13.3274 49.3982 14.2034L50.2094 14.5603C50.5987 13.7168 50.9556 12.5488 51.7018 11.9323Z"
                fill="#020066"
              />
              <path
                d="M69.3561 27.9923V5.28125H85.8378V10.4075H74.612V13.9439H85.0267V19.0701H74.612V22.8661H86V27.9923H69.3561Z"
                fill="#020066"
              />
              <rect
                x="29.6762"
                width="4.61057"
                height="4.39102"
                rx="0.548878"
                fill="#020066"
              />
              <path
                d="M32.1463 2.35995L30.4266 0.556365C30.2267 0.346746 30.3753 -0.000222227 30.6649 -0.00022224L33.9576 -0.000222384C34.1395 -0.000222392 34.2869 0.147222 34.2869 0.329104L34.2869 3.78631C34.2869 4.08369 33.9239 4.22876 33.719 4.01328L32.1463 2.35995Z"
                fill="#80CCFA"
              />
            </svg>
          </div>

          <nav className="">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="About"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                  aria-label="Destinations"
                >
                  Track
                </a>
              </li>
              <li>
                <a
                  href="#"
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
{currentPage === "delivery-track" ? (
  <Link
    to="/delivery-track"
    className="flex gap-2 items-center transition-all transform hover:scale-105 bg-[#ffffff] text-black px-4 py-2 rounded"
  >
    <p>Delivery History</p>
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
) : (
  <Link
    to="/delivery-track"
    className="flex gap-2 items-center transition-all transform hover:scale-105"
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
)}

          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&q=80"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <RiArrowDropDownLine className="text-2xl" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </a>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;