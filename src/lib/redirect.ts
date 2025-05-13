import {type UserRole} from '@/store/useAuthStore';

export function getDashboardLink(role: UserRole ) {
  const rolePaths: Record<string, string> = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    librarian: '/librarian/dashboard',
    medical: '/medical/dashboard'
  };

  return role && rolePaths[role] ? rolePaths[role] : '/';
}

