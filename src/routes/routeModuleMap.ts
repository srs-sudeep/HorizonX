// routes/routeModuleMap.ts
import AcademicsRoutes from '@/routes/Academics';
import AdminRoutes from '@/routes/AdminRoutes';
import DashboardRoutes from '@/routes/DashboardRoutes';
// import LibraryRoutes from '@/routes/Library';
// import MedicalRoutes from '@/routes/Medical';

import { type RouteObject } from 'react-router-dom';

export type RouteModuleKey = 'dashboard' | 'admin' | 'academics'; // Extend as needed

export const routeModuleMap: Record<RouteModuleKey, RouteObject> = {
  dashboard: DashboardRoutes,
  admin: AdminRoutes,
  academics: AcademicsRoutes,
  // library: LibraryRoutes,
};
