import { 
  AppBar, 
  Box, 
  Button, 
  Container, 
  Toolbar, 
  useTheme, 
  alpha,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useAuthStore, useUIStore } from '@store/index';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Logo } from '@components/Logo';

export const LandingNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useAuthStore();
  const { themeMode, toggleTheme } = useUIStore();
  
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.background.default, 0.8)
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo 
            horizontal={true} 
            size={32} 
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit" size="small">
              {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
            
            {isAuthenticated ? (
              <Button 
                component={Link}
                to={`/${user?.role}`}
                variant="contained"
                sx={{ 
                  borderRadius: '10px',
                  px: 2,
                  py: 1,
                  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
                  },
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="contained"
                sx={{ 
                  borderRadius: '10px',
                  px: 2,
                  py: 1,
                  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
