export interface Route {
  route_id: number;
  path: string;
  label: string;
  icon: string | null;
  is_active: boolean;
  is_sidebar: boolean;
  module_id: number;
  parent_id: number | null;
  role_ids: number[];
  created_at: string;
  updated_at: string;
}
