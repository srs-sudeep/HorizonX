import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserFilters, assignRoleToUser, removeRoleFromUser } from '@/api';
import type { UserListResponse, GetUsersParams, UserFiltersResponse } from '@/types';

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
