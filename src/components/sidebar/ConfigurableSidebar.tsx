import AppLogo from '@/components/AppLogo';
import {
    getFilteredModules,
    getFilteredSubModules,
    getIconComponent,
    subModulesConfig,
} from '@/config/sidebar.config';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { type SidebarModuleConfig, type SidebarSubModuleConfig } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfigurableSidebar = () => {
  const { currentRole, user } = useAuthStore();
  const [activeModule, setActiveModule] = useState<string | null>('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get user roles as an array
  const userRoles = user?.roles || (currentRole ? [currentRole] : []);

  // Filter modules and submodules based on user role
  const filteredModules = getFilteredModules(userRoles);
  const filteredSubModules = getFilteredSubModules(undefined, userRoles);

  // Check if a path is active
  const isActivePath = (path: string) => location.pathname === path;
  console.log(location.pathname);
  // Check if a path is active or a parent path
  const isActiveOrParent = (path: string) => location.pathname.startsWith(path);

  // Check if a module has any active submodule
  const hasActiveSubModule = (moduleId: string) => {
    return filteredSubModules
      .filter(sm => sm.moduleId === moduleId)
      .some(sm => location.pathname.startsWith(sm.path));
  };

  // Toggle expanded state for items with children
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Set active module based on current path
  useEffect(() => {
    const currentSubModule = subModulesConfig.find(sm => location.pathname.startsWith(sm.path));
    if (currentSubModule) {
      setActiveModule(currentSubModule.moduleId);

      // Auto-expand parent items based on current path
      const pathParts = location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 1) {
        const potentialParentPaths = pathParts.reduce((paths, _, index, array) => {
          if (index > 0) {
            paths.push('/' + array.slice(0, index + 1).join('/'));
          }
          return paths;
        }, [] as string[]);

        // Find and expand parent items
        subModulesConfig.forEach(sm => {
          if (sm.children && potentialParentPaths.includes(sm.path)) {
            setExpandedItems(prev => (!prev.includes(sm.id) ? [...prev, sm.id] : prev));
          }
        });
      }
    } else if (location.pathname === '/admin/dashboard') {
      setActiveModule('dashboard');
    }
  }, [location.pathname]);

  //   useEffect(() => {
  //     if (currentRole) {
  //       // Reset sidebar state when role changes
  //       const availableModules = modulesConfig.filter(
  //         module => !module.requiredRoles || module.requiredRoles.includes(currentRole)
  //       );

  //       // Update filtered modules based on current role only, not all user roles
  //       const filteredModules = getFilteredModules([currentRole]);

  //       if (availableModules.length > 0) {
  //         const firstModule = availableModules[0];
  //         const firstSubModule = subModulesConfig.find(
  //           sm => sm.moduleId === firstModule.id &&
  //           (!sm.requiredRoles || sm.requiredRoles.includes(currentRole))
  //         );

  //         if (firstSubModule && !location.pathname.startsWith(firstSubModule.path)) {
  //           navigate(firstSubModule.path);
  //           setActiveModule(firstModule.id);
  //         }
  //       }
  //     }
  //   // Only run when role changes
  //   }, [currentRole, navigate]);

  // Filter submodules based on search query
  const filteredBySearchSubModules =
    searchQuery.trim() === ''
      ? filteredSubModules
      : filteredSubModules.filter(
          sm =>
            sm.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sm.path.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Render a submodule item
  const renderSubModuleItem = (subModule: SidebarSubModuleConfig, level = 0) => {
    const hasChildren = subModule.children && subModule.children.length > 0;
    const isExpanded = expandedItems.includes(subModule.id);
    const isActive = isActivePath(subModule.path);
    const isParentActive = isActiveOrParent(subModule.path);

    return (
      <div key={subModule.id} className="mb-1">
        <div
          className={cn(
            'flex items-center px-3 py-2 rounded-md text-sm transition-colors',
            'hover:bg-muted/50 cursor-pointer',
            isActive ? 'bg-muted/80 text-primary font-medium' : 'text-foreground/80',
            isParentActive && !isActive && 'text-foreground/90',
            level > 0 && 'ml-4 text-xs'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(subModule.id);
            } else {
              navigate(subModule.path);
            }
          }}
        >
          {subModule.icon && (
            <div className="mr-2 text-foreground/70">
              {getIconComponent(subModule.icon, subModule.iconSize || 16)}
            </div>
          )}
          <span className="flex-1">{subModule.label}</span>

          {typeof subModule.badge === 'number' && subModule.badge > 0 && (
            <span className="flex items-center justify-center h-5 w-5 text-xs rounded-full bg-primary text-primary-foreground">
              {subModule.badge}
            </span>
          )}

          {hasChildren && (
            <ChevronRight
              className={cn('h-4 w-4 transition-transform', isExpanded && 'transform rotate-90')}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 pl-4 border-l border-border/50 ml-4">
            {subModule.children?.map(child =>
              renderSubModuleItem(
                {
                  ...child,
                  moduleId: subModule.moduleId,
                  path: child.path,
                },
                level + 1
              )
            )}
          </div>
        )}
      </div>
    );
  };

  // Render module icon
  const renderModuleIcon = (module: SidebarModuleConfig) => {
    const isActive = activeModule === module.id;
    const isModuleActive = hasActiveSubModule(module.id);

    return (
      <div
        key={module.id}
        className={cn(
          'flex items-center justify-center w-12 h-12 mb-2 rounded-md cursor-pointer transition-all',
          isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50 text-foreground/70',
          isModuleActive && !isActive && 'text-foreground'
        )}
        onClick={() => setActiveModule(module.id)}
      >
        {getIconComponent(module.icon, module.iconSize || 20)}
      </div>
    );
  };

  return (
    <div className="flex h-screen border-r border-border">
      {/* Module icons sidebar */}
      <div className="w-16 h-full bg-background flex flex-col items-center py-4 border-r border-border">
        <div className="mb-6">
          <AppLogo collapsed={true} className="w-10 h-10" />
        </div>

        <div className="flex-1 flex flex-col items-center">
          {filteredModules.map(renderModuleIcon)}
        </div>
      </div>

      {/* Submodules sidebar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-64 h-full bg-background flex flex-col"
        >
          {/* Header with module name */}
          <div className="h-16 flex items-center px-4 border-b border-border">
            <h2 className="text-lg font-medium">
              {filteredModules.find(m => m.id === activeModule)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Search box */}
          <div className="px-3 py-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-muted/50 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Submodules list */}
          <div className="flex-1 overflow-y-auto py-3 px-2">
            {activeModule &&
              filteredBySearchSubModules
                .filter(sm => sm.moduleId === activeModule)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(subModule => renderSubModuleItem(subModule))}

            {/* Show search results from other modules when searching */}
            {searchQuery.trim() !== '' && (
              <>
                {filteredBySearchSubModules.filter(sm => sm.moduleId !== activeModule).length >
                  0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <h3 className="px-3 mb-2 text-xs uppercase text-muted-foreground">
                      Other Modules
                    </h3>
                    {filteredBySearchSubModules
                      .filter(sm => sm.moduleId !== activeModule)
                      .map(subModule => renderSubModuleItem(subModule))}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConfigurableSidebar;
