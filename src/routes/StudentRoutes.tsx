import React from 'react';
import { Navigate } from 'react-router-dom';
import lazyLoad from '@/lib/lazyLoad';
import RoleBasedRoute from '@/core/guards/RoleBasedRoute';
import MainLayout from '@/layouts/MainLayout';

// Student pages
const StudentDashboard = lazyLoad(() => import('@/views/student/StudentDashboard'));
const StudentCourses = lazyLoad(() => import('@/views/student/Courses'));
// const StudentGrades = lazyLoad(() => import('@/views/student/Grades'));
const StudentProfile = lazyLoad(() => import('@/views/student/Profile'));
// const StudentSchedule = lazyLoad(() => import('@/views/student/Schedule'));

const StudentRoutes = {
  path: 'student',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/student/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: (
        <RoleBasedRoute allowedRoles={['student']} fallbackPath="/unauthorized">
          <StudentDashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: 'courses',
      element: (
        <RoleBasedRoute allowedRoles={['student']} fallbackPath="/unauthorized">
          <StudentCourses />
        </RoleBasedRoute>
      ),
    },
    // {
    //   path: 'grades',
    //   element: (
    //     <RoleBasedRoute allowedRoles={['student']} fallbackPath="/unauthorized">
    //       <StudentGrades />
    //     </RoleBasedRoute>
    //   ),
    // },
    {
      path: 'profile',
      element: (
        <RoleBasedRoute allowedRoles={['student']} fallbackPath="/unauthorized">
          <StudentProfile />
        </RoleBasedRoute>
      ),
    },
    // {
    //   path: 'schedule',
    //   element: (
    //     <RoleBasedRoute allowedRoles={['student']} fallbackPath="/unauthorized">
    //       <StudentSchedule />
    //     </RoleBasedRoute>
    //   ),
    // },
  ],
};

export default StudentRoutes;
