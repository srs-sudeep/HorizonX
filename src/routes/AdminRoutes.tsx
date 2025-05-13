import { Navigate } from 'react-router-dom';
import lazyLoad from '@/lib/lazyLoad';
import RoleBasedRoute from '@/core/guards/RoleBasedRoute';
import MainLayout from '@/layouts/MainLayout';

// Admin pages
const AdminDashboard = lazyLoad(() => import('@/views/admin/AdminDashboard'));
const AdminUsers = lazyLoad(() => import('@/views/admin/Users'));
const AdminSettings = lazyLoad(() => import('@/views/admin/Settings'));
// const AdminReports = lazyLoad(() => import('@/views/admin/Reports'));

const AdminRoutes = {
  path: 'admin',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/admin/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: (
        <RoleBasedRoute allowedRoles={['admin']} fallbackPath="/unauthorized">
          <AdminDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'users',
      element: (
        <RoleBasedRoute allowedRoles={['admin']} fallbackPath="/unauthorized">
          <AdminUsers />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'settings',
      element: (
        <RoleBasedRoute allowedRoles={['admin']} fallbackPath="/unauthorized">
          <AdminSettings />
        </RoleBasedRoute>
      ),
    },
    // {
    //   path: 'reports',
    //   element: (
    //     <RoleBasedRoute allowedRoles={['admin']} fallbackPath="/unauthorized">
    //       <AdminReports />
    //     </RoleBasedRoute>
    //   ),
    // },
  ],
};

export default AdminRoutes;
