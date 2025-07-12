// Logo imports
import LogoHorizontal from './logos/LogoHorizontal.svg';
import WhiteLogoHorizontal from './logos/WhiteLogoHorizontal.svg';
import LongName from './logos/LongName.svg';
import WhiteLongName from './logos/WhiteLongName.svg';
import X from './logos/X.svg';
import WhiteX from './logos/WhiteX.svg';
import LogoLandingLight from './logos/LogoLandingLight.svg';
import LogoLandingDark from './logos/LogoLandingDark.svg';

// Login page imports
import IITBhilaiLogo from './login/IIT_Bhilai_Logo.svg';
import LoginImage from './login/LoginImage.jpg';
import LoginImageDark from './login/LoginImageDark.png';

// Export all images
export const logos = {
  horizontal: {
    light: LogoHorizontal,
    dark: WhiteLogoHorizontal,
  },
  name: {
    light: LongName,
    dark: WhiteLongName,
  },
  short: {
    light: X,
    dark: WhiteX,
  },
  landing: {
    light: LogoLandingDark,
    dark: LogoLandingLight,
  },
};

export const loginAssets = {
  iitBhilaiLogo: IITBhilaiLogo,
  loginImage: LoginImage,
  loginImageDark: LoginImageDark,
};

// You can also export them individually if needed
export {
  LogoHorizontal,
  WhiteLogoHorizontal,
  LongName,
  WhiteLongName,
  X,
  WhiteX,
  IITBhilaiLogo,
  LoginImage,
  LoginImageDark,
};
