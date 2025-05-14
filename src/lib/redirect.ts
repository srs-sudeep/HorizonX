import {type UserRole} from '@/store/useAuthStore';

export function getDashboardLink(role: UserRole ) {
  const rolePaths: Record<string, string> = {
    admin: '/dashboard/admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
    librarian: '/dashboard/librarian',
    medical: '/dashboard/medical'
  };

  return role && rolePaths[role] ? rolePaths[role] : '/';
}

