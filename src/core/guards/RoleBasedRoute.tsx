
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { fetchRoutePermissions, type RouteAccess } from '@/api/routesApi';
import { FullPageLoader } from '@/components/ui/loading-spinner';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  path: string;
  fallbackPath?: string;
}

const RoleBasedRoute = ({ 
  children, 
  path,
  fallbackPath = '/unauthorized' 
}: RoleBasedRouteProps) => {
  const { currentRole, user, setCurrentRole, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [routePermissions, setRoutePermissions] = useState<RouteAccess[]>([]);
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
        
        // Fetch route permissions for the current role
        if (currentRole) {
          const permissions = await fetchRoutePermissions(currentRole);
          setRoutePermissions(permissions);
        }
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

  // Find the route permission for this path
  const routePermission = routePermissions.find(p => p.path === path);
  
  // If no permission found or current role not in allowed roles, check if user has other allowed roles
  if (!routePermission || !currentRole || !routePermission.allowedRoles.includes(currentRole)) {
    // If user has other roles that are allowed for this route
    if (user && user.roles && routePermission) {
      const hasAllowedRole = user.roles.some(role => 
        routePermission.allowedRoles.includes(role as UserRole)
      );
      
      if (hasAllowedRole) {
        // Find the first allowed role
        const firstAllowedRole = user.roles.find(role => 
          routePermission.allowedRoles.includes(role as UserRole)
        ) as UserRole;
        
        // Set the current role to the first allowed role
        setCurrentRole(firstAllowedRole);
        
        // Return loading while the role is being updated
        return <FullPageLoader />;
      }
    }
    
    // If user doesn't have any of the required roles, redirect to unauthorized page
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // If user has the required role, render the children
  return <>{children}</>;
};

export default RoleBasedRoute;

