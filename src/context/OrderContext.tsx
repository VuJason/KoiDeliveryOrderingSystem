import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus } from '../types/order';
import { orderApi } from '../services/orderApi';

interface OrderContextType {
  orders: Order[];
  updateOrder: (orderId: string, newStatus: OrderStatus) => Promise<void>;
  refreshOrders: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface OrderProviderProps {
  children: ReactNode;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.getNewOrders();
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderApi.updateOrderStatus(parseInt(orderId), newStatus);
      await refreshOrders();
    } catch (err) {
      setError('Failed to update order');
      console.error('Error updating order:', err);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const value = {
    orders,
    updateOrder,
    refreshOrders,
    isLoading,
    error
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}