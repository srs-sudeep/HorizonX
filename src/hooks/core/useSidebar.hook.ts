import { fetchSidebarModules } from '@/api';
import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';

interface UseSidebarItemsOptions {
  role?: string;
  is_active?: boolean;
}

export function useSidebarItems(options?: UseSidebarItemsOptions) {
  const { currentRole } = useAuthStore();

  let roleToUse = options?.role ?? currentRole;
  if (roleToUse === 'all') roleToUse = null;

  const params: Record<string, any> = {};
  if (roleToUse) params.role = roleToUse;
  if (typeof options?.is_active === 'boolean') params.is_active = options.is_active;

  const enabled =
    options?.role !== undefined ||
    (roleToUse !== undefined && roleToUse !== null) ||
    typeof options?.is_active === 'boolean';

  const { data: sidebarItems = [], isLoading } = useQuery({
    queryKey: ['sidebarItems', params],
    queryFn: () => fetchSidebarModules(params),
    enabled,
  });

  return { sidebarItems, isLoading };
}
