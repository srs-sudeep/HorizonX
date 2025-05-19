import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/api/authApi';

export type UserRole = 'admin' | 'teacher' | 'student' | 'librarian' | 'medical';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
  currentRole?: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  currentRole: UserRole | null;

  // Actions
  login: (email: string, password: string) => Promise<User | null>;
  loginWithUser: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setCurrentRole: (role: UserRole) => Promise<void>;
  refreshTokens: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      currentRole: null,

      login: async (email, password) => {
        try {
          const { user, accessToken, refreshToken } = await authApi.login(email, password);

          set({
            isAuthenticated: true,
            user,
            accessToken,
            refreshToken,
            currentRole: user.currentRole || user.roles[0],
          });

          return user;
        } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Invalid credentials');
        }
      },

      loginWithUser: (user, accessToken, refreshToken) => {
        const currentRole = user.currentRole || user.roles[0];

        set({
          isAuthenticated: true,
          user,
          accessToken,
          refreshToken,
          currentRole,
        });
      },

      logout: () => {
        authApi.logout().then(() => {
          set({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
            currentRole: null,
          });
        });
      },

      checkAuth: async () => {
        const { accessToken, refreshToken } = get();
        if (!accessToken) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        if (!refreshToken) {
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
              currentRole: user.currentRole || user.roles[0],
              // Note: getCurrentUser already refreshes tokens if needed
              accessToken: localStorage.getItem('auth-access-token'),
              refreshToken: localStorage.getItem('auth-refresh-token'),
            });
            return true;
          } else {
            set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null });
            return false;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null });
          return false;
        }
      },

      refreshTokens: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          return false;
        }

        try {
          const tokens = await authApi.refreshToken(refreshToken);
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null });
          return false;
        }
      },

      setCurrentRole: async role => {
        const { user, accessToken } = get();

        // Ensure the user has this role
        if (user && user.roles.includes(role) && accessToken) {
          try {
            // Call API to change role and get new tokens
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
              await authApi.changeRole(accessToken, role);

            // Update both currentRole and user.currentRole to ensure consistency
            set({
              currentRole: role,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              user: {
                ...user,
                currentRole: role,
              },
            });
          } catch (error) {
            console.error('Role change failed:', error);
          }
        } else {
          console.error('User does not have the specified role or no access token');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        currentRole: state.currentRole,
      }),
    }
  )
);
