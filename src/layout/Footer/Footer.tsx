import {
  Box,
  Container,
  Link as MuiLink,
  Typography,
  useTheme,
  Stack,
  IconButton,
} from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';
import { useUIStore } from '@store/index';

export const Footer = () => {
  const { sidebarOpen } = useUIStore();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        height: '50px',
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, md: sidebarOpen ? '260px' : '72px' },
        right: 0,
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        backgroundImage: theme =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))'
            : 'linear-gradient(to right, rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9))',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        transition: theme => theme.transitions.create(['left'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.standard,
        }),
        width: 'auto',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="caption"
            color="text.secondary"
            component="div"
            sx={{
              fontWeight: 500,
              letter: '0.02em',
            }}
          >
            © {currentYear}{' '}
            <MuiLink
              color="primary"
              href="/"
              underline="hover"
              variant="caption"
              sx={{ fontWeight: 600 }}
            >
              Horizon
            </MuiLink>
            {' - All rights reserved.'}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              color="primary"
              aria-label="GitHub"
              component="a"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              aria-label="Twitter"
              component="a"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              aria-label="LinkedIn"
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
