import { apiClient, publicApiClient } from '@/core';
import { type LoginResponse, type User } from '@/types';

export const login = async (credentials: {
  ldapid: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await publicApiClient.post('/core/api/v1/auth/login', credentials);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/core/api/v1/users/me');
  return response.data;
};
