
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
  const { currentRole, user, setCurrentRole, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkRoleAccess = async () => {
      try {
        // First check if the user is authenticated
        await checkAuth();
        // If no current role is set but user has roles, set the first one
        if (!currentRole && user?.roles?.length) {
            setCurrentRole(user.roles[0]);
        }
        console.log(currentRole)
      } catch (error) {
        console.error('Role check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkRoleAccess();
  }, [currentRole, user, setCurrentRole, checkAuth]);

  // Show loading when checking permissions
  if (loading) {
    return <FullPageLoader />;
  }

  // If user has the required role, render the children
  if (currentRole && allowedRoles.includes(currentRole)) {
    return <>{children}</>;
  }

  // If user doesn't have the required role but has other roles that are allowed
  if (user && user.roles) {
    const hasAllowedRole = user.roles.some(role => allowedRoles.includes(role as UserRole));
    
    if (hasAllowedRole) {
      // Find the first allowed role
      const firstAllowedRole = user.roles.find(role => 
        allowedRoles.includes(role as UserRole)
      ) as UserRole;
      
      // Set the current role to the first allowed role
      setCurrentRole(firstAllowedRole);
      
      // Return loading while the role is being updated
      return <FullPageLoader />;
    }
  }
  
  // If user doesn't have any of the required roles, redirect to unauthorized page
  return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
};

export default RoleBasedRoute;

