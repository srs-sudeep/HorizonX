import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  paymentMethod: string;
}

// Service function to fetch orders data
const fetchOrders = async (): Promise<Order[]> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<Order[]>('/orders');
    
    // For now, return mock data
    return [
      { id: 'ORD-001', customer: 'Alice Johnson', email: 'alice@example.com', date: '2023-11-15', status: 'processing', total: 349.97, items: 3, paymentMethod: 'Credit Card' },
      { id: 'ORD-002', customer: 'Bob Smith', email: 'bob@example.com', date: '2023-11-14', status: 'shipped', total: 129.99, items: 1, paymentMethod: 'PayPal' },
      { id: 'ORD-003', customer: 'Carol Williams', email: 'carol@example.com', date: '2023-11-12', status: 'delivered', total: 567.50, items: 4, paymentMethod: 'Credit Card' },
      { id: 'ORD-004', customer: 'David Brown', email: 'david@example.com', date: '2023-11-10', status: 'pending', total: 89.99, items: 1, paymentMethod: 'Bank Transfer' },
      { id: 'ORD-005', customer: 'Eva Davis', email: 'eva@example.com', date: '2023-11-08', status: 'cancelled', total: 249.98, items: 2, paymentMethod: 'Credit Card' },
    ];
  } catch (error) {
    console.error('Error fetching orders data:', error);
    throw error;
  }
};

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}