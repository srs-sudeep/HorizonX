import { cn } from '@/lib/utils';
import { useTheme } from '@/theme';

interface AppLogoProps {
  className?: string;
  horizontal?: boolean;
  name?: boolean;
  short?: boolean;
}

const getLogoSrc = (
  theme: string,
  horizontal?: boolean,
  name?: boolean,
  short?: boolean
): string => {
  if (horizontal) {
    return theme === 'dark' ? '/WhiteLogoHorizontal.svg' : '/LogoHorizontal.svg';
  } else if (name) {
    return theme === 'dark' ? '/WhiteLongName.svg' : '/LongName.svg';
  } else if (short) {
    return theme === 'dark' ? '/WhiteX.svg' : '/X.svg';
  }
  return theme === 'dark' ? '/WhiteLogo.svg' : '/Logo.svg';
};

const AppLogo = ({ className, horizontal = false, name = false, short = false }: AppLogoProps) => {
  const { theme } = useTheme();
  const logoSrc = getLogoSrc(theme, horizontal, name, short);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <img src={logoSrc} alt="Logo" className="object-contain w-full h-full" />
      </div>
    </div>
  );
};

export default AppLogo;
