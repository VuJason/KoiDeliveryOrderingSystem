export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED' 
  | 'IN_TRANSIT'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'CANCELED'
  | 'REJECTED';

export interface Order {
  id: number;
  orderNumber?: string;
  product: string;
  address: string;
  price: string;
  customer: string;
  client?: string;
  rider?: string;
  status: OrderStatus;
  type?: string;
  date?: string;
  description?: string;
}

export interface OrderResponse {
  data: Order[];
  message: string;
  status: string;
}