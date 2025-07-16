import { AppLogo, Button, Sheet, SheetContent, SheetTrigger, SettingsSidebar } from '@/components';
import { getDashboardLink } from '@/lib/redirect';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { ArrowRight, LogOut, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'About us', href: 'about' },
  { name: 'Contact us', href: 'contact' },
  { name: 'Privacy Policies', href: 'privacy' },
  { name: 'Terms', href: 'terms' },
  { name: 'Support', href: 'support' },
];

export const LandingNavbar = () => {
  const location = useLocation();
  const { isAuthenticated, currentRole, logout } = useAuthStore();
  const [scroll, setScroll] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scroll
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-2xl border-b border-white/10 dark:border-white/5'
          : 'bg-gradient-to-b from-white/80 to-white/40 dark:from-black/80 dark:to-black/40 backdrop-blur-sm'
      }`}
      style={{
        background: scroll
          ? undefined
          : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      {/* Animated gradient border */}
      {scroll && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />
      )}
      <div className="container relative mx-auto flex items-center justify-between py-4 px-6">
        <div className="relative group cursor-pointer">
          <Link to="/" className="block">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-0 transition-opacity duration-500" />
              <AppLogo
                horizontal
                className="relative w-32 md:w-48 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => {
            const isActive = location.pathname.includes(link.href);
            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  to={`/${link.href}`}
                  className={cn(
                    'group px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium',
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg'
                      : hoveredLink === index
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </div>
            );
          })}

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Login</span>
                  <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                asChild
                className="relative overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <Link
                  to={getDashboardLink(currentRole)}
                  className="flex items-center gap-2 relative"
                >
                  {/* Light mode animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                  {/* Dark mode animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none dark:block hidden" />
                  <span className="relative z-10">Dashboard</span>
                  <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* Logout Button */}
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                onClick={logout}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative z-10 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </div>
              </Button>
            </div>
          )}

          {/* Settings with enhanced styling */}
          <div className="ml-4 p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300">
            <SettingsSidebar />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
            <SettingsSidebar />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-l border-white/20 dark:border-white/10">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map(link => {
                  const isActive = location.pathname.includes(link.href);
                  return (
                    <Link
                      key={link.name}
                      to={`/${link.href}`}
                      className={cn(
                        'relative group px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300',
                        isActive
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        <ArrowRight
                          className={cn(
                            'h-4 w-4 transition-all duration-300 transform',
                            isActive
                              ? 'opacity-100 translate-x-1'
                              : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                          )}
                        />
                      </div>
                    </Link>
                  );
                })}

                {/* Mobile Auth Buttons */}
                <div className="pt-6 flex flex-col space-y-4 border-t border-gray-200 dark:border-gray-700">
                  {!isAuthenticated ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full py-3 text-lg rounded-full border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300"
                      >
                        Login
                      </Button>
                      <Button className="w-full py-3 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                        Get Started
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        className="w-full py-3 text-lg rounded-full bg-neutral-900 dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium border-2 border-neutral-800 dark:border-neutral-200 hover:border-neutral-700 dark:hover:border-neutral-400
                        hover:shadow-md hover:shadow-neutral-500/20 dark:hover:shadow-neutral-300/20
 text-white shadow-lg"
                      >
                        <Link
                          to={getDashboardLink(currentRole)}
                          className="flex items-center justify-center gap-2"
                        >
                          Dashboard
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        className="w-full py-3 text-lg rounded-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg"
                        onClick={logout}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <LogOut className="h-4 w-4" />
                          Logout
                        </div>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom gradient line */}
      {scroll && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-700/50 to-transparent" />
      )}
    </header>
  );
};
