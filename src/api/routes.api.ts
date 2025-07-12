import { apiClient } from '@/core';
import { type UserRoute } from '@/types';

/**
 * Fetches the user-specific routes from the API.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of route paths.
 */
export const fetchUserRoutes = async (): Promise<string[]> => {
  const { data } = await apiClient.get<UserRoute[]>('/core/api/v1/routes/my-routes', {
    silentError: false,
    headers: {
      'x-error-context': 'Fetching Sidebar Modules',
    },
  });
  return data.filter(route => route.is_active).map(route => route.path);
};
