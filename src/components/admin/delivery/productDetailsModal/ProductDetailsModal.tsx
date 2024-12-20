import React, { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ORDER_STATUS, STATUS_COLORS } from '../../../../constants/orderStatus';
import { OrderStatus } from '../../../../types/order';
import ShowMap from '../../../ShowMap';

interface ProductDetail {
  id: number;
  name: string;
  price: string;
  image: string;
  thumbnail: string;
  variety: string;
  finType: string;
  size: string;
  color: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  status: string;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryId: number | null;
  updateStatus: (id: number, newStatus: OrderStatus) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  deliveryId,
  updateStatus
}) => {
  if (!isOpen || !deliveryId) return null;

  const [productDetails, setProductDetails] = useState<ProductDetail>({
    id: deliveryId,
    name: "Koi Fish Premium",
    price: "1,200.00",
    image: "/koikoi.png",
    thumbnail: "/koikoikoi.png",
    variety: "Japanese Koi",
    finType: "Standard",
    size: "Large (25-30cm)",
    color: "Red & White",
    description: "Premium quality Japanese Koi fish with exceptional patterns and coloring.",
    stock: 5,
    rating: 4.5,
    reviews: 12,
    status: "Pending"
  });

  const [activeImage, setActiveImage] = useState(productDetails.image);
  const [selectedTab, setSelectedTab] = useState('description');

  const handleConfirm = () => {
    if (window.confirm('Are you sure you want to confirm this order?')) {
      const newStatus = 'Confirmed';
      updateStatus(deliveryId, newStatus);
      setProductDetails(prev => ({
        ...prev,
        status: newStatus
      }));
      toast.success('Order has been confirmed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this order?')) {
      try {
        await updateStatus(deliveryId, ORDER_STATUS.REJECTED);
        setProductDetails(prev => ({
          ...prev,
          status: ORDER_STATUS.REJECTED
        }));
        toast.error('Order has been rejected.');
      } catch (err) {
        toast.error('Failed to reject order');
      }
    }
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status] || 'text-gray-500 bg-gray-100';
  };

  // Kiểm tra xem đơn hàng đã được xử lý chưa
  const isOrderProcessed = productDetails.status !== ORDER_STATUS.PENDING;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <ToastContainer />
        <div className="relative p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Delivery Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={activeImage}
                  alt={productDetails.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[productDetails.image, productDetails.thumbnail].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`border-2 rounded-md overflow-hidden ${activeImage === img ? 'border-blue-500' : 'border-gray-200'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{productDetails.name}</h1>
                <p className="text-gray-500 mt-1">Order ID: {productDetails.id}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(productDetails.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({productDetails.reviews} reviews)</span>
              </div>

              <div className="text-3xl font-bold text-gray-900">${productDetails.price}</div>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`font-bold ${getStatusColor(productDetails.status)}`}>
                    {productDetails.status}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Variety:</span> {productDetails.variety}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Size:</span> {productDetails.size}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Color:</span> {productDetails.color}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Assign Delivery Dtaff
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a delivery staff</option>
                  <option value="1">John</option>
                  <option value="2">Sarah</option>
                  <option value="3">Mike</option>
                </select>
              </div>
              {/* Action Buttons - Chỉ hiển thị nếu đơn hàng chưa được xử lý */}

              <div className="flex space-x-4">
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Order
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Order
                </button>
              </div>

            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <ul className="flex space-x-4">
              <li
                className={`${selectedTab === 'description' ? 'bg-gray-100' : 'bg-white'
                  } py-2 px-4 rounded-lg cursor-pointer`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </li>
              <li
                className={`${selectedTab === 'reviews' ? 'bg-gray-100' : 'bg-white'
                  } py-2 px-4 rounded-lg cursor-pointer`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reviews
              </li>
            </ul>
            <div className="mt-4">
              {selectedTab === 'description' ? (
                <p>{productDetails.description}</p>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <ShowMap
              origin="227 Nguyễn Văn Cừ, Quận 5, TP.HCM"
              destination="Đại học Bách Khoa, Quận 10, TP.HCM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;