import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
  createdAt: string;
}

// Service function to fetch products data
const fetchProducts = async (): Promise<Product[]> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<Product[]>('/products');
    
    // For now, return mock data
    return [
      { id: '1', name: 'Premium Laptop', description: 'High-performance laptop for professionals', price: 1299.99, category: 'Electronics', stock: 45, image: '/products/laptop.jpg', rating: 4.7, createdAt: '2023-09-15' },
      { id: '2', name: 'Wireless Headphones', description: 'Noise-cancelling wireless headphones', price: 199.99, category: 'Audio', stock: 120, image: '/products/headphones.jpg', rating: 4.5, createdAt: '2023-10-05' },
      { id: '3', name: 'Smart Watch', description: 'Fitness and health tracking smartwatch', price: 249.99, category: 'Wearables', stock: 78, image: '/products/smartwatch.jpg', rating: 4.3, createdAt: '2023-08-22' },
      { id: '4', name: 'Ergonomic Chair', description: 'Office chair with lumbar support', price: 349.99, category: 'Furniture', stock: 32, image: '/products/chair.jpg', rating: 4.8, createdAt: '2023-11-01' },
      { id: '5', name: 'Wireless Charger', description: 'Fast wireless charging pad', price: 49.99, category: 'Accessories', stock: 95, image: '/products/charger.jpg', rating: 4.2, createdAt: '2023-10-18' },
    ];
  } catch (error) {
    console.error('Error fetching products data:', error);
    throw error;
  }
};

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}