import { getDashboardLink } from '@/lib';
import { useAuthStore } from '@/store';
import { Navigate } from 'react-router-dom';

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, currentRole } = useAuthStore();
  if (isAuthenticated && user) {
    if (currentRole) {
      return <Navigate to={getDashboardLink(currentRole)} replace />;
    }
    const defaultPath =
      user.roles && user.roles.length > 0 ? getDashboardLink(user.roles[0]) || '/' : '/';

    return <Navigate to={defaultPath} replace />;
  }
  return <>{children}</>;
};

export default GuestGuard;
