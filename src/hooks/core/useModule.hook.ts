import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getModules, createModule, updateModule, deleteModule } from '@/api';
import type { Module } from '@/types';

export function useModules() {
  return useQuery<Module[]>({
    queryKey: ['modules'],
    queryFn: getModules,
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ module_id, payload }: { module_id: number; payload: any }) =>
      updateModule(module_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (module_id: number) => deleteModule(module_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}
