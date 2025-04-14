import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/auth/authStore';
import { type LoginCredentials, type RegisterCredentials } from '../types';
import { apiClient } from '~/services/apiClient';

export function useAuth() {
  const queryClient = useQueryClient();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
  
  // Get current user query
  const currentUserQuery = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: authService.getCurrentUser,
    // Only run this query if we're authenticated according to the store
    enabled: useAuthStore.getState().isAuthenticated,
    // Don't refetch on window focus for auth state
    refetchOnWindowFocus: false,
    // Handle errors quietly
    retry: false
  });
  
  // Handle query errors
  useEffect(() => {
    if (currentUserQuery.error) {
      // If this fails, log the user out
      storeLogout();
    }
  }, [currentUserQuery.error]);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => storeLogin(credentials),
    onSuccess: () => {
      // Invalidate the current user query to refetch it
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
    }
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: (data) => {
      // Update the auth store with the new user
      useAuthStore.setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
      // Set the auth token for future requests
      apiClient.setAuthToken(data.token);
      // Invalidate the current user query
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
    }
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      storeLogout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear any user-related queries
      queryClient.invalidateQueries();
    }
  });
  
  return {
    user: useAuthStore(state => state.user),
    isAuthenticated: useAuthStore(state => state.isAuthenticated),
    isLoading: loginMutation.isPending || currentUserQuery.isLoading,
    error: useAuthStore(state => state.error),
    login: (credentials: LoginCredentials, options?: { onSuccess?: () => void }) => {
      return loginMutation.mutate(credentials, options);
    },
    register: (credentials: RegisterCredentials, options?: { onSuccess?: () => void }) => {
      return registerMutation.mutate(credentials, options);
    },
    logout: (options?: { onSuccess?: () => void }) => {
      return logoutMutation.mutate(undefined, options);
    }
  };
}
