// Mock API for sidebar configuration
import { type UserRole } from '@/store/useAuthStore';
import { iconMap } from '@/types';

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
  parentId?: string; // For nested children
}

// Initial mock data
let modules: SidebarModuleItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: 'dashboard',
    iconSize: 20,
    requiredRoles: [],
    order: 10,
    isActive: true
  },
  { 
    id: 'admin', 
    label: 'Administration', 
    icon: 'shield',
    iconSize: 20,
    requiredRoles: ['admin'],
    order: 20,
    isActive: true
  },
  { 
    id: 'academics', 
    label: 'Academics', 
    icon: 'book',
    iconSize: 20,
    requiredRoles: ['admin', 'teacher', 'student'],
    order: 30,
    isActive: true
  },
  // Add more modules as needed
];

let subModules: SidebarSubModuleItem[] = [
  { 
    id: 'admin-dashboard', 
    moduleId: 'dashboard', 
    label: 'Admin Dashboard', 
    path: '/admin/dashboard', 
    icon: 'dashboard', 
    iconSize: 16,
    requiredRoles: ['admin'],
    order: 10,
    isActive: true
  },
  { 
    id: 'teacher-dashboard', 
    moduleId: 'dashboard', 
    label: 'Teacher Dashboard', 
    path: '/teacher/dashboard', 
    icon: 'dashboard', 
    iconSize: 16,
    requiredRoles: ['teacher'],
    order: 20,
    isActive: true
  },
  { 
    id: 'courses', 
    moduleId: 'academics', 
    label: 'Courses', 
    path: '/academics/courses', 
    icon: 'graduationCap',
    iconSize: 16,
    requiredRoles: ['admin', 'teacher', 'student'],
    order: 10,
    isActive: true
  },
  { 
    id: 'course-list', 
    moduleId: 'academics', 
    label: 'Course List', 
    path: '/academics/courses/list', 
    icon: 'fileText', 
    iconSize: 14,
    requiredRoles: ['admin', 'teacher', 'student'],
    order: 10,
    isActive: true,
    parentId: 'courses'
  },
  // Add more submodules as needed
];

// API functions for modules
export const getModules = () => {
  return Promise.resolve([...modules]);
};

export const getModuleById = (id: string) => {
  const module = modules.find(m => m.id === id);
  return Promise.resolve(module || null);
};

export const createModule = (module: Omit<SidebarModuleItem, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newModule = { ...module, id };
  modules.push(newModule);
  return Promise.resolve(newModule);
};

export const updateModule = (id: string, updates: Partial<SidebarModuleItem>) => {
  const index = modules.findIndex(m => m.id === id);
  if (index === -1) return Promise.reject(new Error('Module not found'));
  
  modules[index] = { ...modules[index], ...updates };
  return Promise.resolve(modules[index]);
};

export const deleteModule = (id: string) => {
  const index = modules.findIndex(m => m.id === id);
  if (index === -1) return Promise.reject(new Error('Module not found'));
  
  const deleted = modules[index];
  modules = modules.filter(m => m.id !== id);
  return Promise.resolve(deleted);
};

// API functions for submodules
export const getSubModules = (moduleId?: string) => {
  const filtered = moduleId ? subModules.filter(sm => sm.moduleId === moduleId) : subModules;
  return Promise.resolve([...filtered]);
};

export const getSubModuleById = (id: string) => {
  const subModule = subModules.find(sm => sm.id === id);
  return Promise.resolve(subModule || null);
};

export const createSubModule = (subModule: Omit<SidebarSubModuleItem, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newSubModule = { ...subModule, id };
  subModules.push(newSubModule);
  return Promise.resolve(newSubModule);
};

export const updateSubModule = (id: string, updates: Partial<SidebarSubModuleItem>) => {
  const index = subModules.findIndex(sm => sm.id === id);
  if (index === -1) return Promise.reject(new Error('SubModule not found'));
  
  subModules[index] = { ...subModules[index], ...updates };
  return Promise.resolve(subModules[index]);
};

export const deleteSubModule = (id: string) => {
  const index = subModules.findIndex(sm => sm.id === id);
  if (index === -1) return Promise.reject(new Error('SubModule not found'));
  
  const deleted = subModules[index];
  subModules = subModules.filter(sm => sm.id !== id);
  return Promise.resolve(deleted);
};

// Get filtered modules and submodules based on user roles
export const getFilteredModules = (userRoles: UserRole[]) => {
  return modules
    .filter(module => 
      module.isActive && 
      (module.requiredRoles.length === 0 || 
       module.requiredRoles.some(role => userRoles.includes(role)))
    )
    .sort((a, b) => a.order - b.order);
};

export const getFilteredSubModules = (moduleId: string | undefined, userRoles: UserRole[]) => {
  const filtered = moduleId 
    ? subModules.filter(sm => sm.moduleId === moduleId)
    : subModules;
    
  return filtered
    .filter(subModule => 
      subModule.isActive && 
      (subModule.requiredRoles.length === 0 || 
       subModule.requiredRoles.some(role => userRoles.includes(role)))
    )
    .sort((a, b) => a.order - b.order);
};

// Helper to build a hierarchical structure for the sidebar
export const getHierarchicalSubModules = (moduleId: string, userRoles: UserRole[]) => {
  const filtered = getFilteredSubModules(moduleId, userRoles);
  
  // Get top-level items (no parentId)
  const topLevel = filtered.filter(item => !item.parentId);
  
  // Function to recursively build the tree
  const buildTree = (items: SidebarSubModuleItem[]) => {
    return items.map(item => {
      const children = filtered
        .filter(child => child.parentId === item.id)
        .sort((a, b) => a.order - b.order);
        
      return {
        ...item,
        children: children.length > 0 ? buildTree(children) : undefined
      };
    });
  };
  
  return buildTree(topLevel);
};
