import { type UserRole } from '@/types';
import { type Permission } from '@/types';

// Extended interfaces for component access control
export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  pageId: string;
  type: 'button' | 'form' | 'table' | 'card' | 'modal' | 'section' | 'icon' | 'menu';
  isActive: boolean;
  createdAt: string;
}

export interface PageDefinition {
  id: string;
  name: string;
  path: string;
  module: string;
  isActive: boolean;
  createdAt: string;
}

export interface ComponentPermission {
  id: string;
  componentId: string;
  permissionId: number;
  isRequired: boolean;
  createdAt: string;
}

export interface RolePermission {
  id: string;
  roleId: UserRole;
  permissionId: number;
  createdAt: string;
}

// Mock data
const permissions: Permission[] = [
  {
    permission_id: 1,
    name: 'View Profile',
    description: 'Can view profile page',
    resource: 'profile',
    action: 'read',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
  {
    permission_id: 2,
    name: 'Access Profile Icon',
    description: 'Can see profile icon in navigation - Admin only',
    resource: 'profile-icon',
    action: 'read',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
  {
    permission_id: 3,
    name: 'View User Stats',
    description: 'Can view user statistics section',
    resource: 'user-stats',
    action: 'read',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
  {
    permission_id: 4,
    name: 'Edit Profile',
    description: 'Can edit profile information',
    resource: 'profile',
    action: 'update',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
  {
    permission_id: 5,
    name: 'View Role Information',
    description: 'Can view role information section',
    resource: 'role-info',
    action: 'read',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
];

const pages: PageDefinition[] = [
  {
    id: 'page-profile',
    name: 'Profile Page',
    path: '/dashboard/profile',
    module: 'dashboard',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

const components: ComponentDefinition[] = [
  {
    id: 'comp-profile-icon',
    name: 'Profile Icon',
    description: 'Profile icon in navigation bar - Admin only',
    pageId: 'page-profile',
    type: 'icon',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'comp-profile-header',
    name: 'Profile Header',
    description: 'Profile header with avatar and name',
    pageId: 'page-profile',
    type: 'section',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'comp-profile-details',
    name: 'Profile Details',
    description: 'Profile details grid with user information',
    pageId: 'page-profile',
    type: 'section',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'comp-profile-stats',
    name: 'Profile Stats',
    description: 'Profile statistics footer - Admin only',
    pageId: 'page-profile',
    type: 'section',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'comp-role-section',
    name: 'Role Section',
    description: 'User roles display section',
    pageId: 'page-profile',
    type: 'section',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

const componentPermissions: ComponentPermission[] = [
  // Profile Icon - Admin only
  {
    id: 'cp-1',
    componentId: 'comp-profile-icon',
    permissionId: 2,
    isRequired: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  // Profile Header - All users with profile view permission
  {
    id: 'cp-2',
    componentId: 'comp-profile-header',
    permissionId: 1,
    isRequired: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  // Profile Details - All users with profile view permission
  {
    id: 'cp-3',
    componentId: 'comp-profile-details',
    permissionId: 1,
    isRequired: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  // Profile Stats - Admin only
  {
    id: 'cp-4',
    componentId: 'comp-profile-stats',
    permissionId: 3,
    isRequired: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  // Role Section - All users with role view permission
  {
    id: 'cp-5',
    componentId: 'comp-role-section',
    permissionId: 5,
    isRequired: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

const rolePermissions: RolePermission[] = [
  // Admin - All permissions
  { id: 'rp-1', roleId: 'admin', permissionId: 1, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-2', roleId: 'admin', permissionId: 2, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-3', roleId: 'admin', permissionId: 3, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-4', roleId: 'admin', permissionId: 4, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-5', roleId: 'admin', permissionId: 5, createdAt: '2023-01-01T00:00:00.000Z' },
  
  // Teacher - Limited permissions (no profile icon access)
  { id: 'rp-6', roleId: 'teacher', permissionId: 1, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-7', roleId: 'teacher', permissionId: 5, createdAt: '2023-01-01T00:00:00.000Z' },
  
  // Student - Basic permissions (no profile icon access)
  { id: 'rp-8', roleId: 'student', permissionId: 1, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-9', roleId: 'student', permissionId: 5, createdAt: '2023-01-01T00:00:00.000Z' },
  
  // Librarian - Basic permissions (no profile icon access)
  { id: 'rp-10', roleId: 'librarian', permissionId: 1, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-11', roleId: 'librarian', permissionId: 5, createdAt: '2023-01-01T00:00:00.000Z' },
  
  // Medical - Basic permissions (no profile icon access)
  { id: 'rp-12', roleId: 'medical', permissionId: 1, createdAt: '2023-01-01T00:00:00.000Z' },
  { id: 'rp-13', roleId: 'medical', permissionId: 5, createdAt: '2023-01-01T00:00:00.000Z' },
];

// API delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const getUserPermissions = async (userRoles: UserRole[]): Promise<Permission[]> => {
  await delay(200);
  const userRolePermissions = rolePermissions.filter(rp => userRoles.includes(rp.roleId));
  const permissionIds = userRolePermissions.map(rp => rp.permissionId);
  return permissions.filter(p => permissionIds.includes(p.permission_id));
};

export const checkComponentAccess = async (componentId: string, userRoles: UserRole[]): Promise<boolean> => {
  await delay(100);
  
  // Get component permissions
  const compPermissions = componentPermissions.filter(cp => cp.componentId === componentId);
  if (compPermissions.length === 0) return true; // No permissions required
  
  // Get user permissions
  const userPermissions = await getUserPermissions(userRoles);
  const userPermissionIds = userPermissions.map(p => p.permission_id);
  
  // Check if user has all required permissions
  const requiredPermissions = compPermissions.filter(cp => cp.isRequired);
  return requiredPermissions.every(cp => userPermissionIds.includes(cp.permissionId));
};

export const getPageComponents = async (pageId: string): Promise<ComponentDefinition[]> => {
  await delay(200);
  return components.filter(c => c.pageId === pageId && c.isActive);
};

export const getAccessibleComponents = async (pageId: string, userRoles: UserRole[]): Promise<ComponentDefinition[]> => {
  await delay(300);
  
  const pageComponents = await getPageComponents(pageId);
  const accessibleComponents: ComponentDefinition[] = [];
  
  for (const component of pageComponents) {
    const hasAccess = await checkComponentAccess(component.id, userRoles);
    if (hasAccess) {
      accessibleComponents.push(component);
    }
  }
  
  return accessibleComponents;
};

export const getAllPermissions = async (): Promise<Permission[]> => {
  await delay(200);
  return [...permissions];
};

export const getAllPages = async (): Promise<PageDefinition[]> => {
  await delay(200);
  return [...pages];
};

export const getAllComponents = async (): Promise<ComponentDefinition[]> => {
  await delay(200);
  return [...components];
};

export const getComponentPermissions = async (componentId: string): Promise<ComponentPermission[]> => {
  await delay(200);
  return componentPermissions.filter(cp => cp.componentId === componentId);
};

// Helper function to check if user has specific permission
export const hasPermission = async (userRoles: UserRole[], permissionName: string): Promise<boolean> => {
  await delay(100);
  const userPermissions = await getUserPermissions(userRoles);
  return userPermissions.some(p => p.name === permissionName);
};

// Helper function to check profile icon access specifically
export const checkProfileIconAccess = async (userRoles: UserRole[]): Promise<boolean> => {
  await delay(100);
  return await checkComponentAccess('comp-profile-icon', userRoles);
};