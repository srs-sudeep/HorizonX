import type { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#6366f1', // Indigo 500 - Modern primary color
    light: '#818cf8', // Indigo 400
    dark: '#4f46e5', // Indigo 600
    contrastText: '#fff',
  },
  secondary: {
    main: '#8b5cf6', // Violet 500 - Complementary to primary
    light: '#a78bfa', // Violet 400
    dark: '#7c3aed', // Violet 600
    contrastText: '#fff',
  },
  success: {
    main: '#10b981', // Emerald 500 - Fresh green
    light: '#34d399', // Emerald 400
    dark: '#059669', // Emerald 600
    contrastText: '#fff',
  },
  error: {
    main: '#ef4444', // Red 500 - Vibrant red
    light: '#f87171', // Red 400
    dark: '#dc2626', // Red 600
    contrastText: '#fff',
  },
  warning: {
    main: '#f59e0b', // Amber 500 - Warm amber
    light: '#fbbf24', // Amber 400
    dark: '#d97706', // Amber 600
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#3b82f6', // Blue 500 - Clear blue
    light: '#60a5fa', // Blue 400
    dark: '#2563eb', // Blue 600
    contrastText: '#fff',
  },
  background: {
    default: '#f9fafb', // Gray 50 - Subtle off-white
    paper: '#ffffff',
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
    main: '#818cf8', // Indigo 400 - Brighter in dark mode
    light: '#a5b4fc', // Indigo 300
    dark: '#6366f1', // Indigo 500
    contrastText: '#fff',
  },
  secondary: {
    main: '#a78bfa', // Violet 400 - Brighter in dark mode
    light: '#c4b5fd', // Violet 300
    dark: '#8b5cf6', // Violet 500
    contrastText: '#fff',
  },
  success: {
    main: '#34d399', // Emerald 400 - Brighter in dark mode
    light: '#6ee7b7', // Emerald 300
    dark: '#10b981', // Emerald 500
    contrastText: '#fff',
  },
  error: {
    main: '#f87171', // Red 400 - Brighter in dark mode
    light: '#fca5a5', // Red 300
    dark: '#ef4444', // Red 500
    contrastText: '#fff',
  },
  warning: {
    main: '#fbbf24', // Amber 400 - Brighter in dark mode
    light: '#fcd34d', // Amber 300
    dark: '#f59e0b', // Amber 500
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#60a5fa', // Blue 400 - Brighter in dark mode
    light: '#93c5fd', // Blue 300
    dark: '#3b82f6', // Blue 500
    contrastText: '#fff',
  },
  background: {
    default: '#111827', // Gray 900 - Rich dark background
    paper: '#1f2937', // Gray 800 - Slightly lighter for cards
  },
  text: {
    primary: '#f9fafb', // Gray 50
    secondary: 'rgba(249, 250, 251, 0.7)', // Gray 50 with opacity
    disabled: 'rgba(249, 250, 251, 0.5)', // Gray 50 with opacity
  },
};
