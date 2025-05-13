
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { FullPageLoader } from '@/components/ui/loading-spinner';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectPath?: string | 'role-dashboard';
}

const GuestGuard = ({ children, redirectPath = 'role-dashboard' }: GuestGuardProps) => {
  const { isAuthenticated, user, currentRole, checkAuth } = useAuthStore();
  const location = useLocation();
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
      // Get the first role and redirect to its dashboard
      const rolePaths: Record<string, string> = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
        librarian: '/librarian/dashboard',
        medical: '/medical/dashboard'
      };
      
      // If there's a current role set, use that
      if (currentRole && rolePaths[currentRole]) {
        return <Navigate to={rolePaths[currentRole]} replace />;
      }
      
      // Otherwise use the first role from user.roles
      const defaultPath = user.roles && user.roles.length > 0 
        ? rolePaths[user.roles[0]] || '/dashboard'
        : '/dashboard';
        
      return <Navigate to={defaultPath} replace />;
    }
    
    // Otherwise, redirect to the specified path
    return <Navigate to={redirectPath} replace />;
  }

  // User is not authenticated, allow access to the guest route
  return <>{children}</>;
};

export default GuestGuard;

