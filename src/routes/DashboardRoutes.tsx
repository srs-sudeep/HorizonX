import lazyLoad from '@/lib/lazyLoad';
import MainLayout from '@/layouts/MainLayout';

// Dashboard Pages
const AdminDashboard = lazyLoad(() => import('@/views/dashboard/AdminDashboard'));
const Profile = lazyLoad(() => import('@/views/dashboard/Profile'));



const DashboardRoutes = {
  path: 'horizonx/workbench',
  element: <MainLayout />,
  children: [
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'dashboard/admin',
      element: <AdminDashboard />,
    },
    {
      path: 'dashboard/user',
      element: <AdminDashboard />,
    },
  ],
};

export default DashboardRoutes;
