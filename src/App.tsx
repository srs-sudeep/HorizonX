import { CssBaseline, GlobalStyles } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            scrollBehavior: 'smooth',
            overflowX: 'hidden',
          },
          ':root': {
            '--scrollbar-width': '8px',
            '--scrollbar-track': theme.palette.background.default,
            '--scrollbar-thumb': theme.palette.mode === 'light' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(255,255,255,0.2)',
          },
          '*::-webkit-scrollbar': {
            width: 'var(--scrollbar-width)',
            height: 'var(--scrollbar-width)',
          },
          '*::-webkit-scrollbar-track': {
            background: 'var(--scrollbar-track)',
          },
          '*::-webkit-scrollbar-thumb': {
            background: 'var(--scrollbar-thumb)',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'light' 
              ? 'rgba(0,0,0,0.3)' 
              : 'rgba(255,255,255,0.3)',
          },
          'a': {
            textDecoration: 'none',
            color: 'inherit',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          },
          '.animate-in': {
            animation: 'fadeIn 0.5s ease-in-out',
          },
          '.animate-up': {
            animation: 'fadeInUp 0.5s ease-in-out',
          },
          '.animate-scale': {
            animation: 'scaleIn 0.3s ease-in-out',
          },
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes scaleIn': {
            '0%': { opacity: 0, transform: 'scale(0.95)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
          '@keyframes fadeOut': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '100%': { opacity: 0, transform: 'scale(0.95)' },
          },
          // Add focus styles for better accessibility
          'a:focus, button:focus, input:focus, select:focus, textarea:focus': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
          // Add responsive typography adjustments
          [theme.breakpoints.down('sm')]: {
            'h1': { fontSize: '2rem' },
            'h2': { fontSize: '1.75rem' },
            'h3': { fontSize: '1.5rem' },
          },
        })}
      />
      {/* Rest of your app */}
    </>
  );
}
