import { cn } from '@/lib/utils';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';

interface AppLogoProps {
  className?: string;
  horizontal?: boolean;
  name?: boolean;
  short?: boolean;
  imgClassname?: string;
}
const basePath = './images/logos/';

const getLogoSrc = (
  theme: string,
  horizontal?: boolean,
  name?: boolean,
  short?: boolean
): string => {
  if (horizontal) {
    return theme === 'dark'
      ? `${basePath}WhiteLogoHorizontal.svg`
      : `${basePath}LogoHorizontal.svg`;
  } else if (name) {
    return theme === 'dark' ? `${basePath}WhiteLongName.svg` : `${basePath}LongName.svg`;
  } else if (short) {
    return theme === 'dark' ? `${basePath}WhiteX.svg` : `${basePath}X.svg`;
  }
  return theme === 'dark' ? `${basePath}WhiteX.svg` : `${basePath}X.svg`;
};

const AppLogo = ({
  className,
  horizontal = false,
  name = false,
  short = false,
  imgClassname,
}: AppLogoProps) => {
  const { mode } = useTheme();
  const logoSrc = getLogoSrc(mode, horizontal, name, short);
  const navigate = useNavigate();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <img
          src={logoSrc}
          alt="Logo"
          className={cn('object-contain cursor-pointer', imgClassname)}
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export { AppLogo };
