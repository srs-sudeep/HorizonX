import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'teacher' | 'student' | 'librarian' | 'medical';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  currentRole: UserRole | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setCurrentRole: (role: UserRole) => void;
  updateUser: (userData: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      currentRole: null,
      token: null,
      
      login: (user, token) => set({
        isAuthenticated: true,
        user,
        token,
        currentRole: user.roles.length > 0 ? user.roles[0] : null
      }),
      
      logout: () => set({
        isAuthenticated: false,
        user: null,
        currentRole: null,
        token: null
      }),
      
      setCurrentRole: (role) => set((state) => {
        if (!state.user || !state.user.roles.includes(role)) {
          return state;
        }
        return { ...state, currentRole: role };
      }),
      
      updateUser: (userData) => set((state) => {
        if (!state.user) return state;
        
        const updatedUser = { ...state.user, ...userData };
        
        // If roles were updated and current role is no longer valid, reset it
        let currentRole = state.currentRole;
        if (userData.roles && !userData.roles.includes(state.currentRole as UserRole)) {
          currentRole = userData.roles.length > 0 ? userData.roles[0] : null;
        }
        
        return {
          ...state,
          user: updatedUser,
          currentRole
        };
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        currentRole: state.currentRole,
        token: state.token
      })
    }
  )
);

export default useAuthStore;

