import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoutes, createRoute, updateRoute, deleteRoute } from '@/api';
import type { Route } from '@/types';

export function useRoutes() {
  return useQuery<Route[]>({
    queryKey: ['routes'],
    queryFn: getRoutes,
  });
}

export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.invalidateQueries({ queryKey: ['sidebarItems'] });
    },
  });
}

export function useUpdateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      route_id,
      payload,
    }: {
      route_id: number;
      payload: Omit<Route, 'route_id' | 'created_at' | 'updated_at'>;
    }) => updateRoute(route_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.invalidateQueries({ queryKey: ['sidebarItems'] });
    },
  });
}

export function useDeleteRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (route_id: number) => deleteRoute(route_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      queryClient.invalidateQueries({ queryKey: ['sidebarItems'] });
    },
  });
}
