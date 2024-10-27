import React, { useState } from 'react';
import { FaStar, FaCaretDown, FaFacebookF, FaEnvelope, FaPrint, FaHeart, FaPinterest } from 'react-icons/fa';

const ProductDetailsModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-4/5 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex">
            <div className="w-1/2 flex flex-col items-center">
              <img src={product.image || "https://placehold.co/600x800"} alt={product.name} className="w-full" />
              <img src={product.thumbnail || "https://placehold.co/100x100"} alt={`Thumbnail of ${product.name}`} className="mt-4" />
            </div>
            <div className="w-1/2 pl-8 text-left">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-gray-500">SKU: {product.id}</p>
              <p className="text-2xl font-bold mt-4">${product.price}</p>
              <div className="mt-4">
                <p><span className="font-bold">Variety:</span> {product.variety}</p>
                <p><span className="font-bold">Fin Type:</span> {product.finType}</p>
                <p><span className="font-bold">Size:</span> {product.size}</p>
                <p><span className="font-bold">Color:</span> {product.color}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="ml-2 text-gray-500">(No reviews yet)</p>
                  <a href="#" className="ml-2 text-blue-500">Write a Review</a>
                </div>
              </div>
              <div className="mt-4">
                <p><span className="font-bold">Maximum Purchase:</span> 1 unit</p>
              </div>
              <div className="mt-4">
                <p className="font-bold">QUANTITY:</p>
                <div className="flex items-center mt-2">
                  <button className="border px-2 py-1" onClick={handleDecrease}>-</button>
                  <input
                    type="text"
                    value={quantity}
                    className="border text-center w-12 mx-2"
                    readOnly
                  />
                  <button className="border px-2 py-1" onClick={handleIncrease}>+</button>
                </div>
              </div>
              <div className="mt-4 flex">
                <button className="bg-black text-white px-4 py-2 mr-2">ADD TO CART</button>
                <button className="border px-4 py-2">ADD TO WISH LIST <FaCaretDown /></button>
              </div>
              <div className="mt-4 flex space-x-4">
                <FaFacebookF />
                <FaEnvelope />
                <FaPrint />
                <FaHeart />
                <FaPinterest />
              </div>
            </div>
          </div>
        </div>
        <button className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;