import type { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#4361ee', // Blue from the image
    light: '#6582f7',
    dark: '#2c41c2',
    contrastText: '#fff',
  },
  secondary: {
    main: '#3f37c9', // Darker blue for secondary actions
    light: '#6a5fdb',
    dark: '#2a2487',
    contrastText: '#fff',
  },
  success: {
    main: '#4cc9f0', // Light blue for success indicators
    light: '#7ad7f3',
    dark: '#0096c7',
    contrastText: '#fff',
  },
  error: {
    main: '#f72585', // Pink for error states
    light: '#f95fa3',
    dark: '#b5006b',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffbe0b', // Yellow for warnings
    light: '#ffce4f',
    dark: '#d69e00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#4cc9f0',
    light: '#7ad7f3',
    dark: '#0096c7',
    contrastText: '#fff',
  },
  background: {
    default: '#f8f9fa',
    paper: '#fff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4361ee', // Keep the same primary color for consistency
    light: '#6582f7',
    dark: '#2c41c2',
    contrastText: '#fff',
  },
  secondary: {
    main: '#3f37c9',
    light: '#6a5fdb',
    dark: '#2a2487',
    contrastText: '#fff',
  },
  success: {
    main: '#4cc9f0',
    light: '#7ad7f3',
    dark: '#0096c7',
    contrastText: '#fff',
  },
  error: {
    main: '#f72585',
    light: '#f95fa3',
    dark: '#b5006b',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffbe0b',
    light: '#ffce4f',
    dark: '#d69e00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#4cc9f0',
    light: '#7ad7f3',
    dark: '#0096c7',
    contrastText: '#fff',
  },
  background: {
    default: '#0f172a', // Dark blue background from the image
    paper: '#1e293b', // Slightly lighter blue for cards/paper elements
  },
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
};
