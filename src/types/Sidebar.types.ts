import { type UserRole } from '@/store/useAuthStore';
import { type iconMap } from '@/types';
// Types for sidebar configuration
export interface SidebarModuleItem {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles: UserRole[];
  order: number;
  isActive: boolean;
}

export interface SidebarSubModuleItem {
  id: string;
  moduleId: string;
  label: string;
  path: string;
  icon?: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles: UserRole[];
  badge?: number;
  order: number;
  isActive: boolean;
  parentId?: string;
}

export interface SidebarSubModuleTreeItem extends SidebarSubModuleItem {
  children?: SidebarSubModuleTreeItem[];
}

// Interface for hierarchical submodules with children
export interface HierarchicalSubModule extends SidebarSubModuleItem {
  children?: HierarchicalSubModule[];
}
