import React from 'react';
import { FiClock, FiPackage, FiShield, FiStar, FiTruck } from "react-icons/fi";
import Header from "./components/Header";
import TrackOrder from "./components/TrackOrder";
import Footer from "./components/Footer";




const LandingPage:  React.FC = () => {

  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Tech Corp",
      content:
        "This delivery service has revolutionized our logistics. Fast, secure, and reliable!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Logistics Manager, E-commerce Giant",
      content:
        "The real-time tracking feature is a game-changer. Our customers love it!",
      rating: 5,
    },
    {
      name: "Mike Johnson",
      role: "Small Business Owner",
      content:
        "Affordable and efficient. Perfect for small businesses like mine.",
      rating: 4,
    },
  ];
  return (
    <div className="bg-white min-h-screen text-black">
      <Header />

      <main className="w-full py-16">
        <div className="relative w-full px-4 h-[800px]">
          <img
            src="./banner.png"
            alt="Delivery Service Banner"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0  rounded-3xl bg-opacity-50 flex p-20 flex-col justify-center items-start text-center">
            <h1 className="text-4xl text-white text-left md:text-6xl font-bold mb-6 leading-tight">
              Your most affordable and reliable delivery service provider
            </h1>
            <div className="flex gap-10 flex-wrap">
              <button
                className="bg-[#FFFFFF]  text-black font-bold py-3 px-20 rounded-xl transition-all transform hover:scale-105"
                aria-label="Join Us"
              >
                Join Us
              </button>
              <button
                className="bg-[#FDAF3B]  text-white font-bold py-3 px-20 rounded-xl transition-all transform hover:scale-105"
                aria-label="Login"
              >
                Login
              </button>
            </div>

            <div className="mt-8 border-t text-white border-white pt-4 w-full">
              <p className="text-xl md:text-2xl font-semibold text-right">
                Flexibility, Reliability and Scale The Answer is Byke
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 px-4">
          <div className="px-20 space-y-10">
            <div className="px-40">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight text-center">
                Track your order promptly
              </h2>
              <p className="text-center">
                We provide an integrated logistics solution built on Express
                Parcel, Cross Border, Warehousing, Freight and Software value
                added services that helps brands deliver faster and provide a
                superior experience
              </p>
            </div>

            <TrackOrder />
          </div>
        </div>

        <div className="mx-auto px-14 py-16 mt-10 bg-[#01003D] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mb-4">
                What we do
              </button>
              <h2 className="text-3xl font-bold">
                Safe & Reliable Delivery Solutions
              </h2>
            </div>
            <div className="space-y-8">
              <div className="text-center">
                <FiTruck className="text-6xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fast Delivery</h3>
                <p className="">
                  Our state-of-the-art logistics network ensures your packages
                  reach their destination quickly and efficiently.
                </p>
              </div>
              <div className="text-center">
                <FiShield className="text-6xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Secure Transport
                </h3>
                <p className="">
                  We prioritize the safety of your items with advanced security
                  measures throughout the delivery process.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="text-center">
                <FiPackage className="text-6xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Secure Packaging
                </h3>
                <p className="">
                  We use advanced packaging techniques to keep your items safe
                  and secure throughout their journey.
                </p>
              </div>
              <div className="text-center">
                <FiClock className="text-6xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Real-time Tracking
                </h3>
                <p className="">
                  Track your package's journey in real-time with our
                  user-friendly tracking system.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 px-4">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#020066] p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className=" mb-4">"{testimonial.content}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="bg-[#020066] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;