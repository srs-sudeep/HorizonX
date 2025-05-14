import { FullPageLoader } from '@/components/ui/loading-spinner';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  path: string;
  fallbackPath?: string;
}

const RoleBasedRoute = ({
  children,
  path,
  fallbackPath = '/unauthorized',
}: RoleBasedRouteProps) => {
  const { loading, hasAccess } = useRoleAccess(path);
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!hasAccess) {
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
