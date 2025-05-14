import { Button } from '@/components/ui/button';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { isAuthenticated, currentRole } = useAuthStore();


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to School Management System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform for managing educational institutions, connecting students,
          teachers, and administrators.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        {isAuthenticated ? (
          <Button asChild size="lg" className="px-8 text-lg h-12">
            <Link to={getDashboardLink(currentRole)} className="gap-2">
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild size="lg" className="px-8 text-lg h-12">
              <Link to="/login" className="gap-2">
                Login <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 text-lg h-12">
              <Link to="/register">Create Account</Link>
            </Button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">For Students</h3>
          <p className="text-muted-foreground mb-4">
            Access your courses, assignments, grades, and communicate with teachers.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">For Teachers</h3>
          <p className="text-muted-foreground mb-4">
            Manage your classes, track student progress, and create engaging content.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">For Administrators</h3>
          <p className="text-muted-foreground mb-4">
            Oversee the entire institution, manage users, and analyze performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
