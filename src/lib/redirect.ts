import { type UserRole } from '@/types';

export function getDashboardLink(role: UserRole | null | undefined) {
  const rolePaths: Record<string, string> = {
    default: '/horizonx/workbench',
    superuser: '/horizonx/workbench/dashboard/admin',
    user: '/horizonx/workbench/dashboard/user',
  };

  return role && rolePaths[role] ? rolePaths[role] : '/';
}
