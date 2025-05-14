import { fetchUserRoutes } from '@/api/routesApi';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';

export function useAvailableRoutes() {
  const { isAuthenticated, user, currentRole } = useAuthStore();
  const [availableRoutes, setAvailableRoutes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      if (isAuthenticated && user) {
        try {
          const routes = await fetchUserRoutes(currentRole || user.roles[0]);
          setAvailableRoutes(routes);
        } catch (error) {
          console.error('Failed to load routes:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setAvailableRoutes([]);
        setIsLoading(false);
      }
    };

    loadRoutes();
  }, [isAuthenticated, user, currentRole]);

  return { availableRoutes, isLoading };
}
