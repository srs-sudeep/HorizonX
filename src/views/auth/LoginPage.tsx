import { login } from '@/api';
import { Button, HelmetWrapper, Input, Label, toast } from '@/components';
import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import X from '@/assets/logos/X.svg';
import WhiteX from '@/assets/logos/WhiteX.svg';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();
  const { mode } = useTheme();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      setAuth(data);
      toast({
        title: 'Success',
        description: 'You have successfully logged in',
      });
      navigate('/dashboard/admin');
    },
    onError: (error: any) => {
      toast({
        title: 'Login Failed',
        description: error?.response?.data?.detail || error.message || 'Invalid credentials',
        variant: 'destructive',
      });
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    mutation.mutate({ ldapid: email, password });
  };

  return (
    <HelmetWrapper title="Login | HorizonX">
      <div className="relative min-h-screen w-full flex items-center justify-center px-4">
        {/* Login Card */}
        <div className="backdrop-blur-lg bg-white/60 dark:bg-black/40 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto z-10 border border-border/30 dark:border-border/50 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <img
              src={mode === 'dark' ? WhiteX : X}
              alt="HorizonX X Logo"
              className="w-20 h-20 mb-4 drop-shadow-xl select-none"
              draggable={false}
            />
            <h1 className="text-3xl font-extrabold text-foreground drop-shadow-lg mb-2 tracking-tight">Welcome to HorizonX</h1>
            <p className="text-foreground/80 text-base text-center max-w-xs">Sign in to your account to continue your journey with us.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="ldapid" className="text-foreground">
                LDAP ID
              </Label>
              <Input
                id="ldapid"
                type="text"
                placeholder="Enter your LDAP ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter your password"
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pr-12 bg-input/20 border-border text-foreground placeholder:text-foreground/60"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground/80"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold shadow-md transition-all duration-200"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="flex justify-between mt-4">
            <a href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</a>
            <a href="/signup" className="text-sm text-primary hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default LoginPage;
