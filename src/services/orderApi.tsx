import axios from 'axios';
import { Order, OrderResponse, OrderStatus } from '../types/order';

const BASE_URL = 'http://103.67.197.66:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderApi = {
  getNewOrders: async (): Promise<Order[]> => {
    const response = await api.get<OrderResponse>('/api/order/staff/viewOrder');
    return response.data.data;
  },

  getDeliveryOrders: async (): Promise<Order[]> => {
    const response = await api.get<OrderResponse>('/api/order/staff/viewOrder', {
      params: { status: 'DELIVERING' }
    });
    return response.data.data;
  },

  getCustomerOrders: async (): Promise<Order[]> => {
    const response = await api.get<OrderResponse>('/api/order');
    console.log("Customer Orders Response:", response.data); // Log dữ liệu để kiểm tra
    return response.data.data;
  },

  updateOrderStatus: async (orderId: number, status: OrderStatus): Promise<void> => {
    await api.put(`/api/order/staff/${orderId}/status`, null, {
      params: { status }
    });
  },

  getDeliveryTrackOrders: async () => {
    // Implement API call logic here
    return [
      {
        id: '1',
        product: 'Koi Fish A',
        address: '123 Street',
        price: '$100',
        customer: 'John Doe',
        status: 'pending'
      },
      // Add more sample data...
    ];
  },
};