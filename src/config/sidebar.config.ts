import React from 'react';
import { 
  LayoutDashboard, 
  Book, 
  Library, 
  Heart,
  Settings,
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
  Search,
  ShoppingBag,
  Home,
  User,
  Shield,
  Briefcase,
  Layers,
  PieChart,
  CreditCard,
  HelpCircle,
  FileQuestion,
  Clipboard,
  Newspaper,
  Award,
  Bookmark,
  Truck,
  Map,
  Headphones,
  Video,
  Image,
  Folder,
  Database,
  Server,
  Code,
  Terminal,
  Cloud,
  Lock,
  Key
} from 'lucide-react';
import { type UserRole } from '@/store/useAuthStore';

// Icon mapping for easy reference
export const iconMap = {
  dashboard: LayoutDashboard,
  book: Book,
  library: Library,
  heart: Heart,
  settings: Settings,
  users: Users,
  fileText: FileText,
  calendar: Calendar,
  building: Building,
  barChart: BarChart,
  graduationCap: GraduationCap,
  bookOpen: BookOpen,
  mail: Mail,
  messageSquare: MessageSquare,
  bell: Bell,
  search: Search,
  shoppingBag: ShoppingBag,
  home: Home,
  user: User,
  shield: Shield,
  briefcase: Briefcase,
  layers: Layers,
  pieChart: PieChart,
  creditCard: CreditCard,
  helpCircle: HelpCircle,
  fileQuestion: FileQuestion,
  clipboard: Clipboard,
  newspaper: Newspaper,
  award: Award,
  bookmark: Bookmark,
  truck: Truck,
  map: Map,
  headphones: Headphones,
  video: Video,
  image: Image,
  folder: Folder,
  database: Database,
  server: Server,
  code: Code,
  terminal: Terminal,
  cloud: Cloud,
  lock: Lock,
  key: Key
};

// Types for sidebar configuration
export interface SidebarModuleConfig {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles?: UserRole[];
  order?: number;
}

export interface SidebarSubModuleConfig {
  id: string;
  moduleId: string;
  label: string;
  path: string;
  icon?: keyof typeof iconMap;
  iconSize?: number;
  requiredRoles?: UserRole[];
  badge?: number | (() => number);
  order?: number;
  children?: Omit<SidebarSubModuleConfig, 'moduleId'>[];
}

// Main modules configuration
export const modulesConfig: SidebarModuleConfig[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: 'dashboard',
    iconSize: 20,
    order: 10
  },
  { 
    id: 'admin', 
    label: 'Administration', 
    icon: 'shield',
    iconSize: 20,
    requiredRoles: ['admin'],
    order: 20
  },
  { 
    id: 'academics', 
    label: 'Academics', 
    icon: 'book',
    iconSize: 20,
    requiredRoles: ['admin', 'teacher', 'student'],
    order: 30
  },
  { 
    id: 'library', 
    label: 'Library', 
    icon: 'library',
    iconSize: 20,
    requiredRoles: ['admin', 'librarian', 'teacher', 'student'],
    order: 40
  },
  { 
    id: 'medical', 
    label: 'Medical', 
    icon: 'heart',
    iconSize: 20,
    requiredRoles: ['admin', 'medical'],
    order: 50
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: 'messageSquare',
    iconSize: 20,
    requiredRoles: ['admin', 'teacher', 'student', 'librarian', 'medical'],
    order: 60
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'settings',
    iconSize: 20,
    order: 100
  },
];

