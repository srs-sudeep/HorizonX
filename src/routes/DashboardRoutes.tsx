import lazyLoad from '@/lib/lazyLoad';
import RoleBasedRoute from '@/core/guards/RoleBasedRoute';
import MainLayout from '@/layouts/MainLayout';

// Dashboard Pages
const AdminDashboard = lazyLoad(() => import('@/views/dashboard/AdminDashboard'));
const LibrarianDashboard = lazyLoad(() => import('@/views/dashboard/LibrarianDashboard'));
const MedicalDashboard = lazyLoad(() => import('@/views/dashboard/MedicalDashboard'));
const StudentDashboard = lazyLoad(() => import('@/views/dashboard/StudentDashboard'));
const TeacherDashboard = lazyLoad(() => import('@/views/dashboard/TeacherDashboard'));

const DashboardRoutes = {
  path: 'dashboard',
  element: <MainLayout />,
  children: [
    {
      path: 'admin',
      element: (
        <RoleBasedRoute path="/dashboard/admin">
          <AdminDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'library',
      element: (
        <RoleBasedRoute path="/dashboard/library">
          <LibrarianDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'medical',
      element: (
        <RoleBasedRoute path="/dashboard/medical">
          <MedicalDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'student',
      element: (
        <RoleBasedRoute path="/dashboard/student">
          <StudentDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'teacher',
      element: (
        <RoleBasedRoute path="/dashboard/teacher">
          <TeacherDashboard />
        </RoleBasedRoute>
      ),
    },
  ],
};

export default DashboardRoutes;
