import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useAuthStore } from '@/store/useAuthStore';
import { getDashboardLink } from '@/lib/redirect';
import AppLogo from '../AppLogo';

const LandingNavbar = () => {
  const { isAuthenticated, currentRole } = useAuthStore();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <AppLogo horizontal className="w-32 md:w-48" />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            {isAuthenticated ? (
              <Button asChild>
                <Link to={getDashboardLink(currentRole)}>Dashboard</Link>
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
  );
};

export default LandingNavbar;
