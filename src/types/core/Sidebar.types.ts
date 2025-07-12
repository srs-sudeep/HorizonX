export interface SidebarSubModuleTreeItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  isActive: boolean;
  children?: SidebarSubModuleTreeItem[];
}

export interface SidebarModuleItem {
  id: string;
  label: string;
  icon?: string;
  isActive: boolean;
  subModules: SidebarSubModuleTreeItem[];
}
