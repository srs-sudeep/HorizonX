import { Navigate } from 'react-router-dom';
import lazyLoad from '@/lib/lazyLoad';
import RoleBasedRoute from '@/core/guards/RoleBasedRoute';
import MainLayout from '@/layouts/MainLayout';

// Library pages
const LibraryDashboard = lazyLoad(() => import('@/views/library/LibraryDashboard'));
const BooksList = lazyLoad(() => import('@/views/library/BooksList'));
const CreateBook = lazyLoad(() => import('@/views/library/CreateBook'));
const ManageBooks = lazyLoad(() => import('@/views/library/ManageBooks'));
const BorrowBooks = lazyLoad(() => import('@/views/library/BorrowBooks'));

// The routes are defined without hardcoded roles
// The RoleBasedRoute component will check permissions from the API
const LibraryRoutes = {
  path: 'library',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/library/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: (
        <RoleBasedRoute path="/library/dashboard">
          <LibraryDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'books',
      element: (
        <RoleBasedRoute path="/library/books">
          <BooksList />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'create',
      element: (
        <RoleBasedRoute path="/library/create">
          <CreateBook />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'manage',
      element: (
        <RoleBasedRoute path="/library/manage">
          <ManageBooks />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'borrow',
      element: (
        <RoleBasedRoute path="/library/borrow">
          <BorrowBooks />
        </RoleBasedRoute>
      ),
    },
  ],
};

export default LibraryRoutes;
