import { Box, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '@core/Private/AuthGuard';
import { UserRole } from '@/types/auth';

export const Route = createFileRoute('/_protected/manager/')({
  component: ManagerDashboard,
});

function ManagerDashboard() {
  const recentActivities = [
    { id: 1, activity: 'Project Alpha status updated', time: '2 hours ago' },
    {
      id: 2,
      activity: 'New team member added to Project Beta',
      time: '4 hours ago',
    },
    {
      id: 3,
      activity: 'Client meeting scheduled for Project Gamma',
      time: '1 day ago',
    },
    {
      id: 4,
      activity: 'Budget approved for Project Delta',
      time: '2 days ago',
    },
  ];

  return (
    <AuthGuard allowedRoles={[UserRole.MANAGER]}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Manager Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Welcome to the manager dashboard. Monitor your team and projects from here.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <Typography variant="h3">16</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Active team members
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
              }}
            >
              <Typography variant="h6" gutterBottom>
                Projects
              </Typography>
              <Typography variant="h3">8</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
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
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tasks
              </Typography>
              <Typography variant="h3">42</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Pending tasks
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
              }}
            >
              <Typography variant="h6" gutterBottom>
                Completion
              </Typography>
              <Typography variant="h3">68%</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                Overall progress
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemText primary={activity.activity} secondary={activity.time} />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Deadlines
              </Typography>
              <List>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText primary="Project Alpha Phase 1" secondary="Due in 2 days" />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText primary="Project Beta Milestone" secondary="Due in 5 days" />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText primary="Quarterly Report" secondary="Due in 1 week" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AuthGuard>
  );
}
