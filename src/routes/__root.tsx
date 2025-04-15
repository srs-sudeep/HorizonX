import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useUIStore, useAuthStore } from '@store/index';
import { darkTheme, lightTheme } from '@/theme';
import { Layout } from '@/layout/Layout';
import { LandingLayout } from '@components/LandingPage/LandingLayout';
import { queryClient } from '@/lib/react-query';

export const Route = createRootRoute({
  component: () => {
    const { themeMode } = useUIStore();
    const { isAuthenticated } = useAuthStore();
    const theme = themeMode === 'dark' ? darkTheme : lightTheme;
    const currentPath = window.location.pathname;
    
    // Check if current route is an authentication route (login or register)
    const isAuthRoute = currentPath === '/login' || currentPath === '/register';
    
    // Use landing layout for home page and for auth routes
    const useLandingLayout = (currentPath === '/') || isAuthRoute;

    return (
      <QueryClientProvider client={queryClient}>
        {useLandingLayout ? (
          <LandingLayout />
        ) : (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Outlet />
            </Layout>
          </ThemeProvider>
        )}
        {/* Development tools */}
        <TanStackRouterDevtools />
      </QueryClientProvider>
    );
  },
});
