// Router.tsx
import AuthGuard from '@/core/guards/AuthGuard';
import { useAvailableRoutes } from '@/hooks/useAvailableRoutes';
import { useRoutes } from 'react-router-dom';

// Static route modules
import AuthRoutes from '@/routes/AuthRoutes';
import ErrorRoutes from '@/routes/ErrorRoutes';
import LandingRoutes from '@/routes/LandingRoutes';

// Dynamic route map
import { routeModuleMap } from '@/routes/routeModuleMap';

const Router = () => {
  const { availableRoutes, isLoading } = useAvailableRoutes();

  // Filter route modules based on available routes
  const filteredRoutes = Object.entries(routeModuleMap)
    .filter(([key]) => availableRoutes.includes(key))
    .map(([_, route]) => route);

  // Combine all routes
  const routes = useRoutes([
    LandingRoutes,
    AuthRoutes,
    {
      element: <AuthGuard />,
      children: isLoading ? [] : filteredRoutes,
    },
    ...ErrorRoutes,
  ]);

  return routes;
};

export default Router;
