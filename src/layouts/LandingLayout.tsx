import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeSwitcher } from '@/theme';
import { Link, Outlet } from 'react-router-dom';

const LandingLayout = () => {
  const { isAuthenticated, user, currentRole } = useAuthStore();

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return '/login';

    const rolePaths: Record<string, string> = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      librarian: '/librarian/dashboard',
      medical: '/medical/dashboard',
    };

    return currentRole && rolePaths[currentRole]
      ? rolePaths[currentRole]
      : user.roles && user.roles.length > 0
        ? rolePaths[user.roles[0]] || '/dashboard'
        : '/dashboard';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              SchoolMS
            </Link>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />

              {isAuthenticated ? (
                <Button asChild>
                  <Link to={getDashboardLink()}>Dashboard</Link>
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-muted/30">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 SchoolMS. All rights reserved.
              </p>
            </div>

            <div className="flex gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
