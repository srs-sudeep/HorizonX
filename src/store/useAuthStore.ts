import { getMe } from '@/api';
import { LoginResponse, UserRole, User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  currentRole: UserRole | null;
  refresh_token?: string;
  access_token?: string;
  isAuthenticated: boolean;

  setAuth: (creds: LoginResponse) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setCurrentRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentRole: null,
      isAuthenticated: false,
      access_token: undefined,
      refresh_token: undefined,

      setAuth: async creds => {
        set({
          access_token: creds.access_token,
          refresh_token: creds.refresh_token,
          isAuthenticated: false,
          user: null,
          currentRole: null,
        });
        const user = await getMe();
        set({
          user,
          currentRole: user.roles[0],
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          currentRole: null,
          isAuthenticated: false,
          access_token: undefined,
          refresh_token: undefined,
        });
      },

      checkAuth: async () => {
        try {
          const user = await getMe();
          set({ user, currentRole: user.roles[0], isAuthenticated: true });
        } catch {
          get().logout();
        }
      },

      setCurrentRole: (role: UserRole) => {
        set({ currentRole: role });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        currentRole: state.currentRole,
        isAuthenticated: state.isAuthenticated,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
    }
  )
);
