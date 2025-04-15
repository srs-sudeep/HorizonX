import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  alpha, 
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@store/index';
import { 
  Speed as SpeedIcon, 
  Security as SecurityIcon, 
  Devices as DevicesIcon, 
  Analytics as AnalyticsIcon 
} from '@mui/icons-material';

export const LandingPage = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <Box sx={{ 
      background: theme => theme.palette.mode === 'light' 
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`
        : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`,
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          sx={{ 
            py: 8,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Chip 
                label="New Features Available" 
                color="primary" 
                size="small" 
                sx={{ mb: 2, fontWeight: 'bold' }} 
              />
              <Typography 
                variant="h1" 
                component="h1" 
                fontWeight="900"
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                HorizonX Dashboard
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: 500, lineHeight: 1.6 }}
              >
                Your complete solution for modern web applications with powerful analytics, customizable dashboards, and real-time data visualization.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {isAuthenticated ? (
                  <Button 
                    component={Link}
                    to={`/${user?.role}`}
                    variant="contained" 
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                      }
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      component={Link}
                      to="/login"
                      variant="contained" 
                      size="large"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: 2,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    <Button 
                      component={Link}
                      to="/register"
                      variant="outlined" 
                      size="large"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.15)}`,
                        }
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
              
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Trusted by leading companies worldwide
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
                    <Typography 
                      key={company} 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.7, 
                        fontWeight: 'bold',
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                      }}
                    >
                      {company}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={6} 
            sx={{ 
              display: { 
                xs: 'none', 
                md: 'flex' 
              },
              maxWidth: 500,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
                alt="Dashboard in action"
                sx={{ 
                  width: '100%',
                  maxWidth: 550,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                  borderRadius: 4,
                  filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.2))',
                  }
                }}
              />
              
              {/* Floating elements for visual interest */}
              <Box 
                sx={{
                  position: 'absolute',
                  top: '10%',
                  right: '5%',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  zIndex: 2,
                }}
              >
                <Typography variant="h6" color="white" fontWeight="bold">
                  +85%
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -20, 
                  right: -20, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: alpha(theme.palette.secondary.main, 0.2),
                  filter: 'blur(40px)',
                  zIndex: -1
                }} 
              />
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 40, 
                  left: 20, 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  background: alpha(theme.palette.primary.main, 0.15),
                  filter: 'blur(50px)',
                  zIndex: -1
                }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* New Image Showcase Section */}
      <Box sx={{ py: 8, background: alpha(theme.palette.background.default, 0.7) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Visualize Your Data
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Beautiful dashboards that transform complex data into actionable insights
            </Typography>
          </Box>
          
          <Box sx={{ 
            position: 'relative', 
            borderRadius: 4, 
            overflow: 'hidden',
            boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
            mb: 4
          }}>
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
              alt="Dashboard Analytics Visualization"
              sx={{ 
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
            <Box sx={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.8)}, transparent)`,
            }}>
              <Typography variant="h5" color="white" fontWeight="bold">
                Interactive Analytics Dashboard
              </Typography>
              <Typography variant="body1" color={alpha(theme.palette.common.white, 0.8)}>
                Real-time data visualization with customizable widgets
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, background: alpha(theme.palette.background.paper, 0.5) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Powerful Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Everything you need to build and manage your applications efficiently
            </Typography>
          </Box>
          
          <Grid container spacing={4} alignItems="stretch">
            {[
              { 
                icon: <SpeedIcon fontSize="large" color="primary" />, 
                title: 'Lightning Fast', 
                description: 'Optimized performance with real-time data processing and minimal latency' 
              },
              { 
                icon: <SecurityIcon fontSize="large" color="primary" />, 
                title: 'Enterprise Security', 
                description: 'Advanced security features with role-based access control and data encryption' 
              },
              { 
                icon: <DevicesIcon fontSize="large" color="primary" />, 
                title: 'Responsive Design', 
                description: 'Perfect experience across all devices with adaptive layouts' 
              },
              { 
                icon: <AnalyticsIcon fontSize="large" color="primary" />, 
                title: 'Advanced Analytics', 
                description: 'Comprehensive data visualization with customizable dashboards' 
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ maxWidth: 500 }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                      borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, background: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              What Our Clients Say
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Discover why businesses trust Horizon for their dashboard needs
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              { 
                name: 'Sarah Johnson', 
                role: 'CTO at TechCorp', 
                avatar: '/assets/images/avatar1.jpg',
                content: 'Horizon has transformed how we manage our applications. The intuitive interface and powerful features have significantly improved our workflow.' 
              },
              { 
                name: 'Michael Chen', 
                role: 'Lead Developer at StartupX', 
                avatar: '/assets/images/avatar2.jpg',
                content: 'The dashboard analytics are incredible. We can now make data-driven decisions faster than ever before. Highly recommended!' 
              },
              { 
                name: 'Emily Rodriguez', 
                role: 'Product Manager at EnterpriseY', 
                avatar: '/assets/images/avatar3.jpg',
                content: 'The customization options are endless. We were able to tailor the dashboard exactly to our needs with minimal effort.' 
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    borderRadius: 4,
                    p: 2,
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 10, background: alpha(theme.palette.background.default, 0.7) }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Find answers to common questions about Horizon Dashboard
            </Typography>
          </Box>
          
          {[
            {
              question: 'How do I get started with Horizon?',
              answer: 'Getting started is easy! Simply register for an account, and you\'ll have immediate access to your dashboard. Our intuitive onboarding process will guide you through the initial setup.'
            },
            {
              question: 'Is there a free trial available?',
              answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.'
            },
            {
              question: 'Can I customize the dashboard to match my brand?',
              answer: 'Absolutely! Horizon offers extensive customization options including themes, layouts, and branding elements to ensure the dashboard reflects your company identity.'
            },
            {
              question: 'What kind of support do you offer?',
              answer: 'We provide 24/7 customer support via email and chat. Enterprise plans include dedicated support representatives and priority response times.'
            }
          ].map((faq, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.05)}`
                }
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {faq.question}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </Paper>
          ))}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, background: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.8)})`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: -50, 
                right: -50, 
                width: 200, 
                height: 200, 
                borderRadius: '50%', 
                background: alpha('#ffffff', 0.1),
                zIndex: 0
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: -30, 
                left: -30, 
                width: 150, 
                height: 150, 
                borderRadius: '50%', 
                background: alpha('#ffffff', 0.1),
                zIndex: 0
              }} 
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight="bold"
                color="white"
                sx={{ mb: 2 }}
              >
                Ready to Get Started?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ mb: 4, color: alpha('#fff', 0.9), maxWidth: 600, mx: 'auto' }}
              >
                Join thousands of companies already using Horizon Dashboard
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button 
                  component={Link}
                  to="/register"
                  variant="contained" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#ffffff',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.9),
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 25px ${alpha('#000000', 0.2)}`,
                    }
                  }}
                >
                  Create Free Account
                </Button>
                <Button 
                  component={Link}
                  to="/login"
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    '&:hover': {
                      borderColor: '#ffffff',
                      bgcolor: alpha('#ffffff', 0.1),
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-around">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                HorizonX
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
                Your complete dashboard solution for modern web applications with powerful analytics and real-time data visualization.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} Horizon. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Product
                  </Typography>
                  <Stack spacing={1}>
                    {['Features', 'Pricing', 'Testimonials', 'FAQ'].map(item => (
                      <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Company
                  </Typography>
                  <Stack spacing={1}>
                    {['About Us', 'Careers', 'Blog', 'Press'].map(item => (
                      <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Legal
                  </Typography>
                  <Stack spacing={1}>
                    {['Terms', 'Privacy', 'Cookies', 'Sitemap'].map(item => (
                      <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Resources
                  </Typography>
                  <Stack spacing={1}>
                    {['Documentation', 'Tutorials', 'API Reference', 'Support'].map(item => (
                      <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Horizon Dashboard. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={2}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <Typography key={item} variant="caption" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
