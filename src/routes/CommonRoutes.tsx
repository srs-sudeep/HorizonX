import React from 'react';
import { Navigate } from 'react-router-dom';
import lazyLoad from '@/lib/lazyLoad';
import DashboardRedirect from '@/views/DashboardRedirect';

// Common pages
const NotFoundPage = lazyLoad(() => import('@/views/NotFoundPage'));

const CommonRoutes = [
  // Dashboard redirect
  {
    path: 'dashboard',
    element: <DashboardRedirect />,
  },
  
  // Catch-all route
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default CommonRoutes;