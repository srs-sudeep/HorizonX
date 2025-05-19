import {
  createRoute,
  deleteRoute,
  getRoutes,
  RouteConfig,
  updateRoute,
} from '@/api/mockApi/routes';
import { getAllRoles } from '@/api/mockApi/users';
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
import { type UserRole } from '@/store/useAuthStore';
import { Pencil, PlusCircle, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const RouteManagement = () => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<RouteConfig | null>(null);
  const [formData, setFormData] = useState<Partial<RouteConfig>>({
    path: '',
    requiredRoles: [],
    isActive: true,
    description: '',
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [routesData, rolesData] = await Promise.all([getRoutes(), getAllRoles()]);
        setRoutes(routesData);
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

  // Filter routes based on search query
  const filteredRoutes = routes.filter(
    route =>
      route.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  // Handle role selection
  const handleRoleToggle = (role: UserRole) => {
    setFormData(prev => {
      const currentRoles = prev.requiredRoles || [];
      return {
        ...prev,
        requiredRoles: currentRoles.includes(role)
          ? currentRoles.filter(r => r !== role)
          : [...currentRoles, role],
      };
    });
  };

  // Open dialog for creating/editing
  const openDialog = (route?: RouteConfig) => {
    if (route) {
      setCurrentRoute(route);
      setFormData({
        path: route.path,
        requiredRoles: [...route.requiredRoles],
        isActive: route.isActive,
        description: route.description,
      });
    } else {
      setCurrentRoute(null);
      setFormData({
        path: '',
        requiredRoles: [],
        isActive: true,
        description: '',
      });
    }
    setIsDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (route: RouteConfig) => {
    setCurrentRoute(route);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.path) {
      toast.error('Path is required');
      return;
    }

    try {
      if (currentRoute) {
        // Update existing route
        const updated = await updateRoute(currentRoute.id, formData);
        setRoutes(prev => prev.map(r => (r.id === updated.id ? updated : r)));
        toast.success('Route updated successfully');
      } else {
        // Create new route
        const created = await createRoute(formData as Omit<RouteConfig, 'id'>);
        setRoutes(prev => [...prev, created]);
        toast.success('Route created successfully');
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save route');
      console.error(error);
    }
  };

  // Handle route deletion
  const handleDelete = async () => {
    if (!currentRoute) return;

    try {
      await deleteRoute(currentRoute.id);
      setRoutes(prev => prev.filter(r => r.id !== currentRoute.id));
      toast.success('Route deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete route');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Route Management</h1>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Route
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search routes..."
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
              <TableHead>Path</TableHead>
              <TableHead>Required Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No routes found
                </TableCell>
              </TableRow>
            ) : (
              filteredRoutes.map(route => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.path}</TableCell>
                  <TableCell>
                    {route.requiredRoles.length > 0 ? route.requiredRoles.join(', ') : 'All users'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        route.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {route.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{route.description || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(route)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(route)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentRoute ? 'Edit Route' : 'Create Route'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                name="path"
                value={formData.path}
                onChange={handleInputChange}
                placeholder="/example/path"
              />
            </div>

            <div className="space-y-2">
              <Label>Required Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={(formData.requiredRoles || []).includes(role)}
                      onCheckedChange={() => handleRoleToggle(role)}
                    />
                    <Label htmlFor={`role-${role}`}>{role}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Route description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{currentRoute ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this route?</p>
            <p className="font-medium mt-2">{currentRoute?.path}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RouteManagement;
