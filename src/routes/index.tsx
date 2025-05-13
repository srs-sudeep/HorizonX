import { useRoutes } from 'react-router-dom';
import AuthGuard from '@/core/guards/AuthGuard';

// Route modules
import LandingRoutes from '@/routes/LandingRoutes';
import AuthRoutes from '@/routes/AuthRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import TeacherRoutes from '@/routes/TeacherRoutes';
import StudentRoutes from '@/routes/StudentRoutes';
import ErrorRoutes from '@/routes/ErrorRoutes';

const Router = () => {
  const routes = useRoutes([
    // Landing page route
    LandingRoutes,
    
    // Auth routes (for guests only)
    AuthRoutes,
    
    // Protected routes (require authentication)
    {
      element: <AuthGuard />,
      children: [
        AdminRoutes,
        TeacherRoutes,
        StudentRoutes,
        // Add other role-based routes here
      ],
    },
    
    // Error routes (404, unauthorized)
    ...ErrorRoutes,
  ]);

  return routes;
};

export default Router;
