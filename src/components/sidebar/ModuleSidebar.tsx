
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import AppLogo from '@/components/AppLogo';
import useAuthStore from '@/store/useAuthStore';
import {
  getFilteredModules,
  getFilteredSubModules,
  getIconComponent,
  type SidebarSubModuleConfig
} from '@/config/sidebar.config';

const ModuleSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [openSubModules, setOpenSubModules] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useAuthStore();
  
  // Get filtered modules based on user roles
  const modules = getFilteredModules(user?.roles);
  
  // Toggle module open/closed state
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  // Toggle submodule open/closed state
  const toggleSubModule = (subModuleId: string) => {
    setOpenSubModules(prev => 
      prev.includes(subModuleId)
        ? prev.filter(id => id !== subModuleId)
        : [...prev, subModuleId]
    );
  };
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Open modules and submodules based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which submodule matches the current path
    const findMatchingSubModule = (subModules: SidebarSubModuleConfig[]): string | null => {
      for (const subModule of subModules) {
        if (isActive(subModule.path)) {
          return subModule.id;
        }
        
        if (subModule.children) {
          const childMatch = findMatchingSubModule(subModule.children);
          if (childMatch) {
            setOpenSubModules(prev => [...prev, subModule.id]);
            return childMatch;
          }
        }
      }
      return null;
    };
    
    // For each module, check if it or any of its submodules match the current path
    modules.forEach(module => {
      const subModules = getFilteredSubModules(module.id, user?.roles);
      const matchingSubModule = findMatchingSubModule(subModules);
      
      if (matchingSubModule) {
        setOpenModules(prev => [...prev, module.id]);
      }
    });
  }, [location.pathname, modules, user?.roles]);
  
  // Render a submodule and its children recursively
  const renderSubModule = (subModule: SidebarSubModuleConfig, depth = 0) => {
    const hasChildren = subModule.children && subModule.children.length > 0;
    const isSubModuleOpen = openSubModules.includes(subModule.id);
    const active = isActive(subModule.path);
    
    return (
      <div key={subModule.id} className="flex flex-col">
        <Link
          to={subModule.path}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
            "hover:bg-sidebar-accent/10",
            active 
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
              : "text-sidebar-foreground/80",
            depth > 0 && "ml-4",
            collapsed && "justify-center px-0"
          )}
        >
          {subModule.icon && (
            <div className="flex-shrink-0">
              {getIconComponent(subModule.icon, subModule.iconSize || 16)}
            </div>
          )}
          
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{subModule.label}</span>
              
              {subModule.badge && (
                <Badge variant="default" className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {subModule.badge}
                </Badge>
              )}
              
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-sidebar-accent/20"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubModule(subModule.id);
                  }}
                >
                  {isSubModuleOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </>
          )}
        </Link>
        
        {hasChildren && isSubModuleOpen && !collapsed && (
          <div className="ml-4 mt-1 space-y-1">
            {subModule.children?.map(child => renderSubModule(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <AppLogo collapsed={collapsed} className="text-sidebar-foreground" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Modules */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {modules.map(module => {
            const isModuleOpen = openModules.includes(module.id);
            const subModules = getFilteredSubModules(module.id, user?.roles);
            
            return (
              <div key={module.id} className="flex flex-col">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-sidebar-accent/10 text-sidebar-foreground",
                    collapsed && "justify-center px-0"
                  )}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-2">
                    {module.icon && (
                      <div className="flex-shrink-0">
                        {getIconComponent(module.icon, module.iconSize || 20)}
                      </div>
                    )}
                    
                    {!collapsed && <span>{module.label}</span>}
                  </div>
                  
                  {!collapsed && subModules.length > 0 && (
                    <div>
                      {isModuleOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </Button>
                
                {isModuleOpen && !collapsed && subModules.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {subModules.map(subModule => renderSubModule(subModule))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModuleSidebar;
