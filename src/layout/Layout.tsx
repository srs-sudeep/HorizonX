import { Box, CssBaseline, Toolbar, CircularProgress, useTheme } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '@store/index';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LoadingAnimation } from '@components/LoadingAnimation/LoadingAnimation';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const router = useRouter();

  // Check if current route is an authentication route (login or register)
  const isAuthRoute =
    router.state.location.pathname === '/login' || router.state.location.pathname === '/register';

  // Reset loading state when authentication state changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Shorter loading time for better UX

    return () => clearTimeout(timer);
  }, [isAuthenticated, router.state.location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: theme =>
          theme.palette.mode === 'light'
            ? `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.background.paper})`
            : `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
      }}
    >
      {/* Don't render Header and Sidebar for auth routes */}
      {!isAuthRoute && (
        <>
          <Header onToggleSidebar={toggleSidebar} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onToggle={toggleSidebar} />
        </>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${sidebarOpen ? 260 : 72}px)` },
          ml: { xs: 0, md: sidebarOpen ? '30px' : '60px' }, // Keep original values
          transition: theme => theme.transitions.create(['width', 'margin-left'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standard,
          }),
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {!isAuthRoute && <Toolbar />} {/* Spacer for fixed header */}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <LoadingAnimation />
          </Box>
        ) : (
          <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>{children}</Box>
        )}
        
        {!isAuthRoute && <Footer />}
      </Box>
    </Box>
  );
};
