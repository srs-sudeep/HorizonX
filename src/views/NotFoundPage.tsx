
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-2xl font-bold mb-2">Page Not Found</p>
      <p className="text-muted-foreground mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link to="/">Go to Home</Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
