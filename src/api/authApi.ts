import { type User, type UserRole } from '@/store/useAuthStore';

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    roles: ['admin', 'teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@example.com',
    roles: ['teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Teacher+User&background=2A9D8F&color=fff',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@example.com',
    roles: ['student'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=E9C46A&color=fff',
  },
  {
    id: '4',
    name: 'Multi-Role User',
    email: 'multi@example.com',
    roles: ['admin', 'teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Multi+Role+User&background=F4A261&color=fff',
  },
  {
    id: '5',
    name: 'Medical Staff',
    email: 'medical@example.com',
    roles: ['medical'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Medical+Staff&background=E76F51&color=fff',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Token configuration
const TOKEN_EXPIRY = {
  access: 15 * 60 * 1000, // 15 minutes in milliseconds
  refresh: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

// Mock token storage
let mockTokens: { accessToken: string; refreshToken: string } | null = null;
let currentUser: User | null = null;

// Generate token function
const generateTokens = (user: User, role: UserRole) => {
  const accessToken = `access-token-${user.id}-${role}-${Date.now()}`;
  const refreshToken = `refresh-token-${user.id}-${Date.now()}`;

  return {
    accessToken,
    refreshToken,
    accessTokenExpiry: Date.now() + TOKEN_EXPIRY.access,
    refreshTokenExpiry: Date.now() + TOKEN_EXPIRY.refresh,
  };
};

export const authApi = {
  // Mock login function
  login: async (
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    // Simulate network delay
    await delay(1000);

    // Find user by email (in a real app, we'd check password too)
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !password) {
      throw new Error('Invalid email or password');
    }

    // Get the first role from the user's roles
    const defaultRole = user.roles[0];

    // Generate tokens
    const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = generateTokens(
      user,
      defaultRole
    );

    // Set mock tokens and current user
    mockTokens = { accessToken, refreshToken };
    currentUser = { ...user, currentRole: defaultRole };

    // Store in localStorage for persistence
    localStorage.setItem('auth-access-token', accessToken);
    localStorage.setItem('auth-refresh-token', refreshToken);
    localStorage.setItem('auth-access-expiry', accessTokenExpiry.toString());
    localStorage.setItem('auth-refresh-expiry', refreshTokenExpiry.toString());
    localStorage.setItem('current-user', JSON.stringify(currentUser));

    return { user: currentUser, accessToken, refreshToken };
  },

  // Refresh token function
  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    await delay(500);

    // Check if refresh token exists in localStorage
    const storedRefreshToken = localStorage.getItem('auth-refresh-token');
    const refreshExpiry = Number(localStorage.getItem('auth-refresh-expiry') || '0');

    if (!storedRefreshToken || storedRefreshToken !== refreshToken || Date.now() > refreshExpiry) {
      throw new Error('Invalid or expired refresh token');
    }

    // Get current user
    const storedUser = localStorage.getItem('current-user');
    if (!storedUser) {
      throw new Error('User not found');
    }

    const user = JSON.parse(storedUser) as User;
    const currentRole = (user.currentRole as UserRole) || user.roles[0];

    // Generate new tokens
    const {
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    } = generateTokens(user, currentRole);

    // Update localStorage
    localStorage.setItem('auth-access-token', accessToken);
    localStorage.setItem('auth-refresh-token', newRefreshToken);
    localStorage.setItem('auth-access-expiry', accessTokenExpiry.toString());
    localStorage.setItem('auth-refresh-expiry', refreshTokenExpiry.toString());

    // Update mock tokens
    mockTokens = { accessToken, refreshToken: newRefreshToken };

    return { accessToken, refreshToken: newRefreshToken };
  },

  // Change user role
  changeRole: async (
    accessToken: string,
    newRole: UserRole
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    await delay(500);

    // Verify access token
    const storedAccessToken = localStorage.getItem('auth-access-token');

    if (!storedAccessToken || storedAccessToken !== accessToken) {
      throw new Error('Invalid access token');
    }

    // Get current user
    const storedUser = localStorage.getItem('current-user');
    if (!storedUser) {
      throw new Error('User not found');
    }

    const user = JSON.parse(storedUser) as User;

    // Verify user has the requested role
    if (!user.roles.includes(newRole)) {
      throw new Error('User does not have the requested role');
    }

    // Generate new tokens with the new role
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    } = generateTokens(user, newRole);

    // Update user with new role
    const updatedUser = { ...user, currentRole: newRole };

    // Update localStorage
    localStorage.setItem('auth-access-token', newAccessToken);
    localStorage.setItem('auth-refresh-token', newRefreshToken);
    localStorage.setItem('auth-access-expiry', accessTokenExpiry.toString());
    localStorage.setItem('auth-refresh-expiry', refreshTokenExpiry.toString());
    localStorage.setItem('current-user', JSON.stringify(updatedUser));

    // Update mock tokens and current user
    mockTokens = { accessToken: newAccessToken, refreshToken: newRefreshToken };
    currentUser = updatedUser;

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  // Mock register function
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    // Simulate network delay
    await delay(100000);

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase()) || !password) {
      throw new Error('User with this email already exists');
    }

    // Create new user (in a real app, this would be saved to a database)
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      roles: ['student'], // Default role for new users
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    };

    // Add to mock database
    MOCK_USERS.push(newUser);

    // Generate tokens
    const defaultRole = newUser.roles[0];
    const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = generateTokens(
      newUser,
      defaultRole
    );

    // Set current user and tokens
    currentUser = { ...newUser, currentRole: defaultRole };
    mockTokens = { accessToken, refreshToken };

    // Store in localStorage
    localStorage.setItem('auth-access-token', accessToken);
    localStorage.setItem('auth-refresh-token', refreshToken);
    localStorage.setItem('auth-access-expiry', accessTokenExpiry.toString());
    localStorage.setItem('auth-refresh-expiry', refreshTokenExpiry.toString());
    localStorage.setItem('current-user', JSON.stringify(currentUser));

    return { user: currentUser, accessToken, refreshToken };
  },

  // Mock logout function
  logout: async (): Promise<void> => {
    // Simulate network delay
    await delay(500);

    // Clear mock tokens and current user
    mockTokens = null;
    currentUser = null;

    // Clear from localStorage
    localStorage.removeItem('auth-access-token');
    localStorage.removeItem('auth-refresh-token');
    localStorage.removeItem('auth-access-expiry');
    localStorage.removeItem('auth-refresh-expiry');
    localStorage.removeItem('current-user');

    return;
  },

  // Mock function to get current user
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate network delay
    await delay(500);

    // Check if we have tokens and current user
    if (mockTokens) {
      return currentUser;
    }

    // Check localStorage for persistence across page refreshes
    const storedAccessToken = localStorage.getItem('auth-access-token');
    const storedRefreshToken = localStorage.getItem('auth-refresh-token');
    const accessExpiry = Number(localStorage.getItem('auth-access-expiry') || '0');
    const refreshExpiry = Number(localStorage.getItem('auth-refresh-expiry') || '0');
    const storedUser = localStorage.getItem('current-user');

    if (storedRefreshToken && storedUser && Date.now() < refreshExpiry) {
      // Parse stored user
      const user = JSON.parse(storedUser) as User;
      currentUser = user;

      // Check if access token is expired
      if (!storedAccessToken || Date.now() > accessExpiry) {
        try {
          // Refresh the token
          const { accessToken, refreshToken } = await authApi.refreshToken(storedRefreshToken);
          mockTokens = { accessToken, refreshToken };
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return null;
        }
      } else {
        mockTokens = { accessToken: storedAccessToken, refreshToken: storedRefreshToken };
      }

      return currentUser;
    }

    return null;
  },
};
