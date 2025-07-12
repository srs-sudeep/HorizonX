import React from 'react';
import { useComponentAccess } from '@/hooks/useComponentAccess';
import { useAuthStore } from '@/store';
import { Loader2 } from 'lucide-react';

interface ProtectedComponentProps {
  componentId: string;
  fallback?: React.ReactNode;
  showLoader?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  componentId,
  fallback = null,
  showLoader = false,
  children,
  className = "",
}) => {
  const { user } = useAuthStore();
  const userRoles = user?.roles || [];
  const { hasAccess, isLoading } = useComponentAccess(componentId, userRoles);

  if (isLoading && showLoader) {
    return (
      <div className={`flex items-center justify-center p-2 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};