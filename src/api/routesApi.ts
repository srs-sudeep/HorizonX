import { type UserRole } from '@/store/useAuthStore';

// Interface for route access configuration
export interface RouteAccess {
  path: string;
  allowedRoles: UserRole[];
}

// This would be replaced with an actual API call
export const fetchUserRoutes = async (role: UserRole): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Map roles to their accessible modules
  const roleModuleMap: Record<UserRole, string[]> = {
    admin: ['admin', 'academics', 'library', 'medical', 'communication', 'dashboard'],
    teacher: ['academics', 'communication', 'dashboard'],
    student: ['academics', 'library', 'communication', 'dashboard'],
    librarian: ['library', 'communication', 'dashboard'],
    medical: ['medical', 'communication', 'dashboard'],
  };

  return roleModuleMap[role] || [];
};

// Fetch detailed route access permissions
export const fetchRoutePermissions = async (role: UserRole): Promise<RouteAccess[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Define route permissions
  const allPermissions: RouteAccess[] = [
    // Dashboard Routes
    { path: '/dashboard/admin', allowedRoles: ['admin'] },
    { path: '/dashboard/teacher', allowedRoles: ['teacher'] },
    { path: '/dashboard/student', allowedRoles: ['student'] },
    { path: '/dashboard/librarian', allowedRoles: ['librarian'] },
    { path: '/dashboard/medical', allowedRoles: ['medical'] },
    // Library routes
    { path: '/library/books', allowedRoles: ['admin', 'librarian', 'student'] },
    { path: '/library/create', allowedRoles: ['admin', 'librarian'] },
    { path: '/library/manage', allowedRoles: ['admin', 'librarian'] },
    { path: '/library/borrow', allowedRoles: ['student'] },

    // Academic routes
    { path: '/academics/courses', allowedRoles: ['admin', 'teacher', 'student'] },
    { path: '/academics/grades', allowedRoles: ['admin', 'teacher'] },
    { path: '/academics/assignments', allowedRoles: ['admin', 'teacher', 'student'] },
    { path: '/academics/create-course', allowedRoles: ['admin', 'teacher'] },

    // Medical routes
    { path: '/medical/records', allowedRoles: ['admin', 'medical'] },
    { path: '/medical/appointments', allowedRoles: ['admin', 'medical', 'student'] },

    // Admin routes
    { path: '/admin/users', allowedRoles: ['admin'] },
    { path: '/admin/settings', allowedRoles: ['admin'] },

    // Communication routes
    {
      path: '/communication/messages',
      allowedRoles: ['admin', 'teacher', 'student', 'librarian', 'medical'],
    },
    { path: '/communication/announcements', allowedRoles: ['admin', 'teacher'] },
  ];

  // Filter permissions based on user role
  return allPermissions.filter(permission => permission.allowedRoles.includes(role));
};
