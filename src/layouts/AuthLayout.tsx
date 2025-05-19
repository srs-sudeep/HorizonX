import { ThemeSwitcher } from '@/theme';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Background blur elements - only visible in dark mode */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/0 dark:bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/0 dark:bg-indigo-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/0 dark:bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Theme switcher positioned in top corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      {/* Main container for all auth pages */}
      <div className="w-full max-w-5xl mx-4 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Codename. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
