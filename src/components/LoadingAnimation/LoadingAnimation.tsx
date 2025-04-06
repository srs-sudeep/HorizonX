import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LoadingAnimationProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullPage?: boolean;
}

export const LoadingAnimation = ({
  size = 'medium',
  text = 'Loading...',
  fullPage = false,
}: LoadingAnimationProps) => {
  const theme = useTheme();
  
  // Determine the size of the circular progress
  const progressSize = {
    small: 24,
    medium: 40,
    large: 60,
  }[size];
  
  // Determine the thickness of the circular progress
  const thickness = {
    small: 3,
    medium: 4,
    large: 5,
  }[size];
  
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress
        size={progressSize}
        thickness={thickness}
        sx={{
          color: theme.palette.primary.main,
          animationDuration: '1.2s',
        }}
      />
      {text && (
        <Typography
          variant={size === 'small' ? 'caption' : 'body2'}
          color="text.secondary"
        >
          {text}
        </Typography>
      )}
    </Box>
  );
  
  // If fullPage is true, center the loading animation on the page
  if (fullPage) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(0, 0, 0, 0.7)',
          zIndex: theme.zIndex.modal + 1,
        }}
      >
        {content}
      </Box>
    );
  }
  
  return content;
};
