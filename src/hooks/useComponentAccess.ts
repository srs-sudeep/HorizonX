import { useState, useEffect } from 'react';
import { type UserRole } from '@/types';
import { checkComponentAccess, getUserPermissions, checkProfileIconAccess } from '@/api/mockAPI.api';
import type { Permission } from '@/types';

export const useComponentAccess = (componentId: string, userRoles: UserRole[]) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      try {
        const access = await checkComponentAccess(componentId, userRoles);
        setHasAccess(access);
      } catch (error) {
        console.error('Error checking component access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRoles.length > 0) {
      checkAccess();
    } else {
      setHasAccess(false);
      setIsLoading(false);
    }
  }, [componentId, userRoles]);

  return { hasAccess, isLoading };
};

export const useProfileIconAccess = (userRoles: UserRole[]) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      try {
        const access = await checkProfileIconAccess(userRoles);
        setHasAccess(access);
      } catch (error) {
        console.error('Error checking profile icon access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRoles.length > 0) {
      checkAccess();
    } else {
      setHasAccess(false);
      setIsLoading(false);
    }
  }, [userRoles]);

  return { hasAccess, isLoading };
};

export const useUserPermissions = (userRoles: UserRole[]) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPermissions = async () => {
      setIsLoading(true);
      try {
        const userPermissions = await getUserPermissions(userRoles);
        setPermissions(userPermissions);
      } catch (error) {
        console.error('Error getting user permissions:', error);
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRoles.length > 0) {
      getPermissions();
    } else {
      setPermissions([]);
      setIsLoading(false);
    }
  }, [userRoles]);

  return { permissions, isLoading };
};