// Mock API for routes management
import { type UserRole } from '@/store/useAuthStore';

export interface RouteConfig {
  id: string;
  path: string;
  requiredRoles: UserRole[];
  isActive: boolean;
  description?: string;
}

// Initial mock data
let routes: RouteConfig[] = [
  {
    id: 'admin-dashboard',
    path: '/admin/dashboard',
    requiredRoles: ['admin'],
    isActive: true,
    description: 'Admin dashboard page'
  },
  {
    id: 'teacher-dashboard',
    path: '/teacher/dashboard',
    requiredRoles: ['teacher'],
    isActive: true,
    description: 'Teacher dashboard page'
  },
  {
    id: 'student-dashboard',
    path: '/student/dashboard',
    requiredRoles: ['student'],
    isActive: true,
    description: 'Student dashboard page'
  },
  {
    id: 'user-management',
    path: '/admin/users',
    requiredRoles: ['admin'],
    isActive: true,
    description: 'User management page'
  },
  // Add more routes as needed
];

// API functions
export const getRoutes = () => {
  return Promise.resolve([...routes]);
};

export const getRouteById = (id: string) => {
  const route = routes.find(r => r.id === id);
  return Promise.resolve(route || null);
};

export const createRoute = (route: Omit<RouteConfig, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newRoute = { ...route, id };
  routes.push(newRoute);
  return Promise.resolve(newRoute);
};

export const updateRoute = (id: string, updates: Partial<RouteConfig>) => {
  const index = routes.findIndex(r => r.id === id);
  if (index === -1) return Promise.reject(new Error('Route not found'));
  
  routes[index] = { ...routes[index], ...updates };
  return Promise.resolve(routes[index]);
};

export const deleteRoute = (id: string) => {
  const index = routes.findIndex(r => r.id === id);
  if (index === -1) return Promise.reject(new Error('Route not found'));
  
  const deleted = routes[index];
  routes = routes.filter(r => r.id !== id);
  return Promise.resolve(deleted);
};

// Check if a user with given roles has access to a route
export const hasRouteAccess = (path: string, userRoles: UserRole[]) => {
  const route = routes.find(r => r.path === path);
  if (!route || !route.isActive) return false;
  
  return route.requiredRoles.some(role => userRoles.includes(role));
};