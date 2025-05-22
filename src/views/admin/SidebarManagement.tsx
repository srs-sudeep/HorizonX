import {
  createModule,
  createSubModule,
  deleteModule,
  deleteSubModule,
  getModules,
  getSubModules,
  SidebarModuleItem,
  SidebarSubModuleItem,
  updateModule,
  updateSubModule,
} from '@/api/mockApi/sidebar';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/store/useAuthStore';
import { getIconComponent, iconMap } from '@/types';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SidebarManagement = () => {
  const [modules, setModules] = useState<SidebarModuleItem[]>([]);
  const [subModules, setSubModules] = useState<SidebarSubModuleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>();

  // Module dialog state
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isModuleDeleteDialogOpen, setIsModuleDeleteDialogOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<SidebarModuleItem | null>(null);
  const [moduleFormData, setModuleFormData] = useState<Partial<SidebarModuleItem>>({
    label: '',
    icon: 'dashboard',
    iconSize: 20,
    requiredRoles: [],
    order: 10,
    isActive: true,
  });

  // SubModule dialog state
  const [isSubModuleDialogOpen, setIsSubModuleDialogOpen] = useState(false);
  const [isSubModuleDeleteDialogOpen, setIsSubModuleDeleteDialogOpen] = useState(false);
  const [currentSubModule, setCurrentSubModule] = useState<SidebarSubModuleItem | null>(null);
  const [subModuleFormData, setSubModuleFormData] = useState<Partial<SidebarSubModuleItem>>({
    moduleId: '',
    label: '',
    path: '',
    icon: 'fileText',
    iconSize: 16,
    requiredRoles: [],
    order: 10,
    isActive: true,
    parentId: undefined,
  });

  // Available roles
  const roles: UserRole[] = ['admin', 'teacher', 'student', 'librarian', 'medical'];

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [modulesData, subModulesData] = await Promise.all([getModules(), getSubModules()]);
        setModules(modulesData);
        setSubModules(subModulesData);
      } catch (error) {
        toast.error('Failed to load sidebar data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter submodules based on selected module
  const filteredSubModules = selectedModuleId
    ? subModules.filter(sm => sm.moduleId === selectedModuleId)
    : subModules;

  // Module form handlers
  const handleModuleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModuleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModuleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModuleFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleModuleIconChange = (icon: keyof typeof iconMap) => {
    setModuleFormData(prev => ({ ...prev, icon }));
  };

  const handleModuleCheckboxChange = (checked: boolean) => {
    setModuleFormData(prev => ({ ...prev, isActive: checked }));
  };

  const handleModuleRoleToggle = (role: UserRole) => {
    setModuleFormData(prev => {
      const currentRoles = prev.requiredRoles || [];
      return {
        ...prev,
        requiredRoles: currentRoles.includes(role)
          ? currentRoles.filter(r => r !== role)
          : [...currentRoles, role],
      };
    });
  };

  // SubModule form handlers
  const handleSubModuleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubModuleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubModuleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubModuleFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubModuleIconChange = (icon: keyof typeof iconMap) => {
    setSubModuleFormData(prev => ({ ...prev, icon }));
  };

  const handleSubModuleCheckboxChange = (checked: boolean) => {
    setSubModuleFormData(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubModuleRoleToggle = (role: UserRole) => {
    setSubModuleFormData(prev => {
      const currentRoles = prev.requiredRoles || [];
      return {
        ...prev,
        requiredRoles: currentRoles.includes(role)
          ? currentRoles.filter(r => r !== role)
          : [...currentRoles, role],
      };
    });
  };

  const handleSubModuleModuleChange = (moduleId: string) => {
    setSubModuleFormData(prev => ({
      ...prev,
      moduleId,
      parentId: undefined, // Reset parent when module changes
    }));
  };

  // Open module dialog for creating/editing
  const openModuleDialog = (module?: SidebarModuleItem) => {
    if (module) {
      setCurrentModule(module);
      setModuleFormData({
        label: module.label,
        icon: module.icon,
        iconSize: module.iconSize,
        requiredRoles: module.requiredRoles ? [...module.requiredRoles] : [],
        order: module.order,
        isActive: module.isActive,
      });
    } else {
      setCurrentModule(null);
      setModuleFormData({
        label: '',
        icon: 'dashboard',
        iconSize: 20,
        requiredRoles: [],
        order: modules.length > 0 ? Math.max(...modules.map(m => m.order || 0)) + 10 : 10,
        isActive: true,
      });
    }
    setIsModuleDialogOpen(true);
  };

  // Open submodule dialog for creating/editing
  const openSubModuleDialog = (subModule?: SidebarSubModuleItem) => {
    if (subModule) {
      setCurrentSubModule(subModule);
      setSubModuleFormData({
        moduleId: subModule.moduleId,
        label: subModule.label,
        path: subModule.path,
        icon: subModule.icon,
        iconSize: subModule.iconSize,
        requiredRoles: subModule.requiredRoles ? [...subModule.requiredRoles] : [],
        order: subModule.order,
        isActive: subModule.isActive,
        parentId: subModule.parentId,
      });
    } else {
      setCurrentSubModule(null);
      setSubModuleFormData({
        moduleId: modules.length > 0 ? modules[0].id : '',
        label: '',
        path: '',
        icon: 'fileText',
        iconSize: 16,
        requiredRoles: [],
        order: subModules.length > 0 ? Math.max(...subModules.map(sm => sm.order || 0)) + 10 : 10,
        isActive: true,
        parentId: undefined,
      });
    }
    setIsSubModuleDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openModuleDeleteDialog = (module: SidebarModuleItem) => {
    setCurrentModule(module);
    setIsModuleDeleteDialogOpen(true);
  };

  const openSubModuleDeleteDialog = (subModule: SidebarSubModuleItem) => {
    setCurrentSubModule(subModule);
    setIsSubModuleDeleteDialogOpen(true);
  };

  // Handle module form submission
  const handleModuleSubmit = async () => {
    if (!moduleFormData.label) {
      toast.error('Module label is required');
      return;
    }

    try {
      if (currentModule) {
        // Update existing module
        const updated = await updateModule(currentModule.id, moduleFormData);
        setModules(prev => prev.map(m => (m.id === updated.id ? updated : m)));
        toast.success('Module updated successfully');
      } else {
        // Create new module
        const created = await createModule(moduleFormData as Omit<SidebarModuleItem, 'id'>);
        setModules(prev => [...prev, created]);
        toast.success('Module created successfully');
      }
      setIsModuleDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save module');
      console.error(error);
    }
  };

  // Handle submodule form submission
  const handleSubModuleSubmit = async () => {
    if (!subModuleFormData.label || !subModuleFormData.path || !subModuleFormData.moduleId) {
      toast.error('Label, path and module are required');
      return;
    }

    try {
      if (currentSubModule) {
        // Update existing submodule
        const updated = await updateSubModule(currentSubModule.id, subModuleFormData);
        setSubModules(prev => prev.map(sm => (sm.id === updated.id ? updated : sm)));
        toast.success('Submodule updated successfully');
      } else {
        // Create new submodule
        const created = await createSubModule(
          subModuleFormData as Omit<SidebarSubModuleItem, 'id'>
        );
        setSubModules(prev => [...prev, created]);
        toast.success('Submodule created successfully');
      }
      setIsSubModuleDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save submodule');
      console.error(error);
    }
  };

  // Handle module deletion
  const handleModuleDelete = async () => {
    if (!currentModule) return;

    try {
      await deleteModule(currentModule.id);
      setModules(prev => prev.filter(m => m.id !== currentModule.id));
      // Also remove submodules associated with this module
      setSubModules(prev => prev.filter(sm => sm.moduleId !== currentModule.id));
      toast.success('Module deleted successfully');
      setIsModuleDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete module');
      console.error(error);
    }
  };

  // Handle submodule deletion
  const handleSubModuleDelete = async () => {
    if (!currentSubModule) return;

    try {
      await deleteSubModule(currentSubModule.id);
      // Remove the submodule and all its children
      const childIds = getAllChildIds(currentSubModule.id);
      setSubModules(prev =>
        prev.filter(sm => sm.id !== currentSubModule.id && !childIds.includes(sm.id))
      );
      toast.success('Submodule deleted successfully');
      setIsSubModuleDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete submodule');
      console.error(error);
    }
  };

  // Helper to get all child IDs recursively
  const getAllChildIds = (parentId: string): string[] => {
    const directChildren = subModules.filter(sm => sm.parentId === parentId);
    const childIds = directChildren.map(child => child.id);

    directChildren.forEach(child => {
      childIds.push(...getAllChildIds(child.id));
    });

    return childIds;
  };

  // Get potential parent submodules for a given module
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const getPotentialParents = (moduleId: string): SidebarSubModuleItem[] => {
    return subModules.filter(
      sm =>
        sm.moduleId === moduleId &&
        (!currentSubModule || sm.id !== currentSubModule.id) &&
        !isDescendantOf(sm.id, currentSubModule?.id || '')
    );
  };

  // Check if a submodule is a descendant of another
  const isDescendantOf = (subModuleId: string, potentialAncestorId: string): boolean => {
    if (!potentialAncestorId) return false;

    const subModule = subModules.find(sm => sm.id === subModuleId);
    if (!subModule || !subModule.parentId) return false;

    if (subModule.parentId === potentialAncestorId) return true;

    return isDescendantOf(subModule.parentId, potentialAncestorId);
  };

  // Build hierarchical structure for display
  const buildHierarchy = (moduleId: string, parentId?: string): SidebarSubModuleItem[] => {
    return subModules
      .filter(sm => sm.moduleId === moduleId && sm.parentId === parentId)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(sm => ({
        ...sm,
        children: buildHierarchy(moduleId, sm.id),
      }));
  };

  // Render a submodule item with its children
  const renderSubModuleItem = (subModule: SidebarSubModuleItem, depth = 0) => {
    return (
      <React.Fragment key={subModule.id}>
        <TableRow>
          <TableCell>
            <div style={{ paddingLeft: `${depth * 20}px` }} className="flex items-center">
              {subModule.icon && (
                <div className="mr-2">
                  {getIconComponent(subModule.icon as keyof typeof iconMap, subModule.iconSize)}
                </div>
              )}
              {subModule.label}
              {subModule.badge && (
                <Badge variant="secondary" className="ml-2">
                  {subModule.badge}
                </Badge>
              )}
            </div>
          </TableCell>
          <TableCell>{subModule.path}</TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              {subModule.requiredRoles && subModule.requiredRoles.length > 0 ? (
                subModule.requiredRoles.map(role => (
                  <Badge key={role} variant="outline" className="capitalize">
                    {role}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground text-xs">All roles</span>
              )}
            </div>
          </TableCell>
          <TableCell>{subModule.order}</TableCell>
          <TableCell>
            <Badge variant={subModule.isActive ? 'success' : 'secondary'}>
              {subModule.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon" onClick={() => openSubModuleDialog(subModule)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openSubModuleDeleteDialog(subModule)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
        {subModule.children &&
          subModule.children.map(child => renderSubModuleItem(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sidebar Management</h1>
      </div>

      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="submodules">Submodules</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Main Modules</h2>
            <Button onClick={() => openModuleDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Required Roles</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No modules found
                    </TableCell>
                  </TableRow>
                ) : (
                  modules
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map(module => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {module.icon && (
                              <div className="mr-2">
                                {getIconComponent(
                                  module.icon as keyof typeof iconMap,
                                  module.iconSize
                                )}
                              </div>
                            )}
                            {module.label}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {module.requiredRoles && module.requiredRoles.length > 0 ? (
                              module.requiredRoles.map(role => (
                                <Badge key={role} variant="outline" className="capitalize">
                                  {role}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-xs">All roles</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{module.order}</TableCell>
                        <TableCell>
                          <Badge variant={module.isActive ? 'success' : 'secondary'}>
                            {module.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModuleDialog(module)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModuleDeleteDialog(module)}
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
        </TabsContent>

        <TabsContent value="submodules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Submodules</h2>
            <Button onClick={() => openSubModuleDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Submodule
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">Loading...</div>
          ) : (
            <div>
              <div className="mb-4">
                <Label htmlFor="moduleFilter">Filter by Module</Label>
                <Select
                  value={selectedModuleId || ''}
                  onValueChange={value => setSelectedModuleId(value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Modules</SelectItem>
                    {modules.map(module => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Submodule</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead>Required Roles</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubModules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No submodules found
                      </TableCell>
                    </TableRow>
                  ) : (
                    modules
                      .filter(module => !selectedModuleId || module.id === selectedModuleId)
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map(module => (
                        <React.Fragment key={module.id}>
                          {buildHierarchy(module.id).map(subModule =>
                            renderSubModuleItem(subModule)
                          )}
                        </React.Fragment>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Module Dialog */}
      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentModule ? 'Edit Module' : 'Create Module'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                name="label"
                value={moduleFormData.label}
                onChange={handleModuleInputChange}
                placeholder="Module Label"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={moduleFormData.icon}
                onValueChange={value => handleModuleIconChange(value as keyof typeof iconMap)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconMap).map(icon => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iconSize">Icon Size</Label>
              <Input
                id="iconSize"
                name="iconSize"
                type="number"
                value={moduleFormData.iconSize}
                onChange={handleModuleNumberInputChange}
                placeholder="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={moduleFormData.order}
                onChange={handleModuleNumberInputChange}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Required Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={(moduleFormData.requiredRoles || []).includes(role)}
                      onCheckedChange={() => handleModuleRoleToggle(role)}
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
                  checked={moduleFormData.isActive}
                  onCheckedChange={handleModuleCheckboxChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleModuleSubmit}>{currentModule ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SubModule Dialog */}
      <Dialog open={isSubModuleDialogOpen} onOpenChange={setIsSubModuleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentSubModule ? 'Edit Sub Module' : 'Create Sub Module'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="moduleId">Module</Label>
              <Select
                value={subModuleFormData.moduleId}
                onValueChange={handleSubModuleModuleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map(module => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Parent (Optional)</Label>
              <Select
                value={subModuleFormData.parentId || ''}
                onValueChange={value => handleSubModuleParentChange(value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {subModules
                    .filter(sm => sm.id !== currentSubModule?.id)
                    .map(sm => (
                      <SelectItem key={sm.id} value={sm.id}>
                        {sm.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                name="label"
                value={subModuleFormData.label}
                onChange={handleSubModuleInputChange}
                placeholder="Sub Module Label"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                name="path"
                value={subModuleFormData.path}
                onChange={handleSubModuleInputChange}
                placeholder="/example/path"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={subModuleFormData.icon || 'fileText'}
                onValueChange={value => handleSubModuleIconChange(value as keyof typeof iconMap)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconMap).map(icon => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iconSize">Icon Size</Label>
              <Input
                id="iconSize"
                name="iconSize"
                type="number"
                value={subModuleFormData.iconSize}
                onChange={handleSubModuleNumberInputChange}
                placeholder="16"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={subModuleFormData.order}
                onChange={handleSubModuleNumberInputChange}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Required Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subrole-${role}`}
                      checked={(subModuleFormData.requiredRoles || []).includes(role)}
                      onCheckedChange={() => handleSubModuleRoleToggle(role)}
                    />
                    <Label htmlFor={`subrole-${role}`}>{role}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subIsActive"
                  checked={subModuleFormData.isActive}
                  onCheckedChange={handleSubModuleCheckboxChange}
                />
                <Label htmlFor="subIsActive">Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubModuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubModuleSubmit}>
              {currentSubModule ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Module Delete Confirmation Dialog */}
      <Dialog open={isModuleDeleteDialogOpen} onOpenChange={setIsModuleDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this module?</p>
            <p className="font-medium mt-2">{currentModule?.label}</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will also delete all associated submodules.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModuleDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleModuleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SubModule Delete Confirmation Dialog */}
      <Dialog open={isSubModuleDeleteDialogOpen} onOpenChange={setIsSubModuleDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this submodule?</p>
            <p className="font-medium mt-2">{currentSubModule?.label}</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will also delete all child items.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubModuleDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubModuleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarManagement;
