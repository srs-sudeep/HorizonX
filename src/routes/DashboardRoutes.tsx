import lazyLoad from '@/lib/lazyLoad';
import MainLayout from '@/layouts/MainLayout';

// Dashboard Pages
const AdminDashboard = lazyLoad(() => import('@/views/dashboard/AdminDashboard'));
const Profile = lazyLoad(() => import('@/views/dashboard/Profile'));



const DashboardRoutes = {
  path: 'dashboard',
  element: <MainLayout />,
  children: [
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'admin',
      element: <AdminDashboard />,
    },
    {
      path: 'student',
      element: <AdminDashboard />,
    },
  ],
};

export default DashboardRoutes;
