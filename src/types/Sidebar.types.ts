import { type UserRole } from '@/store/useAuthStore';
import {type iconMap} from '@/types'
// Types for sidebar configuration
export interface SidebarModuleConfig {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles?: UserRole[];
  order?: number;
}

export interface SidebarSubModuleConfig {
  id: string;
  moduleId: string;
  label: string;
  path: string;
  icon?: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles?: UserRole[];
  badge?: number | (() => number);
  order?: number;
  children?: Omit<SidebarSubModuleConfig, 'moduleId'>[];
}
