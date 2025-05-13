import React from 'react';
import { Navigate } from 'react-router-dom';
import lazyLoad from '@/lib/lazyLoad';
import RoleBasedRoute from '@/core/guards/RoleBasedRoute';
import MainLayout from '@/layouts/MainLayout';

// Teacher pages
const TeacherDashboard = lazyLoad(() => import('@/views/teacher/TeacherDashboard'));
const TeacherCourses = lazyLoad(() => import('@/views/teacher/Courses'));
// const TeacherStudents = lazyLoad(() => import('@/views/teacher/Students'));
// const TeacherGrades = lazyLoad(() => import('@/views/teacher/Grades'));
const TeacherProfile = lazyLoad(() => import('@/views/teacher/Profile'));

const TeacherRoutes = {
  path: 'teacher',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/teacher/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: (
        <RoleBasedRoute allowedRoles={['teacher']} fallbackPath="/unauthorized">
          <TeacherDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'courses',
      element: (
        <RoleBasedRoute allowedRoles={['teacher']} fallbackPath="/unauthorized">
          <TeacherCourses />
        </RoleBasedRoute>
      ),
    },
    // {
    //   path: 'students',
    //   element: (
    //     <RoleBasedRoute allowedRoles={['teacher']} fallbackPath="/unauthorized">
    //       <TeacherStudents />
    //     </RoleBasedRoute>
    //   ),
    // },
    // {
    //   path: 'grades',
    //   element: (
    //     <RoleBasedRoute allowedRoles={['teacher']} fallbackPath="/unauthorized">
    //       <TeacherGrades />
    //     </RoleBasedRoute>
    //   ),
    // },
    {
      path: 'profile',
      element: (
        <RoleBasedRoute allowedRoles={['teacher']} fallbackPath="/unauthorized">
          <TeacherProfile />
        </RoleBasedRoute>
      ),
    },
  ],
};

export default TeacherRoutes;
