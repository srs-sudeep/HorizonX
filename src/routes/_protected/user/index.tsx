import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '../../../core/common';
import { UserRole } from '../../../types';

export const Route = createFileRoute('/_protected/user/')({
  component: UserDashboard,
});

function UserDashboard() {
  return (
    <AuthGuard allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.USER]}>
      <Box>
        <Typography variant="h4" gutterBottom>
          User Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Welcome to your personal dashboard. View your tasks and activities here.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                My Tasks
              </Typography>
              <Typography variant="h3">7</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Pending tasks
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h3">12</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Tasks completed this month
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Typography variant="h3">3</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Unread notifications
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            My Projects
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>}
                  title="Project Alpha"
                  subheader="In Progress"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Frontend development for the new customer portal. Implementing responsive design
                    and user authentication.
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip label="React" size="small" />
                    <Chip label="TypeScript" size="small" />
                    <Chip label="Frontend" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>}
                  title="Project Beta"
                  subheader="Planning"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    API integration with third-party services. Implementing secure data exchange and
                    error handling.
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip label="API" size="small" />
                    <Chip label="Backend" size="small" />
                    <Chip label="Security" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Recent Activity
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2">Task Completed</Typography>
              <Typography variant="body2" color="text.secondary">
                You completed the task "Update user documentation" 2 hours ago.
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2">New Task Assigned</Typography>
              <Typography variant="body2" color="text.secondary">
                You were assigned a new task "Implement login page" 1 day ago.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Comment Added</Typography>
              <Typography variant="body2" color="text.secondary">
                You commented on "API Documentation" 2 days ago.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </AuthGuard>
  );
}

