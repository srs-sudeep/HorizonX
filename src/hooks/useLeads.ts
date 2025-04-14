import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  source: string;
  createdAt: string;
  notes?: string;
}

// Service function to fetch leads data
const fetchLeads = async (): Promise<Lead[]> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<Lead[]>('/leads');
    
    // For now, return mock data
    return [
      { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-123-4567', status: 'new', source: 'Website', createdAt: '2023-11-10' },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-987-6543', status: 'contacted', source: 'Referral', createdAt: '2023-11-08' },
      { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '555-456-7890', status: 'qualified', source: 'LinkedIn', createdAt: '2023-11-05' },
      { id: '4', name: 'Emma Wilson', email: 'emma@example.com', phone: '555-789-0123', status: 'new', source: 'Trade Show', createdAt: '2023-11-12' },
      { id: '5', name: 'David Lee', email: 'david@example.com', phone: '555-234-5678', status: 'lost', source: 'Cold Call', createdAt: '2023-10-28' },
    ];
  } catch (error) {
    console.error('Error fetching leads data:', error);
    throw error;
  }
};

export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}