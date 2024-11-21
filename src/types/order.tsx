export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_TRANSIT"
  | "DELIVERING"
  | "DELIVERED"
  | "CANCELED"
  | "REJECTED";

export interface Order {
  orderId: number;
  customerName: string | null;
  status: OrderStatus;
  order_date: string;
  original_location: string;
  destination: string;
  transport_method: string;
  assignedTo: string | null;
  price: number;
}
