import {
  assignRole,
  createUser,
  deleteUser,
  getAllRoles,
  getUsers,
  removeRole,
  updateUser,
  User,
} from '@/api/mockApi/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserRole } from '@/store/useAuthStore';
import { Pencil, Search, Shield, Trash2, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // User dialog state
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isUserDeleteDialogOpen, setIsUserDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    roles: [],
    isActive: true,
  });

  // Role dialog state
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, rolesData] = await Promise.all([getUsers(), getAllRoles()]);
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        toast.error('Failed to load data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // User form handlers
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserCheckboxChange = (checked: boolean) => {
    setUserFormData(prev => ({ ...prev, isActive: checked }));
  };

  const handleUserRoleToggle = (role: UserRole) => {
    setUserFormData(prev => {
      const currentRoles = prev.roles || [];
      return {
        ...prev,
        roles: currentRoles.includes(role)
          ? currentRoles.filter(r => r !== role)
          : [...currentRoles, role],
      };
    });
  };

  // Open user dialog for creating/editing
  const openUserDialog = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setUserFormData({
        name: user.name,
        email: user.email,
        roles: [...user.roles],
        isActive: user.isActive,
        avatar: user.avatar,
      });
    } else {
      setCurrentUser(null);
      setUserFormData({
        name: '',
        email: '',
        roles: [],
        isActive: true,
        avatar: undefined,
      });
    }
    setIsUserDialogOpen(true);
  };

  // Open role management dialog
  const openRoleDialog = (user: User) => {
    setCurrentUser(user);
    setUserFormData({
      ...user,
      roles: [...user.roles],
    });
    setIsRoleDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openUserDeleteDialog = (user: User) => {
    setCurrentUser(user);
    setIsUserDeleteDialogOpen(true);
  };

  // Handle user form submission
  const handleUserSubmit = async () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      if (currentUser) {
        // Update existing user
        const updated = await updateUser(currentUser.id, userFormData);
        setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
        toast.success('User updated successfully');
      } else {
        // Create new user
        const created = await createUser(userFormData as Omit<User, 'id' | 'createdAt'>);
        setUsers(prev => [...prev, created]);
        toast.success('User created successfully');
      }
      setIsUserDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save user');
      console.error(error);
    }
  };

  // Handle role management submission
  const handleRoleSubmit = async () => {
    if (!currentUser) return;

    try {
      // Find roles to add and remove
      const rolesToAdd = (userFormData.roles || []).filter(
        role => !currentUser.roles.includes(role)
      );
      const rolesToRemove = currentUser.roles.filter(
        role => !(userFormData.roles || []).includes(role)
      );

      // Apply changes
      let updatedUser = currentUser;

      for (const role of rolesToAdd) {
        updatedUser = await assignRole(currentUser.id, role);
      }

      for (const role of rolesToRemove) {
        updatedUser = await removeRole(currentUser.id, role);
      }

      setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      toast.success('User roles updated successfully');
      setIsRoleDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update user roles');
      console.error(error);
    }
  };

  // Handle user deletion
  const handleUserDelete = async () => {
    if (!currentUser) return;

    try {
      await deleteUser(currentUser.id);
      setUsers(prev => prev.filter(u => u.id !== currentUser.id));
      toast.success('User deleted successfully');
      setIsUserDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => openUserDialog()}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map(role => (
                        <Badge key={role} variant="outline" className="capitalize">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openRoleDialog(user)}
                      title="Manage Roles"
                    >
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openUserDialog(user)}
                      title="Edit User"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openUserDeleteDialog(user)}
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentUser ? 'Edit User' : 'Create User'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={userFormData.name}
                onChange={handleUserInputChange}
                placeholder="User Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userFormData.email}
                onChange={handleUserInputChange}
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL (Optional)</Label>
              <Input
                id="avatar"
                name="avatar"
                value={userFormData.avatar || ''}
                onChange={handleUserInputChange}
                placeholder="https://example.com/avatar.png"
              />
            </div>

            <div className="space-y-2">
              <Label>Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={(userFormData.roles || []).includes(role)}
                      onCheckedChange={() => handleUserRoleToggle(role)}
                    />
                    <Label htmlFor={`role-${role}`} className="capitalize">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={userFormData.isActive}
                  onCheckedChange={handleUserCheckboxChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUserSubmit}>{currentUser ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Management Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage User Roles</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>{currentUser ? getInitials(currentUser.name) : ''}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser?.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assigned Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-dialog-${role}`}
                      checked={(userFormData.roles || []).includes(role)}
                      onCheckedChange={() => handleUserRoleToggle(role)}
                    />
                    <Label htmlFor={`role-dialog-${role}`} className="capitalize">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Delete Confirmation Dialog */}
      <Dialog open={isUserDeleteDialogOpen} onOpenChange={setIsUserDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex items-center space-x-3 mt-4">
              <Avatar>
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>{currentUser ? getInitials(currentUser.name) : ''}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser?.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleUserDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
