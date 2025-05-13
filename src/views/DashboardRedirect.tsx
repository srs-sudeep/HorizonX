import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/store/useAuthStore';
import { FullPageLoader } from '@/components/ui/loading-spinner';

const DashboardRedirect = () => {
  const { isAuthenticated, user, currentRole, setCurrentRole } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Short timeout to ensure auth state is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Define role-specific dashboard paths
  const rolePaths: Record<UserRole, string> = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    librarian: '/librarian/dashboard',
    medical: '/medical/dashboard'
  };

  // If there's a current role, redirect to its dashboard
  if (currentRole && rolePaths[currentRole]) {
    return <Navigate to={rolePaths[currentRole]} replace />;
  }

  // If no current role but user has roles, set the first one and redirect
  if (user.roles && user.roles.length > 0) {
    const firstRole = user.roles[0];
    setCurrentRole(firstRole);
    return <Navigate to={rolePaths[firstRole]} replace />;
  }

  // Fallback to login if no roles (shouldn't happen)
  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;