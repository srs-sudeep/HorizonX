import { type User, type UserRole } from '@/store/useAuthStore';

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    roles: ['admin', 'teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@example.com',
    roles: ['teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Teacher+User&background=2A9D8F&color=fff'
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@example.com',
    roles: ['student'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=E9C46A&color=fff'
  },
  {
    id: '4',
    name: 'Multi-Role User',
    email: 'multi@example.com',
    roles: ['admin', 'teacher'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Multi+Role+User&background=F4A261&color=fff'
  },
  {
    id: '5',
    name: 'Medical Staff',
    email: 'medical@example.com',
    roles: ['medical'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Medical+Staff&background=E76F51&color=fff'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock token storage
let mockToken: string | null = null;
let currentUser: User | null = null;

export const authApi = {
  // Mock login function
  login: async (email: string, password: string): Promise<{ user: User }> => {
    // Simulate network delay
    await delay(1000);
    
    // Find user by email (in a real app, we'd check password too)
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Set mock token and current user
    mockToken = `mock-token-${Date.now()}`;
    currentUser = user;
    
    // Store in localStorage for persistence
    localStorage.setItem('auth-token', mockToken);
    localStorage.setItem('current-user', JSON.stringify(user));
    
    return { user };
  },
  
  // Mock register function
  register: async (name: string, email: string, password: string): Promise<{ user: User }> => {
    // Simulate network delay
    await delay(1000);
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user (in a real app, this would be saved to a database)
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      roles: ['student'], // Default role for new users
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    return { user: newUser };
  },
  
  // Mock logout function
  logout: async (): Promise<void> => {
    // Simulate network delay
    await delay(500);
    
    // Clear mock token and current user
    mockToken = null;
    currentUser = null;
    
    // Clear from localStorage
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
    
    return;
  },
  
  // Mock function to get current user
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate network delay
    await delay(500);
    
    // Check if we have a token and current user
    if (mockToken) {
      return currentUser;
    }
    
    // Check localStorage for persistence across page refreshes
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('current-user');
    
    if (storedToken && storedUser) {
      mockToken = storedToken;
      currentUser = JSON.parse(storedUser);
      return currentUser;
    }
    
    return null;
  }
};
