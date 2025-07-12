export interface UserRoleAPI {
  role_id: number;
  name: string;
  isAssigned: boolean;
}
export interface GetUsersParams {
  search?: string;
  status?: boolean;
  roles?: number[];
  limit?: number;
  offset?: number;
}

export interface UserAPI {
  ldapid: string;
  idNumber: string;
  name: string;
  is_active: boolean;
  roles: UserRoleAPI[];
}
export interface UserListResponse {
  total_count: number;
  users: UserAPI[];
}

export interface UserRoleFilter {
  role_id: number;
  name: string;
}

export interface UserStatusFilter {
  label: string;
  value: boolean;
}

export interface UserFiltersResponse {
  roles: UserRoleFilter[];
  status: UserStatusFilter[];
}
