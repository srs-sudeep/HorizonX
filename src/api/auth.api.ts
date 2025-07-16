import { apiClient, publicApiClient } from '@/core';
import { type LoginResponse, type User } from '@/types';

export const login = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await publicApiClient.post('/api/v1/auth/login', credentials);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/api/v1/users/me');
  return response.data;
};

export const register = async (payload: {
  name: string;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}) => {
  const response = await publicApiClient.post('/api/v1/auth/register', payload);
  return response.data;
};
