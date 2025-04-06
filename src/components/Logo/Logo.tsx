import { Box, Typography, type SxProps, useTheme } from '@mui/material';

interface LogoProps {
  /**
   * Show text next to logo
   * @default true
   */
  showText?: boolean;
  /**
   * Size of the logo in pixels
   * @default 32
   */
  size?: number;
  /**
   * Use horizontal logo instead of square
   * @default false
   */
  horizontal?: boolean;
  /**
   * Additional styles for the container
   */
  sx?: SxProps;
  /**
   * Click handler for the logo
   */
  onClick?: () => void;
}

export const Logo = ({ 
  showText = true, 
  size = 32, 
  horizontal = false,
  sx, 
  onClick 
}: LogoProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getLogoSrc = () => {
    if (horizontal) {
      return isDark ? '/WhiteLogoHorizontal.svg' : '/LogoHorizontal.png';
    }
    return isDark ? '/WhiteLogo.svg' : '/Logo.png';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: onClick ? 'pointer' : 'default',
        ...sx
      }}
      onClick={onClick}
    >
      <img
        src={getLogoSrc()}
        alt="HorizonX Logo"
        style={{
          width: horizontal ? size * 3 : size, // Horizontal logos are typically wider
          height: size,
          objectFit: 'contain'
        }}
      />
      {/* Only show text if not using horizontal logo and showText is true */}
      {!horizontal && showText && (
        <Typography
          variant={size >= 32 ? 'h6' : 'subtitle1'}
          component="div"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Horizon
        </Typography>
      )}
    </Box>
  );
};
