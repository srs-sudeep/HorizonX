import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  getRouteComponents,
  addRouteComponent,
  removeRouteComponent,
} from '@/api';
import type { Route, RouteComponentResponse } from '@/types';

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

export function useRouteComponents(route_id: number) {
  return useQuery<RouteComponentResponse>({
    queryKey: ['route-components', route_id],
    queryFn: () => getRouteComponents(route_id),
    enabled: !!route_id,
  });
}

export function useAddRouteComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRouteComponent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['route-components', variables.route_id] });
    },
  });
}

export function useRemoveRouteComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeRouteComponent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['route-components', variables.route_id] });
    },
  });
}