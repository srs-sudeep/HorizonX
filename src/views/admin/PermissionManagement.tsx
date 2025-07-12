import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DynamicForm,
  DynamicTable,
  HelmetWrapper,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  toast,
} from '@/components';
import {
  useCreatePermission,
  useDeletePermission,
  usePermissions,
  useUpdatePermission,
} from '@/hooks';
import { FieldType, Permission } from '@/types';
import { ChevronDownIcon, Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const PermissionManagement = () => {
  const { data: permissions = [], isFetching } = usePermissions();
  const updateMutation = useUpdatePermission();
  const deleteMutation = useDeletePermission();
  const createMutation = useCreatePermission();

  const [editPermission, setEditPermission] = useState<Permission | null>(null);
  const [groupByResource] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [targetResource, setTargetResource] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [resourceFilter, setResourceFilter] = useState<string[]>([]);

  const allResources = useMemo(
    () => Array.from(new Set(permissions.map(p => p.resource))).sort(),
    [permissions]
  );

  const filteredPermissions = useMemo(() => {
    let perms = permissions;
    if (resourceFilter.length > 0) {
      perms = perms.filter(perm => resourceFilter.includes(perm.resource));
    }
    if (globalSearch.trim()) {
      perms = perms.filter(
        perm =>
          perm.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
          perm.description.toLowerCase().includes(globalSearch.toLowerCase()) ||
          perm.resource.toLowerCase().includes(globalSearch.toLowerCase()) ||
          perm.action.toLowerCase().includes(globalSearch.toLowerCase()) ||
          String(perm.permission_id).includes(globalSearch)
      );
    }
    return perms;
  }, [permissions, globalSearch, resourceFilter]);

  const grouped = useMemo(() => {
    if (!groupByResource) return { All: filteredPermissions };
    return filteredPermissions.reduce<Record<string, Permission[]>>((acc, perm) => {
      acc[perm.resource] = acc[perm.resource] || [];
      acc[perm.resource].push(perm);
      return acc;
    }, {});
  }, [filteredPermissions, groupByResource]);

  const handleEdit = (perm: Permission) => {
    setEditPermission(perm);
  };

  const handleUpdate = async (formData: Record<string, any>) => {
    if (!editPermission) return;
    await updateMutation.mutateAsync({
      permission_id: editPermission.permission_id,
      payload: {
        name: formData.name,
        description: formData.description,
        resource: formData.resource,
        action: formData.action,
      },
    });
    toast({ title: 'Permission updated' });
    setEditPermission(null);
  };

  const handleDelete = async (permission_id: number) => {
    await deleteMutation.mutateAsync(permission_id);
    toast({ title: 'Permission deleted' });
  };

  const handleCreate = async (formData: Record<string, any>) => {
    const payload = {
      name: formData.name,
      description: formData.description,
      resource: formData.resource,
      action: formData.action,
    };
    createMutation.mutate(payload);
    toast({ title: 'Permission created' });
    setCreateDialogOpen(false);
  };

  const schema: FieldType[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      columns: 2,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      columns: 2,
    },
    {
      name: 'resource',
      label: 'Resource',
      type: 'text',
      required: true,
      columns: 2,
      disabled: true,
    },
    {
      name: 'action',
      label: 'Action',
      type: 'radio',
      required: true,
      columns: 2,
      options: ['read', 'create', 'update', 'delete'],
    },
    {
      name: 'expressions',
      label: 'Expressions',
      type: 'textarea',
      required: false,
      columns: 2,
      placeholder: 'Type expressions here...',
    },
  ];

  const customRender = {
    Edit: (_: any, perm: Permission) => (
      <Dialog
        open={editPermission?.permission_id === perm.permission_id}
        onOpenChange={open => {
          if (!open) setEditPermission(null);
        }}
      >
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" onClick={() => handleEdit(perm)}>
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={schema.map(field =>
              field.name === 'resource' ? { ...field, disabled: true } : field
            )}
            onSubmit={handleUpdate}
            defaultValues={editPermission ?? undefined}
            onCancel={() => setEditPermission(null)}
            submitButtonText="Save"
          />
        </DialogContent>
      </Dialog>
    ),
    Delete: (_: any, perm: Permission) => (
      <Button
        size="icon"
        variant="destructive"
        onClick={() => handleDelete(perm.permission_id)}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    ),
  };

  const getTableData = (perms: Permission[]) =>
    perms.map(perm => ({
      Name: perm.name,
      PermissionId: perm.permission_id,
      Description: perm.description,
      Action: perm.action,
      Edit: '',
      Delete: '',
      _row: perm,
    }));

  const resourceCount = Object.keys(grouped).length;
  const totalPermissions = filteredPermissions.length;

  return (
    <HelmetWrapper
      title="Permissions | HorizonX"
      heading="Permission Management"
      subHeading="Manage permissions for modules and user actions in the system."
    >
      <div className="rounded-xl mb-4 shadow-sm border border-muted bg-card p-4 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:max-w-[180px] flex justify-between items-center"
              >
                <span>
                  {resourceFilter.length === 0
                    ? 'Filter by Resource'
                    : `Resources (${resourceFilter.length})`}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <ScrollArea className="h-48">
                {allResources.map(resource => (
                  <div
                    key={resource}
                    className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setResourceFilter(prev =>
                        prev.includes(resource)
                          ? prev.filter(r => r !== resource)
                          : [...prev, resource]
                      );
                    }}
                  >
                    <Checkbox
                      checked={resourceFilter.includes(resource)}
                      onCheckedChange={() => {
                        setResourceFilter(prev =>
                          prev.includes(resource)
                            ? prev.filter(r => r !== resource)
                            : [...prev, resource]
                        );
                      }}
                      className="mr-2"
                      tabIndex={-1}
                      aria-label={resource}
                    />
                    <span className="capitalize">{resource}</span>
                  </div>
                ))}
              </ScrollArea>
              {resourceFilter.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => setResourceFilter([])}
                >
                  Clear All
                </Button>
              )}
            </PopoverContent>
          </Popover>

          {/* Global Search */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search permissions by name, description, resource or action..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className="pl-10 pr-10 py-2 h-10 bg-background text-foreground rounded-md"
            />
            {globalSearch && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGlobalSearch('')}
                  className="h-6 w-6 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <Button
            onClick={() => {
              setTargetResource(null);
              setCreateDialogOpen(true);
            }}
            className="whitespace-nowrap w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Permission
          </Button>
        </div>

        {/* Search results summary - inside the card */}
        {(globalSearch || resourceFilter.length > 0) && (
          <div className="mt-3 pt-3 border-t border-muted flex flex-row gap-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-background rounded-full flex items-center justify-center mr-3">
                <Search className="h-4 w-4 text-primary dark:text-foreground" />
              </div>
              <p className="text-sm text-primary dark:text-foreground">
                {totalPermissions === 0
                  ? 'No permissions found for your search/filter.'
                  : `Found ${totalPermissions} permission${totalPermissions !== 1 ? 's' : ''} in ${resourceCount} resource${resourceCount !== 1 ? 's' : ''}.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {resourceFilter.map(resource => (
                <Badge
                  key={resource}
                  variant="secondary"
                  className="flex items-center gap-1 bg-muted border border-foreground"
                >
                  <span className="capitalize">{resource}</span>
                  <button
                    className="ml-1 text-xs text-destructive cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      setResourceFilter(prev => prev.filter(r => r !== resource));
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      {Object.keys(grouped).length === 0 ? (
        // Empty state when no results are found
        <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-lg border-muted">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-accent-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No permissions found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            {globalSearch
              ? `No permissions match your search for "${globalSearch}". Try using different keywords.`
              : "No permissions are available. Create your first permission by clicking 'Add Permission'."}
          </p>
        </div>
      ) : (
        Object.entries(grouped).map(([resource, perms]) => (
          <div key={resource} className="mb-8">
            <DynamicTable
              data={getTableData(perms).map(row => ({
                ...row,
                Edit: customRender.Edit('', row._row),
                Delete: customRender.Delete('', row._row),
              }))}
              isLoading={isFetching}
              customRender={{}}
              onRowClick={() => {}}
              tableHeading={resource}
              headerActions={
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setTargetResource(resource);
                      setCreateDialogOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Permission
                  </Button>
                </div>
              }
            />
          </div>
        ))
      )}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Permission</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={schema.map(field =>
              field.name === 'resource' ? { ...field, disabled: targetResource !== null } : field
            )}
            defaultValues={{ resource: targetResource }}
            onSubmit={handleCreate}
            onCancel={() => setCreateDialogOpen(false)}
            submitButtonText="Create"
          />
        </DialogContent>
      </Dialog>
    </HelmetWrapper>
  );
};

export default PermissionManagement;
