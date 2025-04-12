import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#4a6bff', // Enhanced primary color
          light: '#7a8fff',
          dark: '#3451d1',
        },
        secondary: {
          main: '#ff4a8d', // Enhanced secondary color
          light: '#ff7aa9',
          dark: '#d13868',
        },
        background: {
          default: '#f8fafd',
          paper: '#ffffff',
        },
        // Custom palette additions
        gradient: 'linear-gradient(135deg, var(--mui-palette-primary-light) 0%, var(--mui-palette-primary-main) 100%)',
        border: {
          subtle: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#7a8fff', // Enhanced primary for dark mode
          light: '#a1b0ff',
          dark: '#4a6bff',
        },
        secondary: {
          main: '#ff7aa9', // Enhanced secondary for dark mode
          light: '#ff9dc1',
          dark: '#ff4a8d',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        // Custom palette additions for dark mode
        gradient: 'linear-gradient(135deg, var(--mui-palette-primary-dark) 0%, var(--mui-palette-primary-main) 100%)',
        border: {
          subtle: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
    borderRadiusLarge: 16,
    borderRadiusXLarge: 24,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontWeight: 600, letterSpacing: '-0.0125em' },
    h4: { fontWeight: 600, letterSpacing: '-0.0125em' },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { fontWeight: 600 },
    subtitle1: { letterSpacing: '0.0075em' },
    subtitle2: { letterSpacing: '0.0075em' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          padding: '8px 16px',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(0,0,0,0.05)',
            },
          },
        },
      },
    },
  },
});
