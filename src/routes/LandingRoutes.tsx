import lazyLoad from '@/lib/lazyLoad';
import LandingLayout from '@/layouts/LandingLayout';
// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/useAuthStore';

// Landing pages
const LandingPage = lazyLoad(() => import('@/views/landing/LandingPage'));
const Terms = lazyLoad(() => import('@/views/landing/Terms'));
const Privacy = lazyLoad(() => import('@/views/landing/Privacy'));
const Support = lazyLoad(() => import('@/views/landing/Support'));

// Wrapper component to handle landing page logic
const LandingWrapper = () => {
  //   const { isAuthenticated, user } = useAuthStore();

  // If authenticated, stay on landing page (as per requirements)
  // This is different from most apps where you'd redirect to dashboard
  return <LandingPage />;
};

const LandingRoutes = {
  path: '/',
  element: <LandingLayout />,
  children: [
    {
      path: '',
      element: <LandingWrapper />,
    },
    {
      path: 'terms',
      element: <Terms />,
    },
    {
      path: 'privacy',
      element: <Privacy />,
    },
    {
      path: 'support',
      element: <Support />,
    },
  ],
};

export default LandingRoutes;
