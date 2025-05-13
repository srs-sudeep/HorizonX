import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'teacher' | 'student' | 'librarian' | 'medical';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
  currentRole?:string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  currentRole: UserRole | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
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
          // This is a mock implementation - replace with actual API call
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data based on email
          let mockUser: User;
          
          if (email.includes('admin')) {
            mockUser = {
              id: '1',
              name: 'Admin User',
              email,
              roles: ['admin'],
              avatar: 'https://ui-avatars.com/api/?name=Admin+User',
            };
          } else if (email.includes('teacher')) {
            mockUser = {
              id: '2',
              name: 'Teacher User',
              email,
              roles: ['teacher'],
              avatar: 'https://ui-avatars.com/api/?name=Teacher+User',
            };
          } else {
            mockUser = {
              id: '3',
              name: 'Student User',
              email,
              roles: ['student'],
              avatar: 'https://ui-avatars.com/api/?name=Student+User',
            };
          }
          
          // Set the current role to the first role
          const currentRole = mockUser.roles[0];
          
          set({
            isAuthenticated: true,
            user: mockUser,
            token: 'mock-jwt-token',
            currentRole,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Invalid credentials');
        }
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          currentRole: null,
        });
      },
      
      checkAuth: async () => {
        // This is a mock implementation - replace with actual API call
        // In a real app, you would validate the token with your backend
        const { token } = get();
        
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }
        
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Token is valid in this mock implementation
        return get().isAuthenticated;
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

