
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Book, 
  Library, 
  Heart,
  Settings,
  ChevronRight,
  Users,
  FileText,
  Calendar,
  Building,
  BarChart,
  GraduationCap,
  BookOpen,
  Mail,
  MessageSquare,
  Bell,
  Search
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import AppLogo from '@/components/AppLogo';

interface ModuleItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  requiredRoles?: string[];
}

interface SubModuleItem {
  id: string;
  moduleId: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  requiredRoles?: string[];
  badge?: number;
  children?: Omit<SubModuleItem, 'moduleId'>[];
}

const modules: ModuleItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: <LayoutDashboard size={20} /> 
  },
  { 
    id: 'academics', 
    label: 'Academics', 
    icon: <Book size={20} />,
    requiredRoles: ['admin', 'teacher', 'student'] 
  },
  { 
    id: 'library', 
    label: 'Library', 
    icon: <Library size={20} />,
    requiredRoles: ['admin', 'librarian', 'teacher', 'student'] 
  },
  { 
    id: 'medical', 
    label: 'Medical', 
    icon: <Heart size={20} />,
    requiredRoles: ['admin', 'medical'] 
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: <MessageSquare size={20} />,
    requiredRoles: ['admin', 'teacher', 'student', 'librarian', 'medical'] 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings size={20} /> 
  },
];

const subModules: SubModuleItem[] = [
  // Dashboard submodules
  { id: 'main-dashboard', moduleId: 'dashboard', label: 'Main Dashboard', path: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'analytics', moduleId: 'dashboard', label: 'Analytics', path: '/dashboard/analytics', icon: <BarChart size={16} /> },
  
  // Academics submodules
  { 
    id: 'courses', 
    moduleId: 'academics', 
    label: 'Courses', 
    path: '/academics/courses', 
    icon: <GraduationCap size={16} />,
    children: [
      { id: 'course-list', label: 'Course List', path: '/academics/courses/list', icon: <FileText size={14} />, badge: 5 },
      { id: 'course-details', label: 'Course Details', path: '/academics/courses/details', icon: <FileText size={14} /> },
      { 
        id: 'course-materials', 
        label: 'Course Materials', 
        path: '/academics/courses/materials', 
        icon: <BookOpen size={14} />,
        children: [
          { id: 'books', label: 'Books', path: '/academics/courses/materials/books', icon: <Book size={12} /> },
          { id: 'videos', label: 'Videos', path: '/academics/courses/materials/videos', icon: <FileText size={12} /> },
        ]
      }
    ]
  },
  { id: 'students', moduleId: 'academics', label: 'Students', path: '/academics/students', icon: <Users size={16} />, requiredRoles: ['admin', 'teacher'] },
  { id: 'teachers', moduleId: 'academics', label: 'Teachers', path: '/academics/teachers', icon: <Users size={16} />, requiredRoles: ['admin'] },
  { id: 'schedule', moduleId: 'academics', label: 'Schedule', path: '/academics/schedule', icon: <Calendar size={16} /> },
  
  // Library submodules
  { id: 'books', moduleId: 'library', label: 'Books', path: '/library/books', icon: <Book size={16} /> },
  { id: 'borrowings', moduleId: 'library', label: 'Borrowings', path: '/library/borrowings', icon: <FileText size={16} /> },
  { 
    id: 'digital', 
    moduleId: 'library', 
    label: 'Digital Resources', 
    path: '/library/digital', 
    icon: <FileText size={16} />,
    children: [
      { id: 'ebooks', label: 'E-Books', path: '/library/digital/ebooks', icon: <Book size={14} /> },
      { id: 'journals', label: 'Journals', path: '/library/digital/journals', icon: <FileText size={14} /> }
    ]
  },
  
  // Medical submodules
  { id: 'patients', moduleId: 'medical', label: 'Patients', path: '/medical/patients', icon: <Users size={16} /> },
  { id: 'appointments', moduleId: 'medical', label: 'Appointments', path: '/medical/appointments', icon: <Calendar size={16} /> },
  { id: 'records', moduleId: 'medical', label: 'Medical Records', path: '/medical/records', icon: <FileText size={16} /> },
  
  // Communication submodules
  { id: 'emails', moduleId: 'communication', label: 'Emails', path: '/communication/emails', icon: <Mail size={16} />, badge: 3 },
  { id: 'messages', moduleId: 'communication', label: 'Messages', path: '/communication/messages', icon: <MessageSquare size={16} />, badge: 7 },
  { id: 'notifications', moduleId: 'communication', label: 'Notifications', path: '/communication/notifications', icon: <Bell size={16} /> },
  
  // Settings submodules
  { id: 'profile', moduleId: 'settings', label: 'Profile', path: '/settings/profile', icon: <Users size={16} /> },
  { id: 'system', moduleId: 'settings', label: 'System', path: '/settings/system', icon: <Settings size={16} />, requiredRoles: ['admin'] },
  { id: 'organization', moduleId: 'settings', label: 'Organization', path: '/settings/organization', icon: <Building size={16} />, requiredRoles: ['admin'] },
];

