import MainLayout from '@/layouts/MainLayout';
import lazyLoad from '@/lib/lazyLoad';
import { type RouteObject } from 'react-router-dom';

// Lazy load admin views
const PermissionManagement = lazyLoad(() => import('@/views/admin/PermissionManagement'));
const ModuleManagement = lazyLoad(() => import('@/views/admin/ModuleManagement'));
const RouteManagement = lazyLoad(() => import('@/views/admin/RouteManagement'));
const RolesManagement = lazyLoad(() => import('@/views/admin/RolesManagement'));
const UserManagement = lazyLoad(() => import('@/views/admin/UserManagement'));
const ServiceManagement = lazyLoad(() => import('@/views/admin/ServiceManagement'));
const AdminRoutes: RouteObject = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      path: 'roles-management',
      element: <RolesManagement />,
    },
    {
      path: 'permission-management',
      element: <PermissionManagement />,
    },
    {
      path: 'module-management',
      element: <ModuleManagement />,
    },
    {
      path: 'user-management',
      element: <UserManagement />,
    },
    {
      path: 'path-management',
      element: <RouteManagement />,
    },
    {
      path: 'service',
      element: <ServiceManagement />,
    },
  ],
};

export default AdminRoutes;
