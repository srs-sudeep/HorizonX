import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('student');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Account created',
        description: 'You have successfully registered. Please log in.',
      });

      navigate('/login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side - Registration form */}
      <div className="w-full md:w-1/2 p-8 relative">
        {/* Logo on top right */}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>

        {/* Registration form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-600 dark:text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
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
            <Label htmlFor="role" className="text-gray-600 dark:text-gray-300">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-600 dark:text-gray-300">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-100 dark:bg-white/10 border-0 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Graphic */}
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
          <h1 className="text-4xl font-bold text-white mb-4">Join us.</h1>
          <p className="text-gray-300 text-sm opacity-80">
            Create your account today and unlock access to all our features. Get started with our
            platform to manage your resources effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
