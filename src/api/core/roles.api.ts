import { apiClient, CORE_URL } from '@/core';
import type { Role } from '@/types';

const BASE = `${CORE_URL}/rbac/roles`;

export async function getRoles(): Promise<Role[]> {
  const { data } = await apiClient.get<Role[]>(`${BASE}`);
  return data;
}

export async function createRole(payload: Omit<Role, 'role_id' | 'created_at' | 'updated_at'>) {
  const { data } = await apiClient.post<Role>(`${BASE}`, payload, {
    silentError: false,
  });
  return data;
}

export async function updateRole(
  role_id: number,
  payload: Omit<Role, 'role_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.put<Role>(`${BASE}/${role_id}`, payload, {
    silentError: false,
  });
  return data;
}

export async function deleteRole(role_id: number) {
  await apiClient.delete(`${BASE}/${role_id}`);
}

export async function getRolePermissions(role_id: number) {
  const { data } = await apiClient.get(`${BASE}/${role_id}/permissions/all`);
  return data;
}

export async function addPermissionToRole(role_id: number, permission_id: number) {
  await apiClient.post(
    `${BASE}/${role_id}/permissions/${permission_id}`,
    {},
    {
      silentError: false,
    }
  );
}

export async function removePermissionFromRole(role_id: number, permission_id: number) {
  await apiClient.delete(`${BASE}/${role_id}/permissions/${permission_id}`);
}
