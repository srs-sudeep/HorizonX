// Mock API for sidebar configuration
import { type UserRole } from '@/store/useAuthStore';
import {
  type SidebarModuleItem,
  type SidebarSubModuleItem,
  type SidebarSubModuleTreeItem,
} from '@/types/Sidebar.types';
import { sidebarData } from '@/api/mockApi/sidebar';

export const getModules = () => {
  return Promise.resolve([...sidebarData.modules]);
};
export const getModuleById = (id: string) => {
  const module = sidebarData.modules.find(m => m.id === id);
  return Promise.resolve(module || null);
};
export const createModule = (module: Omit<SidebarModuleItem, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newModule = { ...module, id };
  sidebarData.modules.push(newModule);
  return Promise.resolve(newModule);
};
export const updateModule = (id: string, updates: Partial<SidebarModuleItem>) => {
  const index = sidebarData.modules.findIndex(m => m.id === id);
  if (index === -1) return Promise.reject(new Error('Module not found'));

  sidebarData.modules[index] = { ...sidebarData.modules[index], ...updates };
  return Promise.resolve(sidebarData.modules[index]);
};
export const deleteModule = (id: string) => {
  const index = sidebarData.modules.findIndex(m => m.id === id);
  if (index === -1) return Promise.reject(new Error('Module not found'));

  const deleted = sidebarData.modules[index];
  sidebarData.modules = sidebarData.modules.filter(m => m.id !== id);
  return Promise.resolve(deleted);
};
export const getSubModules = (moduleId?: string) => {
  const filtered = moduleId
    ? sidebarData.subModules.filter(sm => sm.moduleId === moduleId)
    : sidebarData.subModules;
  return Promise.resolve([...filtered]);
};
export const getSubModuleById = (id: string) => {
  const subModule = sidebarData.subModules.find(sm => sm.id === id);
  return Promise.resolve(subModule || null);
};
export const createSubModule = (subModule: Omit<SidebarSubModuleItem, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newSubModule = { ...subModule, id };
  sidebarData.subModules.push(newSubModule);
  return Promise.resolve(newSubModule);
};
export const updateSubModule = (id: string, updates: Partial<SidebarSubModuleItem>) => {
  const index = sidebarData.subModules.findIndex(sm => sm.id === id);
  if (index === -1) return Promise.reject(new Error('SubModule not found'));

  sidebarData.subModules[index] = { ...sidebarData.subModules[index], ...updates };
  return Promise.resolve(sidebarData.subModules[index]);
};
export const deleteSubModule = (id: string) => {
  const index = sidebarData.subModules.findIndex(sm => sm.id === id);
  if (index === -1) return Promise.reject(new Error('SubModule not found'));

  const deleted = sidebarData.subModules[index];
  sidebarData.subModules = sidebarData.subModules.filter(sm => sm.id !== id);
  return Promise.resolve(deleted);
};

// Get filtered modules and submodules based on user roles
export const getFilteredModules = (currentRole: UserRole) => {
  return sidebarData.modules
    .filter(
      module =>
        module.isActive &&
        (module.requiredRoles.length === 0 || module.requiredRoles.includes(currentRole))
    )
    .sort((a, b) => a.order - b.order);
};

export const getFilteredSubModules = (moduleId: string | undefined, currentRole: UserRole) => {
  const filtered = moduleId
    ? sidebarData.subModules.filter(sm => sm.moduleId === moduleId)
    : sidebarData.subModules;

  return filtered
    .filter(
      subModule =>
        subModule.isActive &&
        (subModule.requiredRoles.length === 0 || subModule.requiredRoles.includes(currentRole))
    )
    .sort((a, b) => a.order - b.order);
};

// Helper to build a hierarchical structure for the sidebar
export const getHierarchicalSubModules = (
  moduleId: string,
  currentRole: UserRole
): SidebarSubModuleTreeItem[] => {
  const filtered = getFilteredSubModules(moduleId, currentRole);

  const topLevel = filtered.filter(item => !item.parentId);

  const buildTree = (items: SidebarSubModuleItem[]): SidebarSubModuleTreeItem[] => {
    return items.map(item => {
      const children = filtered
        .filter(child => child.parentId === item.id)
        .sort((a, b) => a.order - b.order);

      return {
        ...item,
        children: children.length > 0 ? buildTree(children) : undefined,
      };
    });
  };

  return buildTree(topLevel);
};
