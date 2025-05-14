import { useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthGuard from '@/core/guards/AuthGuard';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchUserRoutes } from '@/api/routesApi'; // API to fetch role-based routes

// Static route modules
import LandingRoutes from '@/routes/LandingRoutes';
import AuthRoutes from '@/routes/AuthRoutes';
import ErrorRoutes from '@/routes/ErrorRoutes';

//Module routes
import DashboardRoutes from '@/routes/Dashboard';
import AdminRoutes from '@/routes/AdminRoutes';
import AcademicsRoutes from '@/routes/Academics';
// import LibraryRoutes from '@/routes/Library';
// import MedicalRoutes from '@/routes/Medical';
// import CommunicationRoutes from '@/routes/Communication';

const Router = () => {
  const { isAuthenticated, user, currentRole } = useAuthStore();
  const [availableRoutes, setAvailableRoutes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch available routes when user is authenticated
  useEffect(() => {
    const loadRoutes = async () => {
      if (isAuthenticated && user) {
        try {
          // Fetch routes available for the current user role
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

  const moduleMap = {
    'dashboard' : DashboardRoutes,
    'admin': AdminRoutes,
    'academics': AcademicsRoutes,
    // 'library': LibraryRoutes,
};
  // Filter route modules based on available routes
  const filteredRoutes = Object.entries(moduleMap)
    .filter(([key]) => availableRoutes.includes(key))
    .map(([_, route]) => route);


  // Combine all routes
  const routes = useRoutes([
    // Static routes (always available)
    LandingRoutes,
    AuthRoutes,
    
    // Dynamic routes (require authentication and role-based access)
    {
      element: <AuthGuard />,
      children: isLoading ? [] : filteredRoutes,
    },
    
    // Error routes
    ...ErrorRoutes,
  ]);

  return routes;
};

export default Router;
