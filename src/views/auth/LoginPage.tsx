import { login } from '@/api';
import { logos } from '@/assets';
import { Button, HelmetWrapper, Input, toast } from '@/components';
import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Star } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();
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
      <div className="w-[80vw] h-[80vh] flex bg-gray-900 rounded-xl">
        
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center p-8 px-20 pt-24 bg-black max-w-1/2 rounded-l-xl">
          <div className="w-full">
            
            {/* Header */}
            <div className="mb-16 flex items-center gap-3">
              <img src={logos.short.dark} alt="logo" className='h-16 w-16' />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">HorizonX</h1>
              <p className="text-gray-400 text-sm">Please Enter your Account details</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">LDAP ID</label>
                <Input
                  id="ldapid"
                  type="text"
                  placeholder="superadmin"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                  autoComplete="ldapid"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="••••••••"
                    onChange={e => setPassword(e.target.value)}
                    className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary text-white font-semibold rounded-lg text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Login in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="flex items-center justify-center space-x-4">
                <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Create Account */}
            <div className="text-center mt-8 text-primary">
              Don't have an account?
              <a 
                href="/signup" 
                className="text-sm ml-2 text-gray-400 hover:text-white underline transition-colors duration-200"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Info Card */}
        <div className="bg-black p-6 flex-1 rounded-r-xl">
            <div className="flex-1 bg-primary p-8 flex items-center justify-center relative overflow-hidden rounded-xl min-h-full">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 ">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10 w-full">
            
            {/* Main Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 mb-20 border border-white/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                What's our Developers Said.
              </h2>
              <div className="text-white/90 mb-6">
                <p className="text-lg italic">
                  "Building amazing applications has never been easier. The development experience is seamless and the tools are fantastic."
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-white/80 text-sm">Senior Developer at HorizonX</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Join our development team
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Be among the first to experience the easiest way to build amazing applications.
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-white/80 text-sm">+500 developers</span>
                  </div>
                </div>
                
                <div className="w-24 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default LoginPage;
