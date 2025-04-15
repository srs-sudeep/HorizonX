import {
  BarChart,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Help,
  Mail,
  Notifications,
  People,
  Person,
  Settings,
  ShoppingCart,
  Store as StoreIcon,
  BarChart as AnalyticsIcon,
  Business as CrmIcon,
} from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Tooltip,
  Box,
  Typography,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuthStore } from '@store/index';

interface SidebarItemProps {
  item: {
    path: string;
    label: string;
    icon?: string;
    dynamicPath?: boolean;
    children?: Array<{
      path: string;
      label: string;
      icon?: string;
    }>;
  };
  open: boolean;
}

// Map of icon names to icon components
const iconMap: Record<string, React.ElementType> = {
  dashboard: Dashboard,
  people: People,
  settings: Settings,
  chart: BarChart,
  person: Person,
  cart: ShoppingCart,
  notifications: Notifications,
  mail: Mail,
  help: Help,
  store: StoreIcon,
  analytics: AnalyticsIcon,
  crm: CrmIcon,
};

export const SidebarItem = ({ item, open }: SidebarItemProps) => {
  const theme = useTheme();
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const matchRoute = useMatchRoute();
  const { user } = useAuthStore();
  
  // Resolve dynamic paths based on user role
  const resolvedPath = item.dynamicPath && user 
    ? item.path.replace(':role', user.role || '')
    : item.path;
  
  // Check if current route matches this item's path
  // For dynamic paths, we need to check against the resolved path
  const isActive = Boolean(matchRoute({ 
    to: resolvedPath,
    fuzzy: true 
  }));

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setSubMenuOpen(!isSubMenuOpen);
    }
  };

  // Get the icon component from the map, or use Dashboard as default
  const IconComponent = item.icon && iconMap[item.icon] ? iconMap[item.icon] : Dashboard;

  const listItemButton = (
    <ListItemButton
      component={hasChildren ? 'div' : Link}
      to={hasChildren ? undefined : resolvedPath}
      onClick={handleClick}
      selected={isActive}
      disableRipple
      sx={{
        minHeight: 44,
        borderRadius: 1.5,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        py: 0.75,
        mb: 0.5,
        color: isActive ? theme => theme.palette.primary.dark : 'text.primary',
        backgroundColor: isActive ? theme => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          backgroundColor: theme => alpha(theme.palette.primary.main, isActive ? 0.12 : 0.06),
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {/* Show tooltip only when sidebar is closed */}
      <Tooltip title={!open ? item.label : ''} placement="right">
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 2 : 0,
            justifyContent: 'center',
            color: isActive ? theme => theme.palette.primary.dark : 'inherit',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <SvgIcon 
            component={IconComponent} 
            fontSize="small"
            sx={{
              transition: 'transform 0.2s ease-in-out',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </ListItemIcon>
      </Tooltip>

      {/* Only render text and expand icons when sidebar is open */}
      {open && (
        <>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                color="inherit"
                noWrap
                component="span"
                sx={{ fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </Typography>
            }
            primaryTypographyProps={{
              variant: 'body2',
              noWrap: true,
            }}
          />
          {hasChildren && (
            <Box sx={{ color: 'inherit', ml: 1 }}>
              {isSubMenuOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Box>
          )}
        </>
      )}
    </ListItemButton>
  );

  return (
    <>
      {listItemButton}
      {hasChildren && open && (
        <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ mt: 0.5, pl: 2 }}>
            {item.children?.map(child => {
              const ChildIconComponent =
                child.icon && iconMap[child.icon] ? iconMap[child.icon] : undefined;

              const isChildActive = Boolean(matchRoute({ to: child.path }));

              return (
                <ListItemButton
                  key={child.path}
                  component={Link}
                  to={child.path}
                  selected={isChildActive}
                  disableRipple
                  sx={{
                    pl: 2,
                    py: 0.5,
                    my: 0.5,
                    borderRadius: 1,
                    color: isChildActive
                      ? theme.palette.primary.dark
                      : theme.palette.text.secondary,
                    bgcolor: isChildActive
                      ? alpha(theme.palette.primary.main, 0.08)
                      : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                    },
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                      },
                    },
                  }}
                >
                  {ChildIconComponent && (
                    <ListItemIcon
                      sx={{
                        minWidth: 24,
                        mr: 1,
                        color: isChildActive ? theme.palette.primary.dark : 'inherit',
                      }}
                    >
                      <SvgIcon component={ChildIconComponent} fontSize="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        component="span"
                        sx={{ fontWeight: isChildActive ? 600 : 400 }}
                      >
                        {child.label}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      variant: 'body2',
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};
