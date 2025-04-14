import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  company: string;
  lastContact: string;
  value: number;
}

// Service function to fetch customers data
const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<Customer[]>('/customers');
    
    // For now, return mock data
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', company: 'Acme Inc', lastContact: '2023-10-15', value: 5000 },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', company: 'Globex Corp', lastContact: '2023-10-12', value: 7500 },
      { id: '3', name: 'Robert Johnson', email: 'robert@example.com', status: 'inactive', company: 'Initech', lastContact: '2023-09-28', value: 3200 },
      { id: '4', name: 'Emily Davis', email: 'emily@example.com', status: 'pending', company: 'Umbrella Corp', lastContact: '2023-10-18', value: 4800 },
      { id: '5', name: 'Michael Wilson', email: 'michael@example.com', status: 'active', company: 'Stark Industries', lastContact: '2023-10-05', value: 9200 },
    ];
  } catch (error) {
    console.error('Error fetching customers data:', error);
    throw error;
  }
};

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}