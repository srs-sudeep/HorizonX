import { apiClient, CORE_URL } from '@/core';
import type { UserListResponse, UserFiltersResponse, GetUsersParams, UserComponentsResponse, UserComponentPayload } from '@/types';

const BASE = `${CORE_URL}/users/`;

export async function getUsers(params: GetUsersParams = {}): Promise<UserListResponse> {
  const { search, status, roles, limit = 10, offset = 0 } = params;

  const query: Record<string, any> = { limit, offset };
  if (search) query.search = search;
  if (typeof status === 'boolean') query.status = status;
  if (roles && roles.length > 0) {
    roles.forEach((roleId, idx) => {
      query[`roles[${idx}]`] = roleId;
    });
  }

  const paramsSerializer = (paramsObj: Record<string, any>) => {
    const usp = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (key.startsWith('roles[')) {
        usp.append('roles', value as any);
      } else {
        usp.append(key, value as any);
      }
    });
    return usp.toString();
  };

  const { data } = await apiClient.get<UserListResponse>(`${BASE}`, {
    params: query,
    paramsSerializer,
  });
  return data;
}

export async function assignRoleToUser(user_id: string, role_id: number) {
  await apiClient.post(
    `${BASE}${user_id}/roles/${role_id}`,
    {},
    {
      silentError: false,
    }
  );
}

export async function removeRoleFromUser(user_id: string, role_id: number) {
  await apiClient.delete(`${BASE}${user_id}/roles/${role_id}`);
}

export async function getUserFilters(): Promise<UserFiltersResponse> {
  const { data } = await apiClient.get<UserFiltersResponse>(`${BASE}filters`);
  return data;
}

export async function getUserComponents(user_id?: string): Promise<UserComponentsResponse> {
  const { data } = await apiClient.get<UserComponentsResponse>(`${CORE_URL}/users/components`, {
    params: { user_id },
  });
  return data;
}

export async function addUserComponent(payload: UserComponentPayload) {
  await apiClient.post(`${CORE_URL}/users/add-component`, payload);
}

export async function removeUserComponent(payload: UserComponentPayload) {
  await apiClient.delete(`${CORE_URL}/users/remove-component`, { data: payload });
}