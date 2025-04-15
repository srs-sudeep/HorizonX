import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet, useRouter } from '@tanstack/react-router';
import { useUIStore } from '@store/index';
import { darkTheme, lightTheme } from '@/theme';
import { LandingNavbar } from './LandingNavbar';

export const LandingLayout = () => {
  const { themeMode } = useUIStore();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();
  
  // Check if current route is an authentication route (login or register)
  const isAuthRoute = 
    router.state.location.pathname === '/login' || 
    router.state.location.pathname === '/register';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!isAuthRoute && <LandingNavbar />}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
