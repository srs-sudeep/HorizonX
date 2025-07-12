import { Button, HelmetWrapper, Input, Label, toast } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import X from '@/assets/logos/X.svg';
import WhiteX from '@/assets/logos/WhiteX.svg';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';

// Dummy forgot password API function (replace with real API call)
const forgotPassword = async ({ email }: { email: string }) => {
  // Simulate API call
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { mode } = useTheme();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Password reset link sent! Check your email.' });
      navigate('/auth');
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.message || 'Could not send reset link', variant: 'destructive' });
    },
  });

  const handleForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Error', description: 'Please enter your email or LDAP ID', variant: 'destructive' });
      return;
    }
    mutation.mutate({ email });
  };

  return (
    <HelmetWrapper title="Forgot Password | HorizonX">
      <div className="relative min-h-screen w-full flex items-center justify-center px-4">
        <div className="backdrop-blur-lg bg-white/60 dark:bg-black/40 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto z-10 border border-border/30 dark:border-border/50 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <img
              src={mode === 'dark' ? WhiteX : X}
              alt="HorizonX X Logo"
              className="w-20 h-20 mb-4 drop-shadow-xl select-none"
              draggable={false}
            />
            <h1 className="text-3xl font-extrabold text-foreground drop-shadow-lg mb-2 tracking-tight">Forgot Password</h1>
            <p className="text-foreground/80 text-base text-center max-w-xs">Enter your email or LDAP ID to receive a password reset link.</p>
          </div>
          <form onSubmit={handleForgot} className="space-y-6 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="email" className="text-foreground">LDAP ID / Email</Label>
              <Input id="email" type="text" placeholder="Enter your LDAP ID or email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-input/20 border-border text-foreground placeholder:text-foreground/60" />
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold shadow-md transition-all duration-200" disabled={mutation.isPending}>
              {mutation.isPending ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPasswordPage; 