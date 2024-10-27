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
    <footer className="bg-[#01003d] text-white">
      <div className="container mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
         <img src="/koilogo.png" alt="Koi Logo" width="60" height="29" />
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