import { fetchUserRoutes } from '@/api';
import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';

export function useAvailableRoutes() {
  const { isAuthenticated } = useAuthStore();

  const { data: availableRoutes = [], isLoading } = useQuery({
    queryKey: ['userRoutes'],
    queryFn: fetchUserRoutes,
    enabled: !!isAuthenticated,
  });

  return { availableRoutes, isLoading };
}
