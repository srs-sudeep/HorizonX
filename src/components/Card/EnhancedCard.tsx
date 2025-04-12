import { Card, CardContent, CardHeader, CardProps, Typography, Box, alpha, useTheme } from '@mui/material';
import React from 'react';

interface EnhancedCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  gradient?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  elevated?: boolean;
}

export const EnhancedCard = ({ 
  title, 
  subtitle, 
  icon, 
  action, 
  gradient = false,
  hoverable = false,
  bordered = false,
  elevated = true,
  children, 
  sx, 
  ...rest 
}: EnhancedCardProps) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        borderRadius: theme.shape.borderRadiusLarge,
        transition: 'all 0.3s ease',
        boxShadow: elevated ? `0 4px 20px 0 ${alpha(theme.palette.mode === 'light' ? '#000' : '#fff', 0.05)}` : 'none',
        ...(bordered && {
          border: `1px solid ${theme.vars.palette.border.subtle}`,
        }),
        ...(hoverable && {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 24px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }),
        ...(gradient && {
          background: theme.vars.palette.gradient,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        }),
        ...sx 
      }}
      {...rest}
    >
      {(title || icon || action) && (
        <CardHeader
          title={
            title && (
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
            )
          }
          subheader={
            subtitle && (
              <Typography variant="body2" color={gradient ? 'inherit' : 'text.secondary'} sx={{ opacity: gradient ? 0.8 : 1 }}>
                {subtitle}
              </Typography>
            )
          }
          avatar={icon && (
            <Box 
              sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: gradient 
                  ? alpha('#fff', 0.2) 
                  : alpha(theme.palette.primary.main, 0.1),
                color: gradient ? '#fff' : theme.palette.primary.main
              }}
            >
              {icon}
            </Box>
          )}
          action={action}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
