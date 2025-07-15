import { Button, HelmetWrapper, Input, Label, toast } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import X from '@/assets/logos/X.svg';
import WhiteX from '@/assets/logos/WhiteX.svg';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';

// Dummy signup API function (replace with real API call)
const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  // Simulate API call
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mode } = useTheme();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Account created! Please log in.' });
      navigate('/auth');
    },
    onError: (error: any) => {
      toast({ title: 'Signup Failed', description: error?.message || 'Could not create account', variant: 'destructive' });
    },
  });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    mutation.mutate({ name, email, password });
  };

  return (
    <HelmetWrapper title="Sign Up | HorizonX">
      <div className="w-[80vw] h-[80vh] flex bg-gray-900 rounded-xl">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center p-8 px-20 pt-24 bg-black max-w-1/2 rounded-l-xl">
          <div className="w-full">
            {/* Header */}
            <div className="mb-16 flex items-center gap-3">
              <img src={mode === 'dark' ? WhiteX : X} alt="logo" className='h-16 w-16' />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">HorizonX</h1>
                <p className="text-gray-400 text-sm">Create your account to get started</p>
              </div>
            </div>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">LDAP ID / Email</label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your LDAP ID or email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="bg-foreground dark:bg-background text-background dark:text-foreground mt-3"
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary text-white font-semibold rounded-lg text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing up...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
            <div className="text-center mt-8 text-primary">
              Already have an account?
              <a
                href="/login"
                className="text-sm ml-2 text-gray-400 hover:text-white underline transition-colors duration-200"
              >
                Login
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Info Card (same as LoginPage) */}
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

export default SignupPage;