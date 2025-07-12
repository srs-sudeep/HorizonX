import { Button, HelmetWrapper, Input, Label, toast } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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
      <div className="relative min-h-screen w-full flex items-center justify-center px-4">
        <div className="backdrop-blur-lg bg-white/60 dark:bg-black/40 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto z-10 border border-border/30 dark:border-border/50 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <img
              src={mode === 'dark' ? WhiteX : X}
              alt="HorizonX X Logo"
              className="w-20 h-20 mb-4 drop-shadow-xl select-none"
              draggable={false}
            />
            <h1 className="text-3xl font-extrabold text-foreground drop-shadow-lg mb-2 tracking-tight">Create your account</h1>
            <p className="text-foreground/80 text-base text-center max-w-xs">Sign up to get started with HorizonX.</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-6 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <Input id="name" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60" />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="email" className="text-foreground">LDAP ID / Email</Label>
              <Input id="email" type="text" placeholder="Enter your LDAP ID or email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60" />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60" />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60" />
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold shadow-md transition-all duration-200" disabled={mutation.isPending}>
              {mutation.isPending ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
          <div className="flex justify-between mt-4">
            <a href="/login" className="text-sm text-primary hover:underline">Back to login</a>
          </div>
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default SignupPage; 