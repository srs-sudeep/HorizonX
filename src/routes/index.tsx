import { FullPageLoader } from '@/components';
import AuthGuard from '@/core/guards/AuthGuard';
import { useAvailableRoutes } from '@/hooks/useAvailableRoutes.hook';
import { filterNestedRoutesByAvailable } from '@/lib/filterRoutes';
import AuthRoutes from '@/routes/AuthRoutes';
import ErrorRoutes from '@/routes/ErrorRoutes';
import LandingRoutes from '@/routes/LandingRoutes';
import { allRouteObjects } from '@/routes/routeModuleMap';
import { useRoutes } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Router = () => {
  const { availableRoutes, isLoading } = useAvailableRoutes();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRoutes = filterNestedRoutesByAvailable(allRouteObjects, availableRoutes);
  const routes = useRoutes([
    LandingRoutes,
    AuthRoutes,
    {
      element: <AuthGuard />,
      children: filteredRoutes,
    },
    ...filteredRoutes,
    ...ErrorRoutes,
  ]);

  // Show loader until both conditions are met: data is loaded AND minimum time has elapsed
  if (isLoading || !minTimeElapsed) {
    return <FullPageLoader />;
  }

  return routes;
};

export default Router;
