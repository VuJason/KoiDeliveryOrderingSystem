export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
    case 'delivered':
      return 'text-green-500 bg-green-100';
    case 'delivering':
    case 'in_transit':
      return 'text-yellow-500 bg-yellow-100';
    case 'pending':
      return 'text-blue-500 bg-blue-100';
    case 'canceled':
    case 'rejected':
      return 'text-red-500 bg-red-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
}; 