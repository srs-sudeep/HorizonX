import { UserRole } from '@/types';
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  name: string;
  idNumber: string;
  ldapid: string;
  is_active: boolean;
  roles: UserRole[];
  created_at: string;
  updated_at: string;
}
