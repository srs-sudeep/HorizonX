import { AppLogo, SettingsSidebar } from '@/components';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/theme';
import LogoHorizontal from '@/assets/logos/LogoHorizontal.svg';
import WhiteLogoHorizontal from '@/assets/logos/WhiteLogoHorizontal.svg';

const AuthLayout = () => {
  const { mode } = useTheme();
  const backgroundImage = mode === 'dark' ? WhiteLogoHorizontal : LogoHorizontal;

  return (
    <div className="relative flex items-center justify-center w-screen h-screen min-h-screen overflow-hidden">
      {/* Modern Gradient Background with HorizonX Logo */}
      <div
        className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#24243e] dark:from-[#232526] dark:via-[#414345] dark:to-[#232526] flex items-center justify-center -z-10"
      >
        <img
          src={backgroundImage}
          alt="HorizonX Logo Background"
          className="absolute inset-0 w-full h-full object-contain opacity-100 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
      </div>
      {/* Color overlay from theme color */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none -z-5"
        style={{ background: 'linear-gradient(120deg, var(--color-primary) 0%, transparent 100%)', opacity: 0.35 }}
      />
      {/* Background overlay for extra contrast */}
      <div className="fixed inset-0 w-screen h-screen bg-black/30 dark:bg-white/10 -z-4 pointer-events-none" />
      {/* Top left horizontal logo */}
      <div className="absolute top-4 left-4 z-10">
        <AppLogo horizontal />
      </div>
      {/* Top right settings */}
      <div className="absolute top-4 right-4 z-10">
        <SettingsSidebar />
      </div>
      {/* Main container for all auth pages - removed outer box */}
      <Outlet />
      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-gray-500 dark:text-gray-400 w-full">
        &copy; {new Date().getFullYear()} HorizonX. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
