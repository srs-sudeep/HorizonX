import { Button, HelmetWrapper, Input, toast } from '@/components';
import { register } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Brain, Eye, EyeOff, Shield, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logos } from '@/assets';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Account created! Please log in.' });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({ title: 'Signup Failed', description: error?.message || 'Could not create account', variant: 'destructive' });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, phoneNumber, email, username, password, confirmPassword } = form;
    if (!name || !phoneNumber || !email || !username || !password || !confirmPassword) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (!passwordRegex.test(password)) {
      toast({
        title: 'Error',
        description:
          'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.',
        variant: 'destructive',
      });
      return;
    }
    mutation.mutate({ name, phoneNumber, email, username, password });
  };

  return (
    <HelmetWrapper title="Sign Up | HorizonX">
      <div className="w-[96vw] h-[92vh] max-w-7xl flex bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-3xl mx-auto shadow-2xl border border-gray-700/50">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center p-8 pt-80 px-16 bg-black/40 backdrop-blur-xl max-w-1/2 rounded-l-3xl relative overflow-auto">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-60 left-1/3 w-1 h-1 bg-green-400/40 rounded-full animate-ping delay-700"></div>
          </div>
          <div className="w-full relative z-10">
            {/* Enhanced Header */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <img src={logos.short.dark} alt="logo" className='h-14 w-14 drop-shadow-lg' />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    HorizonX
                  </h1>
                  <div className="flex items-center gap-1 mt-1">
                    <Brain className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">AI-Powered</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">Create your account</h2>
                <p className="text-gray-400 text-sm">Start your journey with AI insights</p>
              </div>
            </div>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Name
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Phone Number
                </label>
                <Input
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Username
                </label>
                <Input
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Password
                </label>
                <div className="relative group">
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700/50"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.
                </p>
              </div>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-primary" />
                  Confirm Password
                </label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-gray-800/70 transition-all duration-300"
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/90 hover:to-primary/70 text-white font-semibold rounded-xl text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/25 transform hover:scale-[1.02] active:scale-[0.98] group"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>
            <div className="text-center mt-8">
              <span className="text-gray-400 text-sm">Already have an account? </span>
              <a
                href="/login"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 hover:underline"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        {/* Right Side - Enhanced Info Cards (same as LoginPage) */}
        <div className="bg-black backdrop-blur-xl p-8 flex-1 rounded-r-3xl relative overflow-hidden">
          {/* AI-themed animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-16 left-16 w-32 h-32 border border-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400/20 rounded-full animate-ping duration-3000"></div>
            <div className="absolute top-1/2 right-16 w-16 h-16 border border-purple-400/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-24 right-1/3 w-20 h-20 border border-green-400/20 rounded-full animate-ping delay-2000 duration-4000"></div>
            <div className="absolute bottom-1/3 left-24 w-12 h-12 border border-yellow-400/20 rounded-full animate-pulse delay-500"></div>
            {/* Neural network lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M100,150 Q300,100 500,200 T800,150"
                stroke="url(#neural-gradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M150,300 Q350,250 550,350 T850,300"
                stroke="url(#neural-gradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse delay-1000"
              />
            </svg>
          </div>
          <div className="flex-1 bg-primary p-8 flex items-center justify-center relative overflow-hidden rounded-2xl min-h-full shadow-2xl">
            <div className="absolute top-0 right-0 z-20">
              <div className="w-30 h-30 bg-black rounded-bl-3xl"></div>
              <div className="absolute top-0 left-0 w-5 h-30 bg-primary rounded-tr-3xl"></div>
              <div className="absolute left-0 bottom-0 w-30 h-5 bg-primary rounded-tr-3xl"></div>
            </div>
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-12 left-12 w-28 h-28 border border-white rounded-full animate-spin duration-[20s]"></div>
              <div className="absolute bottom-24 right-24 w-20 h-20 border border-white rounded-full animate-spin duration-[15s] direction-reverse"></div>
              <div className="absolute top-1/2 right-12 w-14 h-14 border border-white rounded-full animate-spin duration-[25s]"></div>
              <div className="absolute top-20 right-1/3 w-16 h-16 border border-white rounded-full animate-spin duration-[18s] direction-reverse"></div>
              <div className="absolute bottom-1/3 left-20 w-10 h-10 border border-white rounded-full animate-spin duration-[22s]"></div>
            </div>
            <div className="relative z-10 w-full space-y-8">
              {/* Enhanced Main Card */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      AI-Powered Analytics
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80 text-sm font-medium">Live Insights</span>
                    </div>
                  </div>
                </div>
                <div className="text-white/90 mb-8">
                  <p className="text-lg leading-relaxed">
                    "HorizonX has transformed how we analyze data. The AI insights are incredibly accurate and save us hours of manual work every day."
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SJ
                    </div>
                    <div>
                      <p className="text-white font-semibold">Sarah Johnson</p>
                      <p className="text-white/80 text-sm">Head of Analytics • TechCorp</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-200 backdrop-blur-sm">
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-200 backdrop-blur-sm">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Enhanced Bottom Cards Grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Stats Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">AI Performance</h3>
                        <p className="text-white/70 text-sm">Real-time metrics</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">98.7%</div>
                      <div className="text-green-400 text-xs font-medium">+12.3%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-white font-semibold text-sm">2.4K+</div>
                      <div className="text-white/60 text-xs">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-white font-semibold text-sm">15.2M</div>
                      <div className="text-white/60 text-xs">AI Queries</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Star className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-white font-semibold text-sm">4.9</div>
                      <div className="text-white/60 text-xs">AI Rating</div>
                    </div>
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