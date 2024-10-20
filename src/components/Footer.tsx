import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerColumns = [
    {
      title: "Company",
      links: ["Product", "Why us?", "About us"],
    },
    {
      title: "Services",
      links: ["Skateboard delivery", "Bicycle delivery", "Motor bike delivery"],
    },
    {
      title: "Legal",
      links: ["Terms of use", "Privacy policy"],
    },
    {
      title: "Support",
      links: ["Contact Us", "FAQ"],
    },
  ];

  return (
    <footer className="bg-[#01003D] text-white">
      <div className="container mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <svg
            width="208"
            height="68"
            viewBox="0 0 208 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.8789 39.5317C39.6273 41.5719 47.082 44.2399 47.082 52.4008C47.082 65.5837 39.235 67.8594 25.4243 67.8594C23.2271 67.8594 17.6557 67.7809 12.7121 67.7809V67.7024H0V12.7734H23.7764C35.4684 12.7734 44.1786 14.1859 44.1786 25.9564C44.1786 31.6847 40.0197 34.5881 32.8004 37.0991C30.4464 37.8838 27.0721 37.3345 24.5611 37.3345V39.4532C26.1305 39.4532 28.0923 39.2178 29.9755 39.2178C30.9956 39.2178 32.0158 39.2963 32.8789 39.5317ZM12.7121 31.8416H19.539C26.4444 31.8416 30.9172 31.2139 30.9172 26.8196C30.9172 22.4252 26.9152 22.3468 19.539 22.3468H12.7121V31.8416ZM12.7121 58.3645H19.1467C29.5047 58.3645 33.8206 58.7568 33.8206 52.0869C33.8206 45.7308 28.0138 45.26 16.9495 45.26C16.0863 45.26 15.1447 45.26 13.2614 45.1815H12.7121V58.3645Z"
              fill="white"
            />
            <path
              d="M64.6623 12.7734L73.451 27.1334C75.2558 29.9584 75.4127 34.1173 75.4127 37.4915H77.5314C77.5314 34.1173 77.6883 29.9584 79.4931 27.1334L88.5957 12.7734H102.72L83.1812 41.7289V67.1531H69.9983V41.7289L50.4593 12.7734H64.6623Z"
              fill="white"
            />
            <path
              d="M125.046 28.8598L144.35 12.7734H161.299L139.092 33.8819L163.496 67.7024H147.096L128.97 41.3365L122.064 47.0648V67.7024H109.352V12.7734H122.064V27.4473C122.064 29.8014 120.416 32.234 119.475 34.3527L121.437 35.2159C122.378 33.1756 123.241 30.3507 125.046 28.8598Z"
              fill="white"
            />
            <path
              d="M167.745 67.7024V12.7734H207.608V25.1717H180.457V33.7249H205.646V46.1232H180.457V55.3042H208V67.7024H167.745Z"
              fill="white"
            />
            <rect
              x="71.7751"
              y="0.000976562"
              width="11.1512"
              height="10.6201"
              rx="1.32752"
              fill="white"
            />
            <path
              d="M77.7491 5.70854L73.5898 1.34637C73.1064 0.83939 73.4658 0.000211665 74.1663 0.000211634L82.1299 0.000211286C82.5698 0.000211267 82.9264 0.356822 82.9264 0.796722L82.9264 9.15833C82.9264 9.87758 82.0485 10.2284 81.5528 9.70729L77.7491 5.70854Z"
              fill="#80CCFA"
            />
          </svg>
        </div>

        <div className="my-8 border-t text-white border-white w-full" />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {footerColumns.map((column, index) => (
            <div key={index} className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <a
                      href="#"
                      className="hover:text-blue-400 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mb-8 md:mb-0 col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              +234 819 815 7158 | hello@byke.com
            </h3>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  Nigeria
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  Office 9796
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  182 Nwaiba road
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  Uyo
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  Akwa Ibom State
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  E6 2JA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;