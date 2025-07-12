import { type UserRole } from '@/types';

export function getDashboardLink(role: UserRole | null | undefined) {
  const rolePaths: Record<string, string> = {
    default: '/',
    admin: '/dashboard/admin',
    student: '/dashboard/student'
  };

  return role && rolePaths[role] ? rolePaths[role] : '/';
}
