import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/services/api';

export type UserRole = 'admin' | 'teacher' | 'student' | 'librarian' | 'medical';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
  currentRole?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  currentRole: UserRole | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithUser: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setCurrentRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      currentRole: null,
      
      login: async (email, password) => {
        try {
          const { user } = await authApi.login(email, password);
          
          // Set the current role to the first role
          const currentRole = user.roles[0];
          
          set({
            isAuthenticated: true,
            user,
            token: 'mock-jwt-token',
            currentRole,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Invalid credentials');
        }
      },
      
      loginWithUser: (user) => {
        const currentRole = user.roles[0];
        
        set({
          isAuthenticated: true,
          user,
          token: 'mock-jwt-token',
          currentRole,
        });
      },
      
      logout: () => {
        authApi.logout().then(() => {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            currentRole: null,
          });
        });
      },
      
      checkAuth: async () => {
        const { token } = get();
        
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }
        
        try {
          // Try to get the current user
          const user = await authApi.getCurrentUser();
          
          if (user) {
            set({ 
              isAuthenticated: true, 
              user,
              currentRole: user.roles[0]
            });
            return true;
          } else {
            set({ isAuthenticated: false, user: null, token: null });
            return false;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ isAuthenticated: false, user: null, token: null });
          return false;
        }
      },
      
      setCurrentRole: (role) => {
        const { user } = get();
        
        // Ensure the user has this role
        if (user && user.roles.includes(role)) {
          set({ currentRole: role });
        } else {
          console.error('User does not have the specified role');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        currentRole: state.currentRole,
      }),
    }
  )
);