// Sub-modules configuration
export const subModulesConfig: SidebarSubModuleConfig[] = [
  // Dashboard submodules
//   { 
//     id: 'main-dashboard', 
//     moduleId: 'dashboard', 
//     label: 'Main Dashboard', 
//     path: '/admin/dashboard', 
//     icon: 'dashboard', 
//     iconSize: 16,
//     order: 10
//   },
//   { 
//     id: 'analytics', 
//     moduleId: 'dashboard', 
//     label: 'Analytics', 
//     path: '/dashboard/analytics', 
//     icon: 'barChart', 
//     iconSize: 16,
//     order: 20
//   },
  
  // Admin submodules
  { 
    id: 'admin-dashboard', 
    moduleId: 'dashboard', 
    label: 'Admin Dashboard', 
    path: '/admin/dashboard', 
    icon: 'dashboard', 
    iconSize: 16,
    requiredRoles: ['admin'],
    order: 10
  },
  { 
    id: 'user-management', 
    moduleId: 'admin', 
    label: 'User Management', 
    path: '/admin/users', 
    icon: 'users', 
    iconSize: 16,
    requiredRoles: ['admin'],
    order: 20
  },
  { 
    id: 'admin-settings', 
    moduleId: 'admin', 
    label: 'System Settings', 
    path: '/admin/settings', 
    icon: 'settings', 
    iconSize: 16,
    requiredRoles: ['admin'],
    order: 30
  },
  
  // Academics submodules
  { 
    id: 'courses', 
    moduleId: 'academics', 
    label: 'Courses', 
    path: '/academics/courses', 
    icon: 'graduationCap',
    iconSize: 16,
    order: 10,
    children: [
      { 
        id: 'course-list', 
        label: 'Course List', 
        path: '/academics/courses/list', 
        icon: 'fileText', 
        iconSize: 14, 
        badge: 5,
        order: 10
      },
      { 
        id: 'course-details', 
        label: 'Course Details', 
        path: '/academics/courses/details', 
        icon: 'fileText', 
        iconSize: 14,
        order: 20
      },
      { 
        id: 'course-materials', 
        label: 'Course Materials', 
        path: '/academics/courses/materials', 
        icon: 'bookOpen', 
        iconSize: 14,
        order: 30,
        children: [
          { 
            id: 'books', 
            label: 'Books', 
            path: '/academics/courses/materials/books', 
            icon: 'book', 
            iconSize: 12,
            order: 10
          },
          { 
            id: 'videos', 
            label: 'Videos', 
            path: '/academics/courses/materials/videos', 
            icon: 'video', 
            iconSize: 12,
            order: 20
          },
        ]
      }
    ]
  },
  { 
    id: 'students', 
    moduleId: 'academics', 
    label: 'Students', 
    path: '/academics/students', 
    icon: 'users', 
    iconSize: 16, 
    requiredRoles: ['admin', 'teacher'],
    order: 20
  },
  { 
    id: 'teachers', 
    moduleId: 'academics', 
    label: 'Teachers', 
    path: '/academics/teachers', 
    icon: 'users', 
    iconSize: 16, 
    requiredRoles: ['admin'],
    order: 30
  },
  { 
    id: 'teachers dashboard', 
    moduleId: 'dashboard', 
    label: 'Teachers Dashboard', 
    path: '/teacher/dashboard', 
    icon: 'dashboard', 
    iconSize: 16, 
    requiredRoles: ['teacher'],
    order: 30
  },
  { 
    id: 'student dashboard', 
    moduleId: 'dashboard', 
    label: 'Students Dashboard', 
    path: '/student/dashboard', 
    icon: 'dashboard', 
    iconSize: 16, 
    requiredRoles: ['student'],
    order: 30
  },
  { 
    id: 'schedule', 
    moduleId: 'academics', 
    label: 'Schedule', 
    path: '/academics/schedule', 
    icon: 'calendar', 
    iconSize: 16,
    order: 40
  },
  
  // Library submodules
  { 
    id: 'books', 
    moduleId: 'library', 
    label: 'Books', 
    path: '/library/books', 
    icon: 'book', 
    iconSize: 16,
    order: 10
  },
  { 
    id: 'borrowings', 
    moduleId: 'library', 
    label: 'Borrowings', 
    path: '/library/borrowings', 
    icon: 'fileText', 
    iconSize: 16,
    order: 20
  },
  { 
    id: 'digital', 
    moduleId: 'library', 
    label: 'Digital Resources', 
    path: '/library/digital', 
    icon: 'fileText', 
    iconSize: 16,
    order: 30,
    children: [
      { 
        id: 'ebooks', 
        label: 'E-Books', 
        path: '/library/digital/ebooks', 
        icon: 'book', 
        iconSize: 14,
        order: 10
      },
      { 
        id: 'journals', 
        label: 'Journals', 
        path: '/library/digital/journals', 
        icon: 'fileText', 
        iconSize: 14,
        order: 20
      }
    ]
  },
  
  // Medical submodules
  { 
    id: 'patients', 
    moduleId: 'medical', 
    label: 'Patients', 
    path: '/medical/patients', 
    icon: 'users', 
    iconSize: 16,
    order: 10
  },
  { 
    id: 'appointments', 
    moduleId: 'medical', 
    label: 'Appointments', 
    path: '/medical/appointments', 
    icon: 'calendar', 
    iconSize: 16,
    order: 20
  },
  { 
    id: 'records', 
    moduleId: 'medical', 
    label: 'Medical Records', 
    path: '/medical/records', 
    icon: 'fileText', 
    iconSize: 16,
    order: 30
  },
  
  // Communication submodules
  { 
    id: 'emails', 
    moduleId: 'communication', 
    label: 'Emails', 
    path: '/communication/emails', 
    icon: 'mail', 
    iconSize: 16, 
    badge: 3,
    order: 10
  },
  { 
    id: 'messages', 
    moduleId: 'communication', 
    label: 'Messages', 
    path: '/communication/messages', 
    icon: 'messageSquare', 
    iconSize: 16, 
    badge: 7,
    order: 20
  },
  { 
    id: 'notifications', 
    moduleId: 'communication', 
    label: 'Notifications', 
    path: '/communication/notifications', 
    icon: 'bell', 
    iconSize: 16,
    order: 30
  },
  
  // Settings submodules
  { 
    id: 'profile', 
    moduleId: 'settings', 
    label: 'Profile', 
    path: '/settings/profile', 
    icon: 'user', 
    iconSize: 16,
    order: 10
  },
  { 
    id: 'system', 
    moduleId: 'settings', 
    label: 'System', 
    path: '/settings/system', 
    icon: 'settings', 
    iconSize: 16, 
    requiredRoles: ['admin'],
    order: 20
  },
  { 
    id: 'organization', 
    moduleId: 'settings', 
    label: 'Organization', 
    path: '/settings/organization', 
    icon: 'building', 
    iconSize: 16, 
    requiredRoles: ['admin'],
    order: 30
  },
  { 
    id: 'security', 
    moduleId: 'settings', 
    label: 'Security', 
    path: '/settings/security', 
    icon: 'lock', 
    iconSize: 16,
    order: 40
  },
];

// Helper functions to work with the configuration
export const getSortedModules = () => {
  return [...modulesConfig].sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const getSortedSubModules = (moduleId?: string) => {
  const filtered = moduleId 
    ? subModulesConfig.filter(sm => sm.moduleId === moduleId)
    : subModulesConfig;
    
  return [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const getFilteredModules = (userRoles?: UserRole[]) => {
  if (!userRoles || userRoles.length === 0) {
    return getSortedModules();
  }
  
  return getSortedModules().filter(module => 
    !module.requiredRoles || module.requiredRoles.some(role => userRoles.includes(role))
  );
};

export const getFilteredSubModules = (moduleId?: string, userRoles?: UserRole[]) => {
  if (!userRoles || userRoles.length === 0) {
    return getSortedSubModules(moduleId);
  }
  
  return getSortedSubModules(moduleId).filter(subModule => 
    !subModule.requiredRoles || subModule.requiredRoles.some(role => userRoles.includes(role))
  );
};

export const getIconComponent = (iconName: keyof typeof iconMap, size: number = 24): React.ReactNode => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? React.createElement(IconComponent, { size }) : null;
};
