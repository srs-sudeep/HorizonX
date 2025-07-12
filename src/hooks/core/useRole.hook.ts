import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRolePermissions,
  addPermissionToRole,
  removePermissionFromRole,
} from '@/api';
import type { Role } from '@/types';

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: getRoles,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      role_id,
      payload,
    }: {
      role_id: number;
      payload: Omit<Role, 'role_id' | 'created_at' | 'updated_at'>;
    }) => updateRole(role_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role_id: number) => deleteRole(role_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function usePermissionByRole(role_id?: number) {
  return useQuery({
    queryKey: ['role-permissions', role_id],
    queryFn: () => getRolePermissions(role_id as number),
    enabled: !!role_id,
  });
}

export function useAddPermissionToRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ role_id, permission_id }: { role_id: number; permission_id: number }) => {
      await addPermissionToRole(role_id, permission_id);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['role-permissions', variables.role_id] });
    },
  });
}

export function useRemovePermissionFromRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ role_id, permission_id }: { role_id: number; permission_id: number }) => {
      await removePermissionFromRole(role_id, permission_id);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['role-permissions', variables.role_id] });
    },
  });
}
