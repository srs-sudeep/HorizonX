import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/auth/authStore';
import { type LoginCredentials, type RegisterCredentials } from '../types';
import { apiClient } from '@services/apiClient';

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
    mutationFn: async (credentials: LoginCredentials) => {
      // First login through the store
      await storeLogin(credentials);
      // Return the current state after login
      return {
        user: useAuthStore.getState().user,
        isAuthenticated: useAuthStore.getState().isAuthenticated
      };
    },
    onSuccess: (data) => {
      // Invalidate the current user query to refetch it
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
      
      // Only redirect if authentication was successful
      if (data.isAuthenticated && data.user?.role) {
        window.location.href = `/${data.user.role}`;
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
      
      // Redirect to the appropriate dashboard based on user role
      if (data.user?.role) {
        window.location.href = `/${data.user.role}`;
      }
    }
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      // First clear any user-related queries
      queryClient.invalidateQueries();
      // Then logout from the store
      storeLogout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Force redirect to landing page
      window.location.replace('/');
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
      return logoutMutation.mutate(undefined, {
        ...options,
        onSuccess: () => {
          // Navigate to landing page after logout
          window.location.replace('/');
          options?.onSuccess?.();
        }
      });
    }
  };
}
