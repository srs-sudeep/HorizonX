import React, { createContext, useContext } from 'react';
import { useUserComponents } from '@/hooks';

type ProtectedComponentContextType = {
  allowedComponentIds: string[];
  isLoading: boolean;
};

const ProtectedComponentContext = createContext<ProtectedComponentContextType>({
  allowedComponentIds: [],
  isLoading: false,
});

export const useProtectedComponentContext = () => useContext(ProtectedComponentContext);

export const ProtectedComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading } = useUserComponents();
  const allowedComponentIds = data?.component_ids || [];

  return (
    <ProtectedComponentContext.Provider value={{ allowedComponentIds, isLoading }}>
      {children}
    </ProtectedComponentContext.Provider>
  );
};