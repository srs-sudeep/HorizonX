import { FullPageLoader } from '@/components/ui/loading-spinner';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectPath?: string | 'role-dashboard';
}

const GuestGuard = ({ children, redirectPath = 'role-dashboard' }: GuestGuardProps) => {
  const { isAuthenticated, user, currentRole, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  if (isChecking) {
    return <FullPageLoader />;
  }

  if (isAuthenticated && user) {
    // If redirectPath is 'role-dashboard', redirect to the user's role dashboard
    if (redirectPath === 'role-dashboard') {
      // If there's a current role set, use that
      if (currentRole) {
        return <Navigate to={getDashboardLink(currentRole)} replace />;
      }

      // Otherwise use the first role from user.roles
      const defaultPath =
        user.roles && user.roles.length > 0 ? getDashboardLink(user.roles[0]) || '/' : '/';

      return <Navigate to={defaultPath} replace />;
    }

    // Otherwise, redirect to the specified path
    return <Navigate to={'/'} replace />;
  }

  // User is not authenticated, allow access to the guest route
  return <>{children}</>;
};

export default GuestGuard;
