import { getFilteredModules, getHierarchicalSubModules } from '@/api/sidebarApi';
import AppLogo from '@/components/AppLogo';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useSidebar } from '@/core/context/sidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { type HierarchicalSubModule, iconMap, type SidebarModuleItem } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Helper function to get icon component
const getIconComponent = (iconName: keyof typeof iconMap, size: number = 24) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent size={size} /> : null;
};

const ModuleSidebar = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<SidebarModuleItem[]>([]);
  const [subModulesMap, setSubModulesMap] = useState<Record<string, HierarchicalSubModule[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole } = useAuthStore();
  // Check if a module has any active submodule
  const hasActiveSubModule = useCallback(
    (subModules: HierarchicalSubModule[], path: string): boolean => {
      for (const subModule of subModules) {
        if (path.startsWith(subModule.path)) return true;
        if (subModule.children?.length) {
          if (hasActiveSubModule(subModule.children, path)) return true;
        }
      }
      return false;
    },
    [] // Add any real dependencies here if needed
  );
  // Fetch sidebar data based on user roles
  useEffect(() => {
    const fetchSidebarData = async () => {
      setIsLoading(true);
      try {
        if (!currentRole) {
          setModules([]);
          setSubModulesMap({});
          return;
        }

        // Fetch modules filtered by user roles
        const filteredModules = await getFilteredModules(currentRole);
        setModules(filteredModules);

        // Fetch hierarchical submodules for each module
        const subModulesData: Record<string, HierarchicalSubModule[]> = {};

        for (const module of filteredModules) {
          const hierarchicalSubModules = await getHierarchicalSubModules(module.id, currentRole);
          subModulesData[module.id] = hierarchicalSubModules;
        }

        setSubModulesMap(subModulesData);

        // Set active module based on current path if not already set
        if (!activeModule && filteredModules.length > 0) {
          // Find which module has a submodule matching the current path
          let foundModule = false;
          for (const module of filteredModules) {
            const subModules = subModulesData[module.id] || [];
            if (hasActiveSubModule(subModules, location.pathname)) {
              setActiveModule(module.id);
              foundModule = true;
              break;
            }
          }

          // If no match found, set the first module as active
          if (!foundModule) {
            setActiveModule(filteredModules[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch sidebar data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSidebarData();
  }, [currentRole, location.pathname]);

  // Check if a path is active
  const isActivePath = (path: string) => location.pathname === path;

  // Check if a path is active or a parent path
  const isActiveOrParent = (path: string) => location.pathname.startsWith(path);

  // Toggle expanded state for items with children
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Set active module based on current path
  useEffect(() => {
    if (!isLoading && modules.length > 0) {
      // Find which module has a submodule matching the current path
      for (const module of modules) {
        const subModules = subModulesMap[module.id] || [];
        if (hasActiveSubModule(subModules, location.pathname)) {
          setActiveModule(module.id);

          // Auto-expand parent items based on current path
          const expandParents = (items: HierarchicalSubModule[]) => {
            for (const item of items) {
              if (location.pathname.startsWith(item.path)) {
                if (item.children && item.children.length > 0) {
                  setExpandedItems(prev => (!prev.includes(item.id) ? [...prev, item.id] : prev));
                  expandParents(item.children);
                }
              } else if (item.children) {
                expandParents(item.children);
              }
            }
          };

          expandParents(subModules);
          break;
        }
      }
    }
  }, [isLoading, modules, subModulesMap, location.pathname]);

  // Filter submodules based on search query
  const getFilteredBySearchSubModules = () => {
    if (searchQuery.trim() === '' || !activeModule) {
      return subModulesMap[activeModule || ''] || [];
    }

    const searchInSubModules = (items: HierarchicalSubModule[]): HierarchicalSubModule[] => {
      const result: HierarchicalSubModule[] = [];

      for (const item of items) {
        const matchesSearch =
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.path.toLowerCase().includes(searchQuery.toLowerCase());

        const childMatches = item.children ? searchInSubModules(item.children) : [];

        if (matchesSearch || childMatches.length > 0) {
          result.push({
            ...item,
            children: childMatches.length > 0 ? childMatches : item.children,
          });
        }
      }

      return result;
    };

    return searchInSubModules(subModulesMap[activeModule] || []);
  };

  // Render a submodule item
  const renderSubModuleItem = (subModule: HierarchicalSubModule, level = 0) => {
    const hasChildren = subModule.children && subModule.children.length > 0;
    const isExpanded = expandedItems.includes(subModule.id);
    const isActive = isActivePath(subModule.path);
    const isParentActive = isActiveOrParent(subModule.path);

    return (
      <div key={subModule.id} className="mb-1">
        <div
          className={cn(
            'flex items-center px-3 py-2 rounded-md text-sm transition-colors',
            'hover:bg-sidebar-accent/10 cursor-pointer',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
              : 'text-sidebar-foreground/80',
            isParentActive && !isActive && 'text-sidebar-foreground/90',
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
            <div className="mr-2 text-sidebar-foreground/70">
              {getIconComponent(subModule.icon, subModule.iconSize || 16)}
            </div>
          )}
          <span className="flex-1 truncate">{subModule.label}</span>

          {typeof subModule.badge === 'number' && subModule.badge > 0 && (
            <Badge
              variant="default"
              className="ml-2 bg-sidebar-primary text-sidebar-primary-foreground"
            >
              {subModule.badge}
            </Badge>
          )}

          {hasChildren && (
            <ChevronRight
              className={cn('h-4 w-4 transition-transform', isExpanded && 'transform rotate-90')}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 pl-4 border-l border-sidebar-border/50 ml-4">
            {subModule.children?.map(child => renderSubModuleItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Render module icon
  const renderModuleIcon = (module: SidebarModuleItem) => {
    const isActive = activeModule === module.id;
    const isModuleActive =
      activeModule === module.id ||
      hasActiveSubModule(subModulesMap[module.id] || [], location.pathname);

    return (
      <div
        key={module.id}
        className={cn(
          'flex items-center justify-center w-12 h-12 mb-2 rounded-md cursor-pointer transition-all',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'hover:bg-sidebar-accent/10 text-sidebar-foreground/70',
          isModuleActive && !isActive && 'text-sidebar-foreground'
        )}
        onClick={() => setActiveModule(module.id)}
      >
        {getIconComponent(module.icon, module.iconSize || 20)}
      </div>
    );
  };

  const sideBarcontent = (
    <div className="h-full flex">
      {/* Sidebar content inside Drawer */}
      <div className="w-full h-full">
        {/* Paste full sidebar JSX here */}
        <div className="flex h-screen border-r border-sidebar-border">
          {/* Module icons sidebar */}
          <div className="w-16 h-full bg-sidebar flex flex-col items-center py-4 border-r border-sidebar-border">
            <div className="mb-6">
              <AppLogo short className="w-10 h-10 text-sidebar-foreground" />
            </div>

            <div className="flex-1 flex flex-col items-center">{modules.map(renderModuleIcon)}</div>
          </div>

          {/* Submodules sidebar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-64 h-full bg-sidebar flex flex-col"
            >
              <AppLogo name className="m-2 pt-3" />
              {/* Header with module name */}
              <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
                <h2 className="text-lg font-medium text-sidebar-foreground">
                  {modules.find(m => m.id === activeModule)?.label || 'Dashboard'}
                </h2>
              </div>

              {/* Search box */}
              <div className="px-3 py-2 border-b border-sidebar-border">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-sidebar-foreground/70" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-2 text-sm bg-sidebar-accent/10 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-sidebar-accent text-sidebar-foreground"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Submodules list */}
              <ScrollArea className="flex-1">
                {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sidebar-accent"></div>
                  </div>
                ) : (
                  <div className="py-3 px-2">
                    {activeModule &&
                      getFilteredBySearchSubModules().map(subModule =>
                        renderSubModuleItem(subModule)
                      )}

                    {/* Show search results from other modules when searching */}
                    {searchQuery.trim() !== '' && (
                      <>
                        {Object.entries(subModulesMap)
                          .filter(([moduleId]) => moduleId !== activeModule)
                          .flatMap(([moduleId, subModules]) => {
                            const filteredSubModules = subModules.filter(
                              sm =>
                                sm.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                sm.path.toLowerCase().includes(searchQuery.toLowerCase())
                            );

                            return filteredSubModules.length > 0 ? (
                              <div
                                key={moduleId}
                                className="mt-4 pt-4 border-t border-sidebar-border/50"
                              >
                                <h3 className="px-3 mb-2 text-xs uppercase text-sidebar-foreground/60">
                                  {modules.find(m => m.id === moduleId)?.label || moduleId}
                                </h3>
                                {filteredSubModules.map(subModule =>
                                  renderSubModuleItem(subModule)
                                )}
                              </div>
                            ) : null;
                          })}
                      </>
                    )}
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={closeSidebar}>
          <SheetTitle hidden></SheetTitle>
          <SheetContent
            side="left"
            className="p-0 w-[280px] bg-sidebar border-r border-sidebar-border"
          >
            {sideBarcontent}
          </SheetContent>
        </Sheet>
      ) : (
        sideBarcontent
      )}
    </>
  );
};

export default ModuleSidebar;
