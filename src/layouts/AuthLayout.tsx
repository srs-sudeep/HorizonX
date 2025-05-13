import { ThemeSwitcher } from '@/theme';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-[100vh] flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <header className="p-4 flex justify-end">
        <ThemeSwitcher />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <span className="text-white font-bold text-xl">C</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Codename</h1>
          </div>
          <Outlet />
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Codename. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
