import { fetchRoutePermissions, type RouteAccess } from '@/api/routesApi';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseRoleAccessResult {
  loading: boolean;
  hasAccess: boolean;
  routePermissions: RouteAccess[];
  switchToAllowedRole: (path: string) => Promise<boolean>;
}

export function useRoleAccess(path: string): UseRoleAccessResult {
  const { currentRole, user, setCurrentRole, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [routePermissions, setRoutePermissions] = useState<RouteAccess[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  // Flag to defer role setting
  const [roleToSet, setRoleToSet] = useState<UserRole | null>(null);

  useEffect(() => {
    if (roleToSet) {
      setCurrentRole(roleToSet);
      setRoleToSet(null);
      return;
    }

    const checkAccess = async () => {
      try {
        await checkAuth();

        // Delay role set to next render cycle
        if (!currentRole && user?.roles?.length) {
          setRoleToSet(user.roles[0]);
          return;
        }

        if (currentRole) {
          const permissions = await fetchRoutePermissions(currentRole);
          setRoutePermissions(permissions);

          const routePermission = permissions.find(p => p.path === path);
          setHasAccess(!!routePermission && routePermission.allowedRoles.includes(currentRole));
        }
      } catch (error) {
        console.error('Role access check failed:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    checkAccess();
  }, [currentRole, roleToSet, user, path]);

  // Function to switch to an allowed role for a given path
  const switchToAllowedRole = async (targetPath: string): Promise<boolean> => {
    if (!user?.roles?.length) return false;

    const permission = routePermissions.find(p => p.path === targetPath);
    if (!permission) return false;

    const allowedRole = user.roles.find(role =>
      permission.allowedRoles.includes(role as UserRole)
    ) as UserRole | undefined;

    if (allowedRole) {
      setCurrentRole(allowedRole);
      navigate(getDashboardLink(allowedRole), { replace: true });
      return true;
    }

    return false;
  };

  return { loading, hasAccess, routePermissions, switchToAllowedRole };
}
