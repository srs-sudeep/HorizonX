// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type AuthState, type LoginCredentials, type User, UserRole } from '../../types';

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'admin@horizon.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    password: 'admin123',
  },
  {
    id: '2',
    email: 'manager@horizon.com',
    name: 'Manager User',
    role: UserRole.MANAGER,
    password: 'manager123',
  },
  {
    id: '3',
    email: 'user@horizon.com',
    name: 'Regular User',
    role: UserRole.USER,
    password: 'user123',
  },
];

export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    checkAuth: () => boolean;
  }
>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500)); // Reduced time

          // Find user with matching credentials
          const user = mockUsers.find(
            u => u.email === credentials.email && u.password === credentials.password
          );

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Create user object without password
          const { password, ...userWithoutPassword } = user;

          // Generate mock token
          const token = `mock-jwt-token-${Math.random().toString(36).substring(2, 15)}`;

          // Update state immediately
          set({
            user: userWithoutPassword as User,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Return the user and token for the mutation
          return {
            user: userWithoutPassword as User,
            token
          };
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
          throw error; // Re-throw to be caught by the mutation
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: 'horizon-auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Add this to ensure state is hydrated immediately on page load
      skipHydration: false,
    }
  )
);
