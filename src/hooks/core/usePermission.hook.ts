import { createPermission, deletePermission, getPermissions, updatePermission } from '@/api';
import type { Permission } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePermissions() {
  return useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: () => getPermissions(),
  });
}

export function useUpdatePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      permission_id,
      payload,
    }: {
      permission_id: number;
      payload: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>;
    }) => updatePermission(permission_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
}

export function useDeletePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (permission_id: number) => deletePermission(permission_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
}

export function useCreatePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
}
