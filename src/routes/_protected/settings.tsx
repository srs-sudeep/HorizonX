import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { AuthGuard } from '@core/Private/AuthGuard';
import { UserRole } from '@/types/auth';
import { useUIStore } from '@store/index';

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsPage,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { themeMode, toggleTheme } = useUIStore();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // Simulate saving settings
    setTimeout(() => {
      setSaveSuccess(true);
    }, 500);
  };

  const handleCloseSnackbar = () => {
    setSaveSuccess(false);
  };

  return (
    <AuthGuard allowedRoles={[UserRole.ADMIN]}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your application settings and preferences
        </Typography>

        <Paper sx={{ mt: 3, borderRadius: '12px' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': { 
                minHeight: '64px',
                textTransform: 'none',
                fontWeight: 'medium'
              }
            }}
          >
            <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
            <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
            <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
            <Tab icon={<PaletteIcon />} label="Appearance" iconPosition="start" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  sx={{ width: 120, height: 120, mb: 2 }}
                  alt="User Avatar"
                  src="/assets/avatar.jpg"
                />
                <IconButton 
                  color="primary" 
                  aria-label="upload picture" 
                  component="label"
                  sx={{ mb: 2 }}
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCameraIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary" align="center">
                  Click to upload a new profile picture
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" defaultValue="John" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" defaultValue="Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" defaultValue="john.doe@example.com" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Job Title" defaultValue="Administrator" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Bio" multiline rows={4} defaultValue="System administrator with over 5 years of experience in managing enterprise applications." />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={3} maxWidth="md">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Enable two-factor authentication"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              When two-factor authentication is enabled, you'll be required to enter a secure, random code when you sign in.
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Email Notifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="System notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="New user registrations"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Order updates"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch />}
                  label="Marketing emails"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" gutterBottom>
              Push Notifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable push notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Critical alerts"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Theme
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={themeMode === 'dark'} 
                  onChange={toggleTheme} 
                />
              }
              label={`${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)} mode`}
            />
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" gutterBottom>
              Layout
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Compact sidebar"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch />}
                  label="Sticky header"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </AuthGuard>
  );
}
