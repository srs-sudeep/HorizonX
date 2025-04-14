import { createFileRoute } from '@tanstack/react-router';
import { Box, Card, CardContent, Grid, Typography, Paper, Tabs, Tab, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar, Chip, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useAnalyticsData } from '@hooks/useAnalyticsData';
import { TrendingUp, TrendingDown, Language, DeviceHub, Public, Computer, Smartphone, Tablet } from '@mui/icons-material';

export const Route = createFileRoute('/_protected/analytics')({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useAnalyticsData();
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Analytics
      </Typography>
      
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        sx={{ mb: 3 }}
        TabIndicatorProps={{
          style: {
            height: 3,
            borderRadius: '3px 3px 0 0'
          }
        }}
      >
        <Tab label="Overview" />
        <Tab label="Traffic" />
        <Tab label="Engagement" />
        <Tab label="Conversion" />
      </Tabs>
      
      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.2 }}>
              <Language sx={{ fontSize: 60, color: 'primary.main' }} />
            </Box>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                Page Views
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {isLoading ? '...' : data?.pageViews.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 16 }} />
                <Typography variant="body2" color="success.main">
                  +18% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.2 }}>
              <Public sx={{ fontSize: 60, color: 'info.main' }} />
            </Box>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                Unique Visitors
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {isLoading ? '...' : data?.uniqueVisitors.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 16 }} />
                <Typography variant="body2" color="success.main">
                  +7% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.2 }}>
              <TrendingDown sx={{ fontSize: 60, color: 'error.main' }} />
            </Box>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                Bounce Rate
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {isLoading ? '...' : data?.bounceRate + '%'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDown sx={{ color: 'error.main', mr: 0.5, fontSize: 16 }} />
                <Typography variant="body2" color="error.main">
                  +2% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.2 }}>
              <DeviceHub sx={{ fontSize: 60, color: 'success.main' }} />
            </Box>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                Avg. Session Duration
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {isLoading ? '...' : data?.avgSessionDuration}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 16 }} />
                <Typography variant="body2" color="success.main">
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: 400,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Traffic Overview
              </Typography>
              <Box>
                <Chip label="Weekly" size="small" sx={{ mr: 1 }} />
                <Chip label="Monthly" size="small" variant="outlined" />
              </Box>
            </Box>
            <Box sx={{ height: 330, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading ? (
                <LinearProgress sx={{ width: '100%' }} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Traffic chart will be displayed here
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Device Distribution */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Device Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Computer sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {isLoading ? '...' : data?.deviceDistribution?.desktop + '%'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Desktop
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Smartphone sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {isLoading ? '...' : data?.deviceDistribution?.mobile + '%'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mobile
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Tablet sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {isLoading ? '...' : data?.deviceDistribution?.tablet + '%'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tablet
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Top Pages */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Top Pages
            </Typography>
            <List>
              {isLoading ? (
                <LinearProgress />
              ) : (
                data?.topPages?.map((page, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${index < 3 ? 'primary' : 'grey'}.${index < 3 ? 'main' : '200'}` }}>
                        {index + 1}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={page.url} 
                      secondary={`${page.views.toLocaleString()} views`} 
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
