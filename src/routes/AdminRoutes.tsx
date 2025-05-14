import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import RoleGuard from '@/core/guards/RoleGuard';

// Lazy load admin views
const UserManagement = lazy(() => import('@/views/admin/UserManagement'));
const SidebarManagement = lazy(() => import('@/views/admin/SidebarManagement'));
const SystemSettings = lazy(() => import('@/views/admin/SystemSettings'));

const AdminRoutes: RouteObject = {
  path: 'admin',
  element: (
    <RoleGuard roles={['admin']}>
      <MainLayout />
    </RoleGuard>
  ),
  children: [
    {
      path: 'users',
      element: <UserManagement />,
    },
    {
      path: 'sidebar',
      element: <SidebarManagement />,
    },
    {
      path: 'settings',
      element: <SystemSettings />,
    },
  ],
};

export default AdminRoutes;
