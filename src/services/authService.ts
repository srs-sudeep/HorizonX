import { apiClient } from './apiClient';
import { type AuthResponse, type LoginCredentials, type RegisterCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },
  
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/register', credentials);
  },
  
  logout: async (): Promise<void> => {
    return apiClient.post<void>('/auth/logout', {});
  },
  
  getCurrentUser: async (): Promise<AuthResponse> => {
    return apiClient.get<AuthResponse>('/auth/me');
  }
};