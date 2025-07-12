import { lazy } from 'react';
import { Loadable } from '@/components';

/**
 * Lazy loads a component with Suspense handling
 * @param importFunc - Dynamic import function
 * @returns Wrapped component with Suspense
 */
const lazyLoad = (importFunc: () => Promise<any>) => {
  return Loadable(lazy(importFunc));
};

export default lazyLoad;
