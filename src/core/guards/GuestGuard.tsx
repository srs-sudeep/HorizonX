
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectPath?: string | 'role-dashboard';
}

const GuestGuard = ({ children, redirectPath = 'role-dashboard' }: GuestGuardProps) => {
  const { isAuthenticated, user, currentRole } = useAuthStore();
  const location = useLocation();

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
    
    // Otherwise redirect to the specified path
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;

