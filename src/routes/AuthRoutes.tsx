import lazyLoad from '@/lib/lazyLoad';
import GuestGuard from '@/core/guards/GuestGuard';
import AuthLayout from '@/layouts/AuthLayout';
import SignupPage from '@/views/auth/SignupPage';
import ForgotPasswordPage from '@/views/auth/ForgotPasswordPage';

// Auth pages
const LoginPage = lazyLoad(() => import('@/views/auth/LoginPage'));

const AuthRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    { path: 'signup', element: <SignupPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
  ],
};

export default AuthRoutes;
