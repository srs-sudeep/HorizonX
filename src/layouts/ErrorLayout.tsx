import { Button, SettingsSidebar } from '@/components';
import React from 'react';
import { Link } from 'react-router-dom';
interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <header className="p-4 flex justify-end">
        <SettingsSidebar />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        {children}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Recogx Init. All rights reserved.
      </footer>
    </div>
  );
};

export default ErrorLayout;
