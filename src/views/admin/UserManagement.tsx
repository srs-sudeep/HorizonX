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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserRole } from '@/store/useAuthStore';
import { FilterConfig } from '@/types/filterType.types';
import { FieldType } from '@/types/fieldType.types';
import { HorizonXTable } from '@/components/horizonXTable';
import { DynamicForm } from '@/components/HorizonXForm';
import { Pencil, Shield, Trash2, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [rolesFilter, setRolesFilter] = useState<string[]>([]);

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

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // User form schema
  const userFormSchema: FieldType[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
      columns: 1,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
      columns: 1,
    },
    {
      name: 'avatar',
      label: 'Avatar URL',
      type: 'url',
      required: false,
      placeholder: 'https://example.com/avatar.jpg',
      columns: 2,
    },
    {
      name: 'roles',
      label: 'User Roles',
      type: 'select',
      multiSelect: true,
      required: false,
      options: roles.map(role => ({ value: role, label: role })),
      columns: 1,
    },
    {
      name: 'isActive',
      label: 'Account Status',
      type: 'toggle',
      required: false,
      columns: 1,
    },
  ];

  // Role management form schema
  const roleFormSchema: FieldType[] = [
    {
      name: 'roles',
      label: 'Assigned Roles',
      type: 'select',
      multiSelect: true,
      required: false,
      options: roles.map(role => ({ value: role, label: role })),
      columns: 2,
    },
  ];

  // Filter configuration for HorizonXTable
  const filterConfig: FilterConfig[] = [
    {
      column: 'isActive',
      type: 'dropdown',
      options: ['Active', 'Inactive'],
      value: statusFilter.length > 0 ? statusFilter[0] : undefined,
      onChange: (val: string) => setStatusFilter(val ? [val] : []),
    },
    {
      column: 'roles',
      type: 'multi-select',
      options: roles,
      value: rolesFilter,
      onChange: (val: string[]) => setRolesFilter(val),
    },
  ];

  // Custom render functions for table columns
  const customRender = {
    name: (value: string, row: Record<string, any>) => (
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={row.avatar} />
          <AvatarFallback>{getInitials(value)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">
            Created {new Date(row.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    ),
    roles: (value: UserRole[]) => (
      <div className="flex flex-wrap gap-1">
        {value.map(role => (
          <Badge key={role} variant="outline" className="capitalize">
            {role}
          </Badge>
        ))}
      </div>
    ),
    isActive: (value: boolean) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
    actions: (value: any, row: Record<string, any>) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            openRoleDialog(row as User);
          }}
          title="Manage Roles"
        >
          <Shield className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            openUserDialog(row as User);
          }}
          title="Edit User"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            openUserDeleteDialog(row as User);
          }}
          title="Delete User"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  };

  // Transform users data to include actions column
  const tableData = users.map(user => ({
    ...user,
    actions: null, // Will be rendered by customRender
  }));

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
  const handleUserSubmit = async (formData: Record<string, any>) => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      if (currentUser) {
        // Update existing user
        const updated = await updateUser(currentUser.id, formData);
        setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
        toast.success('User updated successfully');
      } else {
        // Create new user
        const created = await createUser(formData as Omit<User, 'id' | 'createdAt'>);
        setUsers(prev => [...prev, created]);
        toast.success('User created successfully');
      }
      setIsUserDialogOpen(false);
      setCurrentUser(null);
      setUserFormData({
        name: '',
        email: '',
        roles: [],
        isActive: true,
      });
    } catch (error) {
      toast.error('Failed to save user');
      console.error(error);
    }
  };

  // Handle role management submission
  const handleRoleSubmit = async (formData: Record<string, any>) => {
    if (!currentUser) return;

    try {
      // Find roles to add and remove
      const rolesToAdd = (formData.roles || []).filter(
        (role: string) => !currentUser.roles.includes(role as UserRole)
      );
      const rolesToRemove = currentUser.roles.filter(
        role => !(formData.roles || []).includes(role)
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
      setCurrentUser(null);
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
      setCurrentUser(null);
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  // Handle form data changes
  const handleFormDataChange = (formData: Record<string, any>) => {
    setUserFormData(formData);
  };

  return (
    <div className="space-y-6">
      <HorizonXTable
        data={tableData}
        customRender={customRender}
        isLoading={isLoading}
        filterConfig={filterConfig}
        tableHeading="User Management"
        headerActions={
          <Button onClick={() => openUserDialog()}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
        onRowClick={(row) => {
          console.log('Row clicked:', row);
        }}
        className="w-full"
      />

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentUser ? 'Edit User' : 'Create New User'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <DynamicForm
              schema={userFormSchema}
              defaultValues={userFormData}
              onSubmit={handleUserSubmit}
              onCancel={() => {
                setIsUserDialogOpen(false);
                setCurrentUser(null);
                setUserFormData({
                  name: '',
                  email: '',
                  roles: [],
                  isActive: true,
                });
              }}
              onChange={handleFormDataChange}
              submitButtonText={currentUser ? 'Update User' : 'Create User'}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Role Management Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage User Roles</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* User Info Header */}
            <div className="flex items-center space-x-3 mb-6 p-4 bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>
                  {currentUser ? getInitials(currentUser.name) : ''}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg">{currentUser?.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>

            {/* Role Management Form */}
            <DynamicForm
              schema={roleFormSchema}
              defaultValues={{ roles: currentUser?.roles || [] }}
              onSubmit={handleRoleSubmit}
              onCancel={() => {
                setIsRoleDialogOpen(false);
                setCurrentUser(null);
              }}
              submitButtonText="Update Roles"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* User Delete Confirmation Dialog */}
      <Dialog open={isUserDeleteDialogOpen} onOpenChange={setIsUserDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm User Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
              
              {/* User Info */}
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>
                    {currentUser ? getInitials(currentUser.name) : ''}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentUser?.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentUser?.roles.map(role => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-center space-x-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <p className="text-sm text-destructive font-medium">
                  This will permanently delete the user and all associated data.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsUserDeleteDialogOpen(false);
                  setCurrentUser(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleUserDelete}
              >
                Delete User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
