import { Box, CssBaseline, Toolbar, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useAuthStore, useUIStore } from '@store/index';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LoadingAnimation } from '~/components/LoadingAnimation/LoadingAnimation';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Header onToggleSidebar={toggleSidebar} />

      {isAuthenticated && (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={toggleSidebar}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          width: '100%',
          position: 'relative',
          pb: '60px', // Add padding to account for fixed footer
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, py: 2, position: 'relative' }}>
          {loading ? (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingAnimation size="large" text="Loading content..." />
            </Box>
          ) : (
            children
          )}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

