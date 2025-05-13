
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { FullPageLoader } from '@/components/ui/loading-spinner';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

const RoleBasedRoute = ({ 
  children, 
  allowedRoles, 
  fallbackPath = '/unauthorized' 
}: RoleBasedRouteProps) => {
  const { currentRole, user, setCurrentRole } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkRoleAccess = async () => {
      // If no current role is set but user has roles, set the first one
      if (!currentRole && user?.roles?.length) {
        setCurrentRole(user.roles[0]);
      }
      setLoading(false);
    };
    
    checkRoleAccess();
  }, [currentRole, user, setCurrentRole]);

  // Show loading when checking permissions
  if (loading) {
    return <FullPageLoader />;
  }

  // If user has the required role, render the children
  if (currentRole && allowedRoles.includes(currentRole)) {
    return <>{children}</>;
  }
  
  // If user doesn't have the required role, redirect to unauthorized page
  return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
};

export default RoleBasedRoute;

