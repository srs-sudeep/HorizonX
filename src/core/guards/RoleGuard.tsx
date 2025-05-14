import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  roles: UserRole[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, roles }) => {
  const { user, currentRole } = useAuthStore();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has any of the required roles
  const hasRequiredRole = roles.some(
    role => user.roles.includes(role) && (!currentRole || currentRole === role)
  );

  if (!hasRequiredRole) {
    // Redirect to 403 forbidden page
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
