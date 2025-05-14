import { useAuthStore } from '@/store/useAuthStore';
import { AlertTriangle } from 'lucide-react';
const UnauthorizedPage = () => {
  const { currentRole } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 p-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-xl text-muted-foreground mb-6">
        You don't have permission to access this page
      </p>

      {currentRole && (
        <p className="mb-6 text-muted-foreground">
          Your current role ({currentRole}) doesn't have sufficient permissions.
        </p>
      )}
    </div>
  );
};

export default UnauthorizedPage;
