import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store';
import { toast } from '@/hooks';
import { CustomAxiosRequestConfig } from '@/types';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
export interface CustomAxiosInstance extends AxiosInstance {
  <T = any, R = AxiosResponse<T>>(config: CustomAxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, config?: CustomAxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  // Add other HTTP verbs you use similarly
}
function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// Public client (no token)
export const publicApiClient = axios.create({
  baseURL: BASE_URL,
});

// Authenticated client
export const apiClient: CustomAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(config => {
  // Get the latest access_token from Zustand store
  const access_token = useAuthStore.getState().access_token;
  if (access_token && config.headers) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Get refresh_token from Zustand store
      const refreshToken = useAuthStore.getState().refresh_token;
      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          addRefreshSubscriber((newToken: string) => {
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await publicApiClient.post('/api/v1/auth/refresh', {
          refresh_token: refreshToken,
        });
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        useAuthStore.setState({
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        });

        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const context = originalRequest.headers?.['x-error-context'] ?? 'Request';
    if (error.config.silentError) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      toast({
        title: `${context} failed`,
        description: errorMessage,
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
);
