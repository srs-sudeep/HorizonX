import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServices, getOneService, createService, updateService, deleteService } from '@/api';
import type { Service } from '@/types';

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: getServices,
  });
}

export function useService(service_id: string) {
  return useQuery<Service>({
    queryKey: ['service', service_id],
    queryFn: () => getOneService(service_id),
    enabled: !!service_id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ service_id, payload }: { service_id: number; payload: any }) =>
      updateService(service_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (service_id: number) => deleteService(service_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}
