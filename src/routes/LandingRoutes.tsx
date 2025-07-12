import lazyLoad from '@/lib/lazyLoad';
import LandingLayout from '@/layouts/LandingLayout';

// Landing pages
const LandingPage = lazyLoad(() => import('@/views/landing/LandingPage'));
const Terms = lazyLoad(() => import('@/views/landing/Terms'));
const Privacy = lazyLoad(() => import('@/views/landing/Privacy'));
const Support = lazyLoad(() => import('@/views/landing/Support'));
const Aboutus = lazyLoad(() => import('@/views/landing/Aboutus'));
const ContactUs = lazyLoad(() => import('@/views/landing/Contactus'));
// Wrapper component to handle landing page logic
const LandingWrapper = () => {
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
      path: 'about',
      element: <Aboutus />,
    },
    {
      path: 'contact',
      element: <ContactUs />,
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
