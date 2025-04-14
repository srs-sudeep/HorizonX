import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

interface TopPage {
  url: string;
  views: number;
}

interface DeviceDistribution {
  desktop: number;
  mobile: number;
  tablet: number;
}

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  deviceDistribution: DeviceDistribution;
  topPages: TopPage[];
}

// Service function to fetch analytics data
const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<AnalyticsData>('/analytics/summary');
    
    // For now, return mock data
    return {
      pageViews: 24750,
      uniqueVisitors: 18432,
      bounceRate: 42,
      avgSessionDuration: '3m 24s',
      deviceDistribution: {
        desktop: 58,
        mobile: 36,
        tablet: 6
      },
      topPages: [
        { url: '/dashboard', views: 5240 },
        { url: '/products', views: 4180 },
        { url: '/login', views: 3290 },
        { url: '/settings', views: 2840 },
        { url: '/profile', views: 2310 }
      ]
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analyticsData'],
    queryFn: fetchAnalyticsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
