import { type UserRole } from '@/store/useAuthStore';

export function getDashboardLink(role: UserRole | null | undefined) {
  const rolePaths: Record<string, string> = {
    default: '/',
    admin: '/dashboard/admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
    librarian: '/dashboard/librarian',
    medical: '/dashboard/medical',
  };

  return role && rolePaths[role] ? rolePaths[role] : '/';
}
