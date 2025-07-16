import { UserRole } from '@/types';
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  name: string;
  phoneNumber: string;
  email: string;
  username: string;
  is_active: boolean;
  roles: UserRole[];
  created_at: string;
  updated_at: string;
}

export interface userComponents {
  components: string[];
}