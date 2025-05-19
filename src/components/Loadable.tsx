import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

/**
 * Wraps a lazy-loaded component with Suspense
 * @param Component - The lazy-loaded component
 * @returns The component wrapped with Suspense
 */
const Loadable = <P extends object>(
  Component: React.LazyExoticComponent<React.ComponentType<P>>
) => {
  return (props: P) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