const ModuleSidebar = () => {
  const { currentRole } = useAuthStore();
  const [activeModule, setActiveModule] = useState<string | null>('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Filter modules and submodules based on user role
  const filteredModules = modules.filter(module => 
    !module.requiredRoles || !currentRole || module.requiredRoles.includes(currentRole)
  );

  const filteredSubModules = subModules.filter(subModule => 
    (!subModule.requiredRoles || !currentRole || subModule.requiredRoles.includes(currentRole))
  );

  // Check if a path is active
  const isActivePath = (path: string) => location.pathname === path;
  
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
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Set active module based on current path
  useEffect(() => {
    const currentModule = subModules.find(sm => location.pathname.startsWith(sm.path));
    if (currentModule) {
      setActiveModule(currentModule.moduleId);
      
      // Auto-expand parent items based on current path
      const pathParts = location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 2) {
        const potentialParentPaths = pathParts.reduce((paths, _, index, array) => {
          if (index > 0) {
            paths.push('/' + array.slice(0, index + 1).join('/'));
          }
          return paths;
        }, [] as string[]);
        
        // Find and expand parent items
        subModules.forEach(sm => {
          if (sm.children && potentialParentPaths.includes(sm.path)) {
            setExpandedItems(prev => !prev.includes(sm.id) ? [...prev, sm.id] : prev);
          }
        });
      }
    } else if (location.pathname === '/dashboard') {
      setActiveModule('dashboard');
    }
  }, [location.pathname]);

  // Navigate to first allowed page when role changes
  useEffect(() => {
    if (currentRole) {
      const availableModules = modules.filter(
        module => !module.requiredRoles || module.requiredRoles.includes(currentRole)
      );
      
      if (availableModules.length > 0) {
        const firstModule = availableModules[0];
        const firstSubModule = subModules.find(
          sm => sm.moduleId === firstModule.id && 
          (!sm.requiredRoles || sm.requiredRoles.includes(currentRole))
        );
        
        if (firstSubModule && !location.pathname.startsWith(firstSubModule.path)) {
          navigate(firstSubModule.path);
          setActiveModule(firstModule.id);
        }
      }
    }
  }, [currentRole, navigate, location.pathname]);

  // Recursive function to render menu items
  const renderMenuItem = (item: SubModuleItem | Omit<SubModuleItem, 'moduleId'>, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isActivePath(item.path);
    const isParent = hasChildren && item.children!.some(child => 
      location.pathname.startsWith(child.path)
    );
    
    return (
      <div key={item.id} className="flex flex-col">
        <div className="flex items-center">
          <NavLink
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm group transition-colors flex-1",
              isActive 
                ? "bg-blue-500/10 text-blue-600 font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              hasChildren ? "pr-8" : ""
            )}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleExpanded(item.id);
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-blue-500/20 text-blue-600 text-xs">
                {item.badge}
              </span>
            )}
          </NavLink>
          
          {hasChildren && (
            <button 
              className={cn(
                "p-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mr-2",
                isExpanded ? "transform rotate-90" : ""
              )}
              onClick={() => toggleExpanded(item.id)}
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className={cn(
            "pl-6 border-l border-sidebar-border/30 ml-4 mt-1 space-y-1",
            level > 0 ? "pl-4" : "pl-6"  // Adjust indentation based on nesting level
          )}>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Main Sidebar - Module Selection */}
      <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center pt-4 pb-4">
        {/* Logo at the top */}
        <div className="mb-6">
          <AppLogo collapsed={true} className="text-blue-600" />
        </div>
        
        {filteredModules.map((module) => (
          <button
            key={module.id}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center mb-2",
              "text-sidebar-foreground transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              activeModule === module.id && "bg-blue-500/10 text-blue-600"
            )}
            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            title={module.label}
          >
            {module.icon}
          </button>
        ))}
        
        <div className="mt-auto flex flex-col items-center space-y-4">
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            title="Search"
          >
            <Search size={18} />
          </button>
          <div className="h-1.5 w-1.5 rounded-full animate-pulse bg-blue-500"></div>
        </div>
      </div>
      
      {/* Sub-modules Sidebar */}
      <AnimatePresence mode="wait">
        {activeModule && (
          <motion.div
            key={activeModule}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-sidebar border-r border-sidebar-border overflow-hidden rounded-tr-xl shadow-sm"
          >
            <div className="p-4 h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                <span>{modules.find(m => m.id === activeModule)?.label}</span>
                {activeModule === 'academics' && <GraduationCap className="ml-2 h-4 w-4" />}
              </h2>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 py-1.5 text-sm w-full rounded-md bg-sidebar-accent/50 border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <nav className="space-y-1 flex-1 overflow-y-auto">
                {filteredSubModules
                  .filter(item => item.moduleId === activeModule)
                  .map((item) => renderMenuItem(item))}
              </nav>
              
              <div className="border-t border-sidebar-border/50 mt-4 pt-4 text-center text-xs text-sidebar-foreground/50">
                <p>Dashboard v1.2</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSidebar;
