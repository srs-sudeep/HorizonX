import type { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: [
    'Plus Jakarta Sans', // Modern, clean font
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontWeight: 800, // Extra bold for headings
    fontSize: '2.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em', // Tighter letter spacing for headings
  },
  h2: {
    fontWeight: 800,
    fontSize: '2.25rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.875rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.2,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.2,
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.01em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6, // Improved readability with increased line height
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  button: {
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    textTransform: 'none',
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: 2.66,
    textTransform: 'uppercase',
    letterSpacing: '0.08em', // Wider letter spacing for overline text
  },
};
