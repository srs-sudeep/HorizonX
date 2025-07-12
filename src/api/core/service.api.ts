import { apiClient, CORE_URL } from '@/core';
import type { Service } from '@/types';

const BASE = `${CORE_URL}/services/`;

export async function getServices(): Promise<Service[]> {
  const { data } = await apiClient.get<Service[]>(`${BASE}`);
  return data;
}

export async function getOneService(service_id: string): Promise<Service> {
  const { data } = await apiClient.get<Service>(`${BASE}${service_id}`);
  return data;
}

export async function createService(
  payload: Omit<Service, 'service_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.post<Service>(`${BASE}`, payload, {
    silentError: false,
  });
  return data;
}

export async function updateService(
  service_id: number,
  payload: Omit<Service, 'service_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.put<Service>(`${BASE}${service_id}`, payload, {
    silentError: false,
  });
  return data;
}

export async function deleteService(service_id: number) {
  await apiClient.delete(`${BASE}${service_id}`);
}
