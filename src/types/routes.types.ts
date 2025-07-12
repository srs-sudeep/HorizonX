import { UserRole } from './roles.types';
export interface RouteAccess {
  path: string;
  allowedRoles: UserRole[];
}
export interface UserRoute {
  path: string;
  is_active: boolean;
  module_id: number;
  id: number;
  role_ids: string[];
}
