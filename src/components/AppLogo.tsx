import { cn } from '@/lib/utils';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import { logos } from '@/assets';

interface AppLogoProps {
  className?: string;
  horizontal?: boolean;
  name?: boolean;
  short?: boolean;
  imgClassname?: string;
}

const getLogoSrc = (
  theme: string,
  horizontal?: boolean,
  name?: boolean,
  short?: boolean
): string => {
  const themeKey = theme === 'dark' ? 'dark' : 'light';

  if (horizontal) {
    return logos.horizontal[themeKey];
  } else if (name) {
    return logos.name[themeKey];
  } else if (short) {
    return logos.short[themeKey];
  }
  return logos.short[themeKey];
};

export const AppLogo = ({
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
