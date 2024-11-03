export const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  REJECTED: 'Rejected',
  DELIVERED: 'Delivered',
  CANCELED: 'Canceled',
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-200 text-yellow-800',
  [ORDER_STATUS.CONFIRMED]: 'bg-blue-200 text-blue-800',
  [ORDER_STATUS.DELIVERING]: 'bg-purple-200 text-purple-800',
  [ORDER_STATUS.DELIVERED]: 'bg-green-200 text-green-800',
  [ORDER_STATUS.IN_TRANSIT]: 'bg-orange-200 text-orange-800',
  [ORDER_STATUS.CANCELED]: 'bg-red-200 text-red-800',
  [ORDER_STATUS.REJECTED]: 'bg-gray-200 text-gray-800'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS]; 