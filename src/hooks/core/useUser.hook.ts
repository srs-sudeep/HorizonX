import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';
import { getUsers, getUserFilters, assignRoleToUser, removeRoleFromUser, getUserComponents, addUserComponent, removeUserComponent } from '@/api';
import type { UserListResponse, GetUsersParams, UserFiltersResponse, UserComponentsResponse } from '@/types';

export function useUsers(params: GetUsersParams = {}) {
  return useQuery<UserListResponse>({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
}
export function useAssignRoleToUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ user_id, role_id }: { user_id: string; role_id: number }) => {
      await assignRoleToUser(user_id, role_id);
    },
    onSuccess: _data => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useRemoveRoleFromUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ user_id, role_id }: { user_id: string; role_id: number }) => {
      await removeRoleFromUser(user_id, role_id);
    },
    onSuccess: _data => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUserFilter() {
  return useQuery<UserFiltersResponse>({
    queryKey: ['user-filters'],
    queryFn: getUserFilters,
  });
}

export function useUserComponents(user_id?: string) {
  return useQuery<UserComponentsResponse>({
    queryKey: ['user-components', user_id ?? 'me'],
    queryFn: () => user_id ? getUserComponents(user_id) : getUserComponents(),
    enabled: user_id !== undefined || user_id === undefined, // always enabled
  });
}

export function useAddUserComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUserComponent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-components', variables.user_id] });
    },
  });
}

export function useRemoveUserComponent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUserComponent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-components', variables.user_id] });
    },
  });
}

export function useMultiUserComponents(userIds: string[]) {
  const queries = useQueries({
    queries: userIds.map(user_id => ({
      queryKey: ['user-components', user_id],
      queryFn: () => getUserComponents(user_id),
      enabled: !!user_id,
    })),
  });

  return userIds.reduce((acc, user_id, idx) => {
    acc[user_id] = queries[idx]?.data?.component_ids || [];
    return acc;
  }, {} as Record<string, string[]>);
}