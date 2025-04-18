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
import { useState, useEffect } from 'react';
import { GuestGuard } from "@core/Private/GuestGuard";
import { useAuth } from '@hooks/useAuth';

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [animationClass, setAnimationClass] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Add animation when component mounts
  useEffect(() => {
    setAnimationClass('animate-scale');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    setError(null);

    const { confirmPassword, ...credentials } = formData;
    
    register(credentials, {
      onSuccess: () => {
        navigate({ to: '/login', search: { registered: 'true' } });
      }
    });
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add exit animation before navigating
    setAnimationClass('animate-fade-out');
    setTimeout(() => {
      navigate({ to: '/login' });
    }, 300);
  };

  return (
    <GuestGuard>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
          position: 'relative',
          padding: 0, // Remove padding
        }}
      >
        <Container component="main" sx={{ padding: 0 }}> {/* Change to lg and remove padding */}
          <Paper
            elevation={3}
            className={animationClass}
            sx={{
              display: 'flex',
              borderRadius: 5,
              overflow: 'hidden',
              maxHeight: '100vh', // Full height
              boxShadow: 'none', // Remove shadow for full page look
              '&.animate-scale': {
                animation: 'scaleIn 0.4s ease-in-out forwards',
              },
              '&.animate-fade-out': {
                animation: 'fadeOut 0.3s ease-in-out forwards',
              },
            }}
          >
            {/* Left side - Brand/Image */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                background: 'linear-gradient(135deg, #3a8eff 0%, #1565c0 100%)',
                color: 'white',
                p: 6,
                position: 'relative',
                overflow: 'hidden', // Ensure image doesn't overflow
              }}
            >
              {/* Background image that covers the entire left side */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(74, 107, 255, 0.85) 0%, rgba(122, 143, 255, 0.9) 100%)',
                    zIndex: 2,
                  }
                }}
              />
              
              {/* Content on top of the image */}
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3, position: 'relative', zIndex: 3, color: 'white' }}>
                HorizonX
              </Typography>
              <Typography variant="h6" sx={{ mb: 5, textAlign: 'center', position: 'relative', zIndex: 3, color: 'white' }}>
                Join our platform and streamline your business operations
              </Typography>
            </Box>

            {/* Right side - Form */}
            <Box
              sx={{
                width: { xs: '100%', md: '55%' },
                p: { xs: 3, sm: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'white',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
                <Typography component="h1" variant="h4" fontWeight="bold" color="primary.main" sx={{ mb: 1 }}>
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get started with Horizon
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                  sx={{ 
                    mt: 4, 
                    mb: 3,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 'medium',
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 20px rgba(21, 101, 192, 0.25)',
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" sx={{ display: 'inline' }}>
                      Already have an account?{' '}
                    </Typography>
                    <Link
                      to="/login"
                      onClick={handleLoginClick}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography variant="body2" color="primary" sx={{ display: 'inline', fontWeight: 'medium' }}>
                        Sign In
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </GuestGuard>
  );
}
