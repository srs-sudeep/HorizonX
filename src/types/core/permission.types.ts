export interface Permission {
  permission_id: number;
  name: string;
  description: string;
  resource: string;
  action: string;
  created_at?: string;
  updated_at?: string;
}
