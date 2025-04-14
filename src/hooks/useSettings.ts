import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@services/apiClient';

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts';
    activityTracking: boolean;
  };
  theme: {
    mode: 'light' | 'dark' | 'system';
    colorScheme: string;
  };
  language: string;
}

// Service function to fetch user settings
const fetchSettings = async (): Promise<UserSettings> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.get<UserSettings>('/settings');
    
    // For now, return mock data
    return {
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        profileVisibility: 'contacts',
        activityTracking: true,
      },
      theme: {
        mode: 'system',
        colorScheme: 'blue',
      },
      language: 'en',
    };
  } catch (error) {
    console.error('Error fetching settings data:', error);
    throw error;
  }
};

// Service function to update user settings
const updateSettings = async (settings: Partial<UserSettings>): Promise<UserSettings> => {
  try {
    // In a real app, you would call the API
    // return await apiClient.patch<UserSettings>('/settings', settings);
    
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...await fetchSettings(),
      ...settings,
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

export function useSettings() {
  const queryClient = useQueryClient();
  
  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
    },
  });
  
  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    error: settingsQuery.error,
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
  };
}