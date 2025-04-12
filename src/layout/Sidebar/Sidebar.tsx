import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { menuConfig } from '@config/menuConfig';
import { useAuthStore } from '@store/index';
import { SidebarItem } from './SidebarItem';
import { alpha } from '@mui/material/styles';
import { Logo } from '@components/Logo';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const drawerWidth = 260;

export const Sidebar = ({ open, onClose, onToggle }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuthStore();

  const handleDrawerToggle = () => {
    if (isMobile) {
      onClose();
    } else {
      onToggle();
    }
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuConfig.filter(item => user && item.roles.includes(user.role));

  const drawer = (
    <>
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: !open ? 'center' : 'space-between',
          px: !open ? 1 : 3,
          borderBottom: '1px solid',
          borderColor: theme => alpha(theme.palette.primary.main, 0.1),
          background: theme => alpha(theme.palette.primary.main, 0.03),
        }}
      >
        {!open ? (
          <Logo showText={false} size={32} />
        ) : (
          <>
            <Logo horizontal size={32} />
            <IconButton
              onClick={handleDrawerToggle}
              size="small"
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  backgroundColor: theme => alpha(theme.palette.primary.main, 0.12),
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {!open ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ mx: !open ? 0 : 2, mb: 1, opacity: 0.6 }} />

      <List 
        component="nav" 
        sx={{ 
          px: !open ? 1 : 2,
          '& .MuiListItemButton-root': {
            borderRadius: 1.5,
            mb: 0.5,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
            },
          }
        }}
      >
        {filteredMenuItems.map(item => (
          <SidebarItem key={item.path} item={item} open={open} />
        ))}
      </List>

      {/* User profile moved to the bottom */}
      {open && user && (
        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ mx: !open ? 0 : 2, my: 1, opacity: 0.6 }} />
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              mx: 2,
              mb: 2,
              borderRadius: 1.5,
              bgcolor: theme => alpha(theme.palette.primary.main, 0.06),
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              },
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              variant="rounded"
              sx={{ 
                width: 36, 
                height: 36, 
                mr: 1.5,
                borderRadius: 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" noWrap fontWeight="600">
                {user.name}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                noWrap
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  opacity: 0.8,
                }}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: open ? drawerWidth : 72 }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 0,
              backgroundImage: 'none',
              boxShadow: theme.shadows[3],
              background: theme => alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        // Desktop drawer
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: !open ? 72 : drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.standard,
              }),
              overflowX: 'hidden',
              borderRight: 0,
              backgroundImage: 'none',
              boxShadow: theme.shadows[2],
              background: theme => alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};
