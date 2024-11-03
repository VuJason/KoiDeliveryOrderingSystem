import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com'; // Replace with your actual API base URL

export const orderApi = {
  getCustomerOrders: async () => {
    const response = await axios.get(`${API_BASE_URL}/customer-orders`); // Adjust the endpoint as per your swagger.yml
    return response.data;
  },
  getDeliveryHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/delivery-history`); // Adjust the endpoint as per your swagger.yml
    return response.data;
  },
  deleteOrder: async (orderId) => {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`); // Đảm bảo endpoint đúng
    return response.data;
  },
  // Other API methods...
}; 