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

export interface RouteComponentResponse {
  route_id: number;
  component_ids: string[];
}

export interface RouteComponentPayload {
  route_id: number;
  component_id: string;
}