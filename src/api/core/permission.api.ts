import { apiClient, CORE_URL } from '@/core';
import type { Permission } from '@/types';

const BASE = `${CORE_URL}/rbac/permissions`;

export async function getPermissions(skip = 0, limit = 300): Promise<Permission[]> {
  const { data } = await apiClient.get<Permission[]>(`${BASE}?skip=${skip}&limit=${limit}`);
  return data;
}

export async function updatePermission(
  permission_id: number,
  payload: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.put<Permission>(`${BASE}/${permission_id}`, payload, {
    silentError: false,
  });
  return data;
}

export async function deletePermission(permission_id: number) {
  await apiClient.delete(`${BASE}/${permission_id}`);
}

export async function createPermission(
  payload: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.post<Permission>(`${BASE}`, payload, {
    silentError: false,
  });
  return data;
}
