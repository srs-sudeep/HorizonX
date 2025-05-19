import lazyLoad from '@/lib/lazyLoad';
import ErrorLayout from '@/layouts/ErrorLayout';

// Error pages
const NotFoundPage = lazyLoad(() => import('@/views/errors/NotFoundPage'));
const UnauthorizedPage = lazyLoad(() => import('@/views/errors/UnauthorizedPage'));

const ErrorRoutes = [
  {
    path: 'unauthorized',
    element: (
      <ErrorLayout>
        <UnauthorizedPage />
      </ErrorLayout>
    ),
  },
  {
    path: '*',
    element: (
      <ErrorLayout>
        <NotFoundPage />
      </ErrorLayout>
    ),
  },
];

export default ErrorRoutes;
