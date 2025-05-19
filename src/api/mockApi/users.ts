import { type UserRole } from '@/store/useAuthStore';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  isActive: boolean;
  avatar?: string;
  createdAt: string;
}

// Initial mock data
const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    roles: ['admin'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@example.com',
    roles: ['teacher'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher',
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@example.com',
    roles: ['student'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    createdAt: '2023-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Librarian User',
    email: 'librarian@example.com',
    roles: ['librarian'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=librarian',
    createdAt: '2023-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Medical Staff',
    email: 'medical@example.com',
    roles: ['medical'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=medical',
    createdAt: '2023-01-05T00:00:00.000Z',
  },
  {
    id: '6',
    name: 'Multi-Role User',
    email: 'multi@example.com',
    roles: ['admin', 'teacher'],
    isActive: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=multi',
    createdAt: '2023-01-06T00:00:00.000Z',
  },
  {
    id: '7',
    name: 'Inactive User',
    email: 'inactive@example.com',
    roles: ['student'],
    isActive: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=inactive',
    createdAt: '2023-01-07T00:00:00.000Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all users
export const getUsers = async (): Promise<User[]> => {
  await delay(500);
  return [...users];
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | undefined> => {
  await delay(300);
  return users.find(user => user.id === id);
};

// Create a new user
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  await delay(700);
  const newUser: User = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
};

// Update an existing user
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  await delay(600);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }

  const updatedUser = {
    ...users[index],
    ...userData,
  };
  users[index] = updatedUser;
  return updatedUser;
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await delay(500);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  users.splice(index, 1);
};

// Assign a role to a user
export const assignRole = async (userId: string, role: UserRole): Promise<User> => {
  await delay(400);
  const user = users.find(user => user.id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.roles.includes(role)) {
    user.roles.push(role);
  }

  return user;
};

// Remove a role from a user
export const removeRole = async (userId: string, role: UserRole): Promise<User> => {
  await delay(400);
  const user = users.find(user => user.id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.roles = user.roles.filter(r => r !== role);
  return user;
};

// Get all available roles
export const getAllRoles = async (): Promise<UserRole[]> => {
  await delay(300);
  return ['admin', 'teacher', 'student', 'librarian', 'medical'];
};
