import { apiClient, CORE_URL } from '@/core';
import type { Route, RouteComponentResponse, RouteComponentPayload } from '@/types';

const BASE = `${CORE_URL}/route/`;

export async function getRoutes(): Promise<Route[]> {
  const { data } = await apiClient.get<Route[]>(`${BASE}`);
  return data;
}

export async function updateRoute(
  route_id: number,
  payload: Omit<Route, 'route_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.put<Route>(`${BASE}${route_id}`, payload, {
    silentError: false,
  });
  return data;
}

export async function deleteRoute(route_id: number) {
  await apiClient.delete(`${BASE}${route_id}`);
}

export async function createRoute(payload: Omit<Route, 'route_id' | 'created_at' | 'updated_at'>) {
  const { data } = await apiClient.post<Route>(`${BASE}`, payload, {
    silentError: false,
  });
  return data;
}

export async function getRouteComponents(route_id: number): Promise<RouteComponentResponse> {
  const { data } = await apiClient.get<RouteComponentResponse>(`${CORE_URL}/route/${route_id}/components`);
  return data;
}

export async function addRouteComponent(payload: RouteComponentPayload) {
  await apiClient.post(`${CORE_URL}/route/add-component`, payload);
}

export async function removeRouteComponent(payload: RouteComponentPayload) {
  await apiClient.post(`${CORE_URL}/route/remove-component`, payload);
}