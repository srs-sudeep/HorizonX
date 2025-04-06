import { Box, Grid, Paper, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '@core/Private/AuthGuard';
import { UserRole } from '@/types/auth';

export const Route = createFileRoute('/_protected/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AuthGuard allowedRoles={[UserRole.ADMIN]}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Welcome to the admin dashboard. Manage your system from here.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'primary.light',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Users
              </Typography>
              <Typography variant="h3">128</Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Total registered users
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'secondary.light',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Managers
              </Typography>
              <Typography variant="h3">12</Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Active managers
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'success.light',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Projects
              </Typography>
              <Typography variant="h3">24</Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Active projects
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'warning.light',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tasks
              </Typography>
              <Typography variant="h3">156</Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Pending tasks
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AuthGuard>
  );
}
