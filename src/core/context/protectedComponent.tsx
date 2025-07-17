import React from 'react';
import { Loader2 } from 'lucide-react';
import { useProtectedComponentContext } from './ProtectedComponentProvider';

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
  const { allowedComponentIds, isLoading } = useProtectedComponentContext();

  if (isLoading && showLoader) {
    return (
      <div className={`flex items-center justify-center p-2 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!allowedComponentIds.includes(componentId)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};