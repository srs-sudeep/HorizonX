import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HelmetWrapper,
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  toast,
  DynamicTable,
  DynamicForm,
} from '@/components';
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  usePermissionByRole,
  useAddPermissionToRole,
  useRemovePermissionFromRole,
} from '@/hooks';
import { FieldType, Role } from '@/types';
import { Loader2, Pencil, Plus, Trash2, View } from 'lucide-react';
import { useState, JSX } from 'react';

const schema: FieldType[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, columns: 2 },
  { name: 'description', label: 'Description', type: 'text', required: true, columns: 2 },
];

type Permission = {
  resource: string;
  action: string;
  selected: boolean;
  [key: string]: any;
};

const RolesManagement = () => {
  const { data: roles = [], isFetching } = useRoles();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const deleteMutation = useDeleteRole();
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewPermissionRole, setViewPermissionRole] = useState<Role | null>(null);
  const { data: permissions = [], isFetching: permLoading } = usePermissionByRole(
    viewPermissionRole?.role_id
  );
  const addPermissionToRole = useAddPermissionToRole();
  const removePermissionFromRole = useRemovePermissionFromRole();

  const allActions: string[] = Array.from(
    new Set(
      permissions
        .map((perm: any) => perm.action)
        .filter((action: string) => action && action !== '*')
    )
  ) as string[];

  // 2. Group permissions by resources
  const resourceMap: Record<string, Record<string, Permission>> = {};
  (permissions as Permission[]).forEach(perm => {
    if (!resourceMap[perm.resource]) resourceMap[perm.resource] = {};
    resourceMap[perm.resource][perm.action] = perm;
  });

  // 3. Prepare permission table data for DynamicTable
  const permissionTableData = Object.keys(resourceMap).map(resource => {
    const wildcardPerm = resourceMap[resource]['*'];
    const row: Record<string, any> = { Resource: resource };
    allActions.forEach((action: string) => {
      const perm = resourceMap[resource][action];
      row[action] = {
        selected: !!wildcardPerm?.selected || !!perm?.selected,
        permission_id: perm?.permission_id, // <-- always set this if exists
        wildcard: !!wildcardPerm?.selected,
      };
    });
    return row;
  });

  const handleEdit = (role: Role) => setEditRole(role);

  const handleUpdate = async (formData: Record<string, any>) => {
    if (!editRole) return;
    await updateMutation.mutateAsync({
      role_id: editRole.role_id,
      payload: {
        name: formData.name,
        description: formData.description,
      },
    });
    toast({ title: 'Role updated successfully' });
    setEditRole(null);
  };

  const handleDelete = async (role_id: number) => {
    await deleteMutation.mutateAsync(role_id);
    toast({ title: 'Role deleted successfully' });
  };

  const handleCreate = async (formData: Record<string, any>) => {
    await createMutation.mutateAsync({
      name: formData.name,
      description: formData.description,
    });
    toast({ title: 'Role created successfully' });
    setCreateDialogOpen(false);
  };

  // Custom render for toggles (dynamically for all actions)
  const permissionCustomRender = allActions.reduce<{
    [key: string]: (val: any, row: any) => JSX.Element;
  }>((acc, action: any) => {
    acc[action] = (val: any, row: any) => {
      const isLoading = addPermissionToRole.isPending || removePermissionFromRole.isPending;
      // Only enable toggle if permission_id exists (i.e., permission is available in data)
      const isAvailable = !!val.permission_id;
      const disabled = val.wildcard || isLoading || !viewPermissionRole || !isAvailable;
      return (
        <div className="flex justify-center">
          <button
            type="button"
            className={`
              relative w-12 h-6 flex items-center rounded-full p-1 
              transition-all duration-200 ease-in-out
              ${val.selected ? 'bg-success shadow-inner' : 'bg-muted-foreground/20 shadow-inner'} 
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
            `}
            disabled={disabled}
            aria-pressed={!!val.selected}
            aria-label={`${val.selected ? 'Remove' : 'Grant'} ${action} permission for ${row.Resource}`}
            onClick={() => {
              if (disabled || !viewPermissionRole || !val.permission_id) return;
              if (val.selected) {
                removePermissionFromRole.mutate(
                  {
                    role_id: viewPermissionRole.role_id,
                    permission_id: val.permission_id,
                  },
                  {
                    onSuccess: () =>
                      toast({
                        title: 'Permission removed',
                        description: `${action} permission removed from ${viewPermissionRole.name}`,
                      }),
                  }
                );
              } else {
                addPermissionToRole.mutate(
                  {
                    role_id: viewPermissionRole.role_id,
                    permission_id: val.permission_id,
                  },
                  {
                    onSuccess: () =>
                      toast({
                        title: 'Permission granted',
                        description: `${action} permission granted to ${viewPermissionRole.name}`,
                      }),
                  }
                );
              }
            }}
          >
            <span
              className={`
                bg-background w-4 h-4 rounded-full shadow-sm
                transform transition-transform duration-200 ease-in-out
                ${val.selected ? 'translate-x-6' : 'translate-x-0'}
              `}
            />
            {isLoading && (
              <Loader2 className="absolute inset-0 m-auto w-3 h-3 animate-spin text-foreground" />
            )}
          </button>
        </div>
      );
    };
    return acc;
  }, {});

  const customRender = {
    Edit: (_: any, role: Role) => (
      <Dialog
        open={editRole?.role_id === role.role_id}
        onOpenChange={open => {
          if (!open) setEditRole(null);
        }}
      >
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" onClick={() => handleEdit(role)}>
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={schema}
            onSubmit={handleUpdate}
            defaultValues={editRole ?? undefined}
            onCancel={() => setEditRole(null)}
            submitButtonText="Save"
          />
        </DialogContent>
      </Dialog>
    ),
    Delete: (_: any, role: Role) => (
      <Button
        size="icon"
        variant="destructive"
        onClick={() => handleDelete(role.role_id)}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    ),
    ViewPermission: (_: any, role: Role) => (
      <div className="flex justify-center items-center">
        <Button size="icon" variant="outline" onClick={() => setViewPermissionRole(role)}>
          <View className="w-4 h-4" />
        </Button>
      </div>
    ),
  };

  const getTableData = (roles: Role[]) =>
    roles.map(role => ({
      RoleId: role.role_id,
      Name: role.name,
      Description: role.description,
      'View Permission': '',
      Edit: '',
      Delete: '',
      _row: role,
    }));

  return (
    <HelmetWrapper
      title="Roles | HorizonX"
      heading="Role Management"
      subHeading="Manage roles and their associated permissions within the application."
    >
      <DynamicTable
        data={getTableData(roles).map(row => ({
          ...row,
          'View Permission': customRender.ViewPermission('', row._row),
          Edit: customRender.Edit('', row._row),
          Delete: customRender.Delete('', row._row),
        }))}
        isLoading={isFetching}
        customRender={{}}
        onRowClick={() => {}}
        headerActions={
          <>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Role</DialogTitle>
                </DialogHeader>
                <DynamicForm
                  schema={schema}
                  onSubmit={handleCreate}
                  onCancel={() => setCreateDialogOpen(false)}
                  submitButtonText="Create"
                />
              </DialogContent>
            </Dialog>
            {/* You can add more custom buttons here */}
          </>
        }
      />

      {/* Permission Management Side Panel */}
      <Sheet
        open={!!viewPermissionRole}
        onOpenChange={open => !open && setViewPermissionRole(null)}
      >
        <SheetTitle style={{ display: 'none' }} />
        <SheetContent
          side="right"
          className="
              p-0 
              fixed right-0 top-1/2 -translate-y-1/2
              min-h-fit max-h-[100vh]
              w-full sm:w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[100vw]
              bg-card border-l border-border
              shadow-2xl
              overflow-hidden
              flex flex-col
              rounded-l-xl
            "
          style={{ width: '90vw', maxWidth: '1200px' }}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-6">
              {viewPermissionRole && (
                <>
                  {/* Header */}
                  <div className="border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Permission Management
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Configure permissions for{' '}
                      <span className="font-semibold text-foreground">
                        {viewPermissionRole.name}
                      </span>{' '}
                      role
                    </p>
                  </div>

                  {/* Role Information Card */}
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Role Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Role Name</span>
                        <span className="text-sm font-semibold text-foreground">
                          {viewPermissionRole.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Role ID</span>
                        <span className="text-sm font-mono text-foreground">
                          {viewPermissionRole.role_id}
                        </span>
                      </div>
                      <div className="flex justify-between items-start py-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Description
                        </span>
                        <span className="text-sm text-foreground text-right max-w-[200px]">
                          {viewPermissionRole.description}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Permissions Table */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Resource Permissions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Grant or revoke specific permissions for each resource. Toggle the switches to
                      control access levels.
                    </p>

                    {permLoading ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="text-center">
                          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Loading permissions...</p>
                        </div>
                      </div>
                    ) : permissionTableData.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-muted-foreground mb-2">
                          <View className="md:w-12 md:h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">No permissions available</p>
                          <p className="text-xs">
                            Contact your administrator to configure permissions
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-background rounded-xl overflow-hidden">
                        <DynamicTable
                          data={permissionTableData}
                          customRender={permissionCustomRender}
                          disableSearch
                        />
                      </div>
                    )}
                  </div>

                  {/* Permission Legend */}
                  {!permLoading && permissionTableData.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Permission Legend
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-3 bg-primary rounded-full flex items-center p-0.5">
                            <div className="w-2 h-2 bg-background rounded-full ml-auto" />
                          </div>
                          <span className="text-muted-foreground">Permission Granted</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-3 bg-muted-foreground/20 rounded-full flex items-center p-0.5">
                            <div className="w-2 h-2 bg-background rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Permission Denied</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-3 bg-muted-foreground/20 rounded-full flex items-center p-0.5 opacity-50">
                            <div className="w-2 h-2 bg-background rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Wildcard Override</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                          <span className="text-muted-foreground">Processing Changes</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </HelmetWrapper>
  );
};

export default RolesManagement;
