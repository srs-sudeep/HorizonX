import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call login directly from useAuthStore which will handle the API call
      await login(email, password);

      toast({
        title: 'Success',
        description: 'You have successfully logged in',
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 p-8 relative">
        {/* Logo moved to top right */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            IO
          </div>
        </div>

        {/* User icon */}
        <div className="flex justify-center mb-6 mt-12">
          <div className="w-20 h-20 rounded-full border-2 border-purple-500 flex items-center justify-center text-purple-500 dark:text-purple-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-600 dark:text-gray-300">
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={checked => setRememberMe(!!checked)}
              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            />
            <Label
              htmlFor="remember"
              className="text-sm font-normal text-gray-600 dark:text-gray-300"
            >
              Remember me
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo accounts */}
        <div className="mt-6 p-3 bg-gray-100/80 dark:bg-white/5 rounded-lg">
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-1">
            Demo Accounts:
          </p>
          <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
            <p>admin@example.com / password</p>
            <p>teacher@example.com / password</p>
            <p>student@example.com / password</p>
            <p>medical@example.com / password</p>
            <p>multi@example.com / password</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-800 items-center justify-center p-8 relative overflow-hidden">
        {/* Abstract flowing shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 opacity-80">
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M220.6,-306.1C288,-270.9,345.3,-214.6,366.4,-147.8C387.5,-81,372.3,-3.8,351.2,66.3C330.1,136.4,303.1,199.3,260.7,246.8C218.3,294.2,160.6,326.2,101.4,339.8C42.1,353.5,-18.7,348.7,-76,329.6C-133.4,310.4,-187.2,276.9,-232.7,233C-278.1,189.1,-315.1,134.8,-338.6,72.6C-362.1,10.4,-372.1,-59.5,-351.9,-120.4C-331.7,-181.3,-281.2,-233.2,-223,-272.5C-164.8,-311.8,-98.9,-338.4,-30.4,-344.9C38.1,-351.4,153.3,-341.3,220.6,-306.1Z"
                transform="translate(250 250) scale(0.5)"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="z-10 text-left max-w-xs">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome.</h1>
          <p className="text-gray-300 text-sm opacity-80">
            Log in to access your dashboard and manage all your resources in one place. Discover the
            new features we've added to enhance your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
