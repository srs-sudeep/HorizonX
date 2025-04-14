import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { GuestGuard } from "@core/Private/GuestGuard";
import { useAuth } from '@hooks/useAuth';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  // We'll handle the return URL manually
  const returnUrl = '/';
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    login({ email, password }, {
      onSuccess: () => {
        // Add a small delay to ensure state is updated before navigation
        setTimeout(() => {
          navigate({ to: returnUrl || '/' });
        }, 100);
      }
    });
  };

  return (
    <GuestGuard>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 'var(--mui-shape-borderRadiusLarge)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: 'var(--mui-palette-gradient)',
              },
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold" color="primary">
              Horizon
            </Typography>
            <Typography component="h2" variant="h5" sx={{ mt: 2 }}>
              Sign in
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    disabled={isLoading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundImage: 'var(--mui-palette-gradient)',
                  color: '#fff',
                  boxShadow: '0 8px 16px rgba(74, 107, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundImage: 'var(--mui-palette-gradient)',
                    boxShadow: '0 12px 20px rgba(74, 107, 255, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                <Typography variant="body2">
                  <Link to="#" style={{ color: 'var(--mui-palette-primary-main)', textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link to="/register" style={{ color: 'var(--mui-palette-primary-main)', textDecoration: 'none' }}>
                    Don't have an account? Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Demo Credentials:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" display="block">
                Admin: admin@horizon.com / admin123
              </Typography>
              <Typography variant="caption" display="block">
                Manager: manager@horizon.com / manager123
              </Typography>
              <Typography variant="caption" display="block">
                User: user@horizon.com / user123
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </GuestGuard>
  );
}
