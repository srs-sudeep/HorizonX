import lazyLoad from '@/lib/lazyLoad';
import GuestGuard from '@/core/guards/GuestGuard';
import AuthLayout from '@/layouts/AuthLayout';

// Auth pages
const LoginPage = lazyLoad(() => import('@/views/auth/LoginPage'));
const RegisterPage = lazyLoad(() => import('@/views/auth/RegisterPage'));
const ForgotPasswordPage = lazyLoad(() => import('@/views/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazyLoad(() => import('@/views/auth/ResetPasswordPage'));

const AuthRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard redirectPath="role-dashboard">
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard redirectPath="role-dashboard">
          <RegisterPage />
        </GuestGuard>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <GuestGuard redirectPath="role-dashboard">
          <ForgotPasswordPage />
        </GuestGuard>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <GuestGuard redirectPath="role-dashboard">
          <ResetPasswordPage />
        </GuestGuard>
      ),
    },
  ],
};

export default AuthRoutes;
