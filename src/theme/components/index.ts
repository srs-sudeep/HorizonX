import type { Components, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MuiButton } from './MuiButton';

export const components: Components<Theme> = {
  MuiButton,
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-5px)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        transition: 'box-shadow 0.3s ease',
      },
      elevation1: {
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
      },
      elevation3: {
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        backgroundImage: theme =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))'
            : 'linear-gradient(to right, rgba(31, 41, 55, 0.95), rgba(31, 41, 55, 0.95))',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: 'none',
        boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.1)',
        backgroundImage: theme =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))'
            : 'linear-gradient(180deg, rgba(31, 41, 55, 0.95), rgba(31, 41, 55, 0.95))',
        backdropFilter: 'blur(10px)',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        margin: '4px 8px',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
          transform: 'translateX(3px)',
        },
        '&.Mui-selected': {
          backgroundColor: theme => alpha(theme.palette.primary.main, 0.12),
          '&:hover': {
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.18),
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '25%',
            height: '50%',
            width: 4,
            borderRadius: '0 4px 4px 0',
            backgroundColor: theme => theme.palette.primary.main,
          },
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          transition: 'all 0.2s ease',
          '&.Mui-focused': {
            boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => alpha(theme.palette.primary.main, 0.5),
            },
          },
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        border: theme => `2px solid ${theme.palette.background.paper}`,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 8,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
        fontSize: '0.75rem',
        padding: '8px 12px',
      },
    },
  },
};
