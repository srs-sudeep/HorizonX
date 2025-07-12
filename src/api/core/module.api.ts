import { apiClient, CORE_URL } from '@/core';
import type { Module } from '@/types';

const BASE = `${CORE_URL}/modules/`;

export async function getModules(): Promise<Module[]> {
  const { data } = await apiClient.get<Module[]>('/core/api/v1/modules/');
  return data;
}

export async function updateModule(
  module_id: number,
  payload: Omit<Module, 'module_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.put<Module>(`${BASE}${module_id}`, payload, {
    silentError: false,
  });
  return data;
}

export async function deleteModule(module_id: number) {
  await apiClient.delete(`${BASE}${module_id}`);
}

export async function createModule(
  payload: Omit<Module, 'module_id' | 'created_at' | 'updated_at'>
) {
  const { data } = await apiClient.post<Module>(`${BASE}`, payload, {
    silentError: false,
  });
  return data;
}
