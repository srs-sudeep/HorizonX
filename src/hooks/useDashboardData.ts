import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

interface DashboardData {
  revenue: string;
  newUsers: number;
  activeProjects: number;
  tasksCompleted: number;
  // Add more fields as needed
}

// Service function to fetch dashboard data
const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<DashboardData>('/dashboard/summary');
    
    // For now, return mock data
    return {
      revenue: '$24,500',
      newUsers: 145,
      activeProjects: 12,
      tasksCompleted: 64
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}