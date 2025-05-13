import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeSwitcher } from '@/theme';
import { Button } from '@/components/ui/button';
interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  const { isAuthenticated, currentRole } = useAuthStore();

  // Determine where to redirect the user based on authentication status
  const getHomeLink = () => {
    if (!isAuthenticated) {
      return '/';
    }

    // If authenticated, redirect to their role dashboard
    const rolePaths: Record<string, string> = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      librarian: '/librarian/dashboard',
      medical: '/medical/dashboard',
    };

    return currentRole && rolePaths[currentRole] ? rolePaths[currentRole] : '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <header className="p-4 flex justify-end">
        <ThemeSwitcher />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        {children}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default">
            <Link to="/">Go to Home</Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Codename. All rights reserved.
      </footer>
    </div>
  );
};

export default ErrorLayout;
