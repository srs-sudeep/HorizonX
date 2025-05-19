import { fetchRoutePermissions, type RouteAccess } from '@/api/routesApi';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { useEffect, useState, useRef } from 'react';
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
  // Track previous role to detect changes
  const previousRoleRef = useRef<UserRole | null>(null);
  // Flag to skip permission check during role transition
  const isRoleTransitionRef = useRef(false);

  useEffect(() => {
    // Handle role setting first
    if (roleToSet) {
      setCurrentRole(roleToSet);
      setRoleToSet(null);
      return;
    }

    // Handle role change navigation
    if (previousRoleRef.current && currentRole && previousRoleRef.current !== currentRole) {
      // Set transition flag to true
      isRoleTransitionRef.current = true;

      // Navigate to the appropriate dashboard for the new role
      const dashboardLink = getDashboardLink(currentRole);
      navigate(dashboardLink, { replace: true });

      // Update previous role
      previousRoleRef.current = currentRole;
      return;
    }

    const checkAccess = async () => {
      try {
        await checkAuth();

        // Delay role set to next render cycle if no current role
        if (!currentRole && user?.roles?.length) {
          setRoleToSet(user.roles[0]);
          return;
        }

        if (currentRole) {
          // Initialize previous role if not set
          if (previousRoleRef.current !== currentRole) {
            previousRoleRef.current = currentRole;
          }

          // Skip permission check if we're in a role transition
          if (isRoleTransitionRef.current) {
            isRoleTransitionRef.current = false;
            setHasAccess(true);
            setLoading(false);
            return;
          }

          const permissions = await fetchRoutePermissions(currentRole);
          setRoutePermissions(permissions);

          // Check if current path is allowed for current role
          const routePermission = permissions.find(p => p.path === path);
          const hasPermission =
            !!routePermission && routePermission.allowedRoles.includes(currentRole);
          setHasAccess(hasPermission);
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
  }, [currentRole, roleToSet, user, path, navigate, checkAuth, setCurrentRole]);

  // Function to switch to an allowed role for a given path
  const switchToAllowedRole = async (targetPath: string): Promise<boolean> => {
    if (!user?.roles?.length) return false;

    // Get permissions for all user roles to find which one has access
    const allPermissions = [];
    for (const role of user.roles) {
      const rolePermissions = await fetchRoutePermissions(role as UserRole);
      allPermissions.push(...rolePermissions);
    }

    // Find a permission that matches the target path
    const permission = allPermissions.find(p => p.path === targetPath);
    if (!permission) {
      console.error(`No permission found for path: ${targetPath}`);
      return false;
    }

    // Find a role that has access to this path
    const allowedRole = user.roles.find(role =>
      permission.allowedRoles.includes(role as UserRole)
    ) as UserRole | undefined;

    if (allowedRole) {
      await setCurrentRole(allowedRole);
      return true;
    }

    console.error(`No allowed role found for path: ${targetPath}`);
    return false;
  };

  return { loading, hasAccess, routePermissions, switchToAllowedRole };
}
