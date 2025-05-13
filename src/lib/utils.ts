import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDashboardLink(role?: string) {
  const rolePaths: Record<string, string> = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
    librarian: '/librarian/dashboard',
    medical: '/medical/dashboard'
  };

  return role && rolePaths[role] ? rolePaths[role] : '/dashboard';
}

