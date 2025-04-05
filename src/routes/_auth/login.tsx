import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { GuestGuard } from '../../core/common';
import { useAuthStore } from '../../store';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  // We'll handle the return URL manually
  const returnUrl = '/';
  const { login, isLoading, error } = useAuthStore();

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

    try {
      await login({ email, password });
      navigate({ to: returnUrl || '/' });
    } catch (error) {
      console.error('Login failed:', error);
    }
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
              borderRadius: 2,
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2">
                  <a href="#">Forgot password?</a>
                </Typography>
                <Typography variant="body2">
                  <a href="/register">Don't have an account? Sign Up</a>
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
