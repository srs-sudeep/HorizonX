import type { Components, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: 10,
      textTransform: 'none',
      fontWeight: 600,
      transition: 'all 0.2s ease-in-out',
      '&:active': {
        transform: 'scale(0.98)',
      },
    },
    contained: {
      boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
      '&:hover': {
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-1px)',
      },
    },
    outlined: {
      borderWidth: '1.5px',
      '&:hover': {
        borderWidth: '1.5px',
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.04),
      },
    },
    text: {
      '&:hover': {
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.04),
        transform: 'translateY(-1px)',
      },
    },
    sizeLarge: {
      padding: '12px 28px',
      fontSize: '1rem',
    },
    sizeMedium: {
      padding: '8px 20px',
    },
    sizeSmall: {
      padding: '4px 12px',
    },
  },
};
