import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DynamicForm,
  DynamicTable,
  HelmetWrapper,
  Input,
  toast,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ScrollArea,
  Checkbox,
  Badge,
  Sheet,
  SheetContent,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import {
  useAddUserComponent,
  useCreateRoute,
  useDeleteRoute,
  useRemoveUserComponent,
  useRoles,
  useRouteComponents,
  useSidebarItems,
  useUpdateRoute,
  useUsers,
  useMultiUserComponents,
  useAddRouteComponent,
  useRemoveRouteComponent,
} from '@/hooks';
import { FieldType, FilterConfig } from '@/types';
import { Pencil, Plus, Trash2, Search, X, ChevronDownIcon, View, Loader2 } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const baseSchema: FieldType[] = [
  { name: 'path', label: 'Path', type: 'text', required: true, columns: 2 },
  { name: 'label', label: 'Label', type: 'text', required: true, columns: 2 },
  { name: 'icon', label: 'Icon', type: 'text', required: false, columns: 2 },
  { name: 'is_active', label: 'Active', type: 'toggle', columns: 1 },
  { name: 'is_sidebar', label: 'Is Sidebar', type: 'toggle', columns: 1 },
  {
    name: 'module_id',
    label: 'Module ID',
    type: 'number',
    required: true,
    columns: 2,
    disabled: true,
  },
  {
    name: 'parent_id',
    label: 'Parent ID',
    type: 'number',
    required: false,
    columns: 2,
    disabled: true,
  },
];

const RouteManagement = () => {
  const { sidebarItems, isLoading: sidebarLoading } = useSidebarItems({ role: 'all' });
  const createMutation = useCreateRoute();
  const updateMutation = useUpdateRoute();
  const deleteMutation = useDeleteRoute();
  const { data: allRolesApi = [], isFetching: rolesLoading } = useRoles();

  const [editRoute, setEditRoute] = useState<any | null>(null);
  const [createDialogParent, setCreateDialogParent] = useState<{
    module_id: number;
    parent_id: number | null;
  } | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [viewComponentPanel, setViewComponentPanel] = useState<number>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [tab, setTab] = useState<'user' | 'component'>('user');
  const [newComponentId, setNewComponentId] = useState('');

  // Fetch all users for the dropdown
  const { data: userListData } = useUsers({});
  const userList = userListData?.users || [];

  const userIdToName = useMemo(() => {
    const map: Record<string, string> = {};
    userList.forEach(u => {
      map[u.id] = u.name;
    });
    return map;
  }, [userList]);

  const allRoles = useMemo(
    () =>
      allRolesApi.map((role: any) => ({
        value: role.role_id,
        label: role.name,
      })),
    [allRolesApi]
  );

  const getSchema = (): FieldType[] => [
    ...baseSchema,
    {
      name: 'role_ids',
      label: 'Role IDs',
      type: 'select',
      multiSelect: true,
      required: false,
      columns: 2,
      options: allRoles,
      disabled: false,
    },
  ];

  const getSubModuleTableData = (subModules: any[]) =>
  subModules.map(sub => ({
    Label: sub.label,
    Path: sub.path || '',
    Icon: sub.icon,
    Status: sub.isActive,
    Roles: (sub.roles || []).map((role: any) => ({
      label: role.role_name || role.name || role.label || role,
      value: role.role_id || role.value || role,
    })),
    'Is Sidebar': sub.is_sidebar,
    Edit: '',
    Delete: '',
    Create: '',
    'View Component': '',
    _row: sub,
    _subModules: sub.children || [],
    _module_id: sub.module_id,
    _parent_id: sub.parent_id ?? null,
    _roles: sub.roles || [],
  }));

  const customRender = {
    Edit: (_: any, row: Record<string, any>) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={e => {
              e.stopPropagation();
              setEditRoute({
                ...row._row,
                module_id: row._module_id,
                parent_id: row._parent_id,
                is_active: row._row.isActive,
                role_ids: (row._row.roles || []).map((r: any) => String(r.role_id)),
              });
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Child Route</TooltipContent>
      </Tooltip>
    ),
    Delete: (_: any, row: Record<string, any>) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="destructive"
            onClick={e => {
              e.stopPropagation();
              if (row._row && row._row.id) {
                deleteMutation.mutate(row._row.id);
                toast({ title: 'Route deleted' });
              }
            }}
            disabled={false}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Route</TooltipContent>
      </Tooltip>
    ),
    Create: (_: any, row: Record<string, any>) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setCreateDialogParent({ module_id: row._module_id, parent_id: row._row.id });
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Child Route</TooltipContent>
      </Tooltip>
    ),
    Status: (value: boolean) => (
      <span
        className={`px-2 py-0.5 rounded-full ${value ? 'bg-success/10 border-success text-success' : 'bg-destructive/10 border-destructive text-destructive'}  text-xs font-medium border`}
      >
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
    'Is Sidebar': (value: boolean) => (
      <span
        className={`px-2 py-0.5 rounded-full ${value ? 'bg-chip-purple/10 border-chip-purple text-chip-purple' : 'bg-destructive/10 border-destructive text-destructive'}  text-xs font-medium border `}
      >
        {String(value)}
      </span>
    ),
    Icon: (value: string) => (
      <span>
        <i className={value} /> {value}
      </span>
    ),
    Roles: (roles: { label: string; value: string }[]) => (
      <div className="flex flex-wrap gap-1">
        {roles && roles.length > 0 ? (
          roles.map(role => (
            <span
              key={role.value}
              className="px-2 py-0.5 rounded-full text-xs font-medium border bg-chip-blue/10 border-chip-blue text-chip-blue"
            >
              {role.label}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground text-xs">No Roles</span>
        )}
      </div>
    ),
    'View Component': (_: any, row: Record<string, any>) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setViewComponentPanel(row._row.route_id || row._row.id);
            }}
          >
            <View className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Manage Route Components</TooltipContent>
      </Tooltip>
    ),
  };

  // Dropdown filter options
  const statusOptions = ['Active', 'Inactive'];
  const isSidebarOptions = ['true', 'false'];

  // Global filter state
  const [globalFilters, setGlobalFilters] = useState<{
    Status?: string;
    Roles?: string[];
    'Is Sidebar'?: string;
  }>({});

  // Prepare filterConfig for DynamicTable
  const filterConfig: FilterConfig[] = [
    {
      column: 'Roles',
      type: 'multi-select',
      options: allRoles.map(r => r.label),
    },
  ];

  // Recursive filter function for modules and submodules
  const recursiveFilter = (items: any[]): any[] => {
    const search = globalSearch.trim().toLowerCase();

    return items
      .map(mod => {
        // Prepare submodules for recursive filtering
        const subModules = mod.subModules || mod._subModules || [];
        const filteredSubModules = recursiveFilter(subModules);

        // Prepare row data for filtering
        const row = mod._row || mod;
        const roles = (row.roles || row.Roles || []).map((role: any) =>
          typeof role === 'object' ? role.role_name || role.name || role.label || role : role
        );
        const statusValue = (row.isActive ?? row.Status) ? 'Active' : 'Inactive';
        const isSidebarValue = String(row.is_sidebar ?? row['Is Sidebar']);

        // Check global search match
        let matches = true;
        if (search) {
          matches =
            (row.label || '').toLowerCase().includes(search) ||
            (row.path || '').toLowerCase().includes(search) ||
            (row.icon || '').toLowerCase().includes(search) ||
            roles.some((role: any) => (role || '').toLowerCase().includes(search));
        }

        // Check global filters
        if (matches && globalFilters.Status) {
          matches = statusValue === globalFilters.Status;
        }
        if (matches && globalFilters['Is Sidebar']) {
          matches = isSidebarValue === globalFilters['Is Sidebar'];
        }
        if (
          matches &&
          globalFilters.Roles &&
          Array.isArray(globalFilters.Roles) &&
          globalFilters.Roles.length > 0
        ) {
          const rowRoleLabels = roles.map((r: any) => (typeof r === 'object' ? r.label : r));
          matches = globalFilters.Roles.some((role: string) => rowRoleLabels.includes(role));
        }

        // Keep node if it matches or has matching children
        if (matches || filteredSubModules.length > 0) {
          return {
            ...mod,
            subModules: filteredSubModules,
            _subModules: filteredSubModules, // for nested tables
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  // Filtered sidebarItems based on global search
  const filteredSidebarItems = useMemo(
    () => recursiveFilter(sidebarItems),
    [sidebarItems, globalSearch, globalFilters]
  );

  // Render global filters (remove badges from inside the role filter)
  const renderGlobalFilters = () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 w-full min-w-[250px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search routes by label, path, icon, or role..."
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
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {/* Status Filter */}
        <div className="min-w-[180px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between items-center h-10">
                <span>{globalFilters.Status || 'Filter Status'}</span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <ScrollArea className="h-16">
                {statusOptions.map(opt => (
                  <div
                    key={opt}
                    className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setGlobalFilters(f => ({
                        ...f,
                        Status: f.Status === opt ? undefined : opt,
                      }));
                    }}
                  >
                    <Checkbox
                      checked={globalFilters.Status === opt}
                      onCheckedChange={() => {
                        setGlobalFilters(f => ({
                          ...f,
                          Status: f.Status === opt ? undefined : opt,
                        }));
                      }}
                      className="mr-2"
                      tabIndex={-1}
                      aria-label={opt}
                    />
                    <span>{opt}</span>
                  </div>
                ))}
              </ScrollArea>
              {globalFilters.Status && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => setGlobalFilters(f => ({ ...f, Status: undefined }))}
                >
                  Clear
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        {/* Is Sidebar Filter */}
        <div className="min-w-[180px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between items-center h-10">
                <span>{globalFilters['Is Sidebar'] || 'Filter Is Sidebar'}</span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <ScrollArea className="h-16">
                {isSidebarOptions.map(opt => (
                  <div
                    key={opt}
                    className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setGlobalFilters(f => ({
                        ...f,
                        'Is Sidebar': f['Is Sidebar'] === opt ? undefined : opt,
                      }));
                    }}
                  >
                    <Checkbox
                      checked={globalFilters['Is Sidebar'] === opt}
                      onCheckedChange={() => {
                        setGlobalFilters(f => ({
                          ...f,
                          'Is Sidebar': f['Is Sidebar'] === opt ? undefined : opt,
                        }));
                      }}
                      className="mr-2"
                      tabIndex={-1}
                      aria-label={opt}
                    />
                    <span>{opt}</span>
                  </div>
                ))}
              </ScrollArea>
              {globalFilters['Is Sidebar'] && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => setGlobalFilters(f => ({ ...f, 'Is Sidebar': undefined }))}
                >
                  Clear
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        {/* Roles Filter */}
        <div className="min-w-[180px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between items-center h-10">
                <span>
                  {globalFilters.Roles && globalFilters.Roles.length > 0
                    ? `Roles (${globalFilters.Roles.length})`
                    : 'Filter by Roles'}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <ScrollArea className="h-48">
                {allRoles.map(role => (
                  <div
                    key={role.label}
                    className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setGlobalFilters(prev => {
                        const prevRoles = prev.Roles || [];
                        return {
                          ...prev,
                          Roles: prevRoles.includes(role.label)
                            ? prevRoles.filter((r: string) => r !== role.label)
                            : [...prevRoles, role.label],
                        };
                      });
                    }}
                  >
                    <Checkbox
                      checked={globalFilters.Roles?.includes(role.label) || false}
                      onCheckedChange={() => {
                        setGlobalFilters(prev => {
                          const prevRoles = prev.Roles || [];
                          return {
                            ...prev,
                            Roles: prevRoles.includes(role.label)
                              ? prevRoles.filter((r: string) => r !== role.label)
                              : [...prevRoles, role.label],
                          };
                        });
                      }}
                      className="mr-2"
                      tabIndex={-1}
                      aria-label={role.label}
                    />
                    <span>{role.label}</span>
                  </div>
                ))}
              </ScrollArea>
              {globalFilters.Roles && globalFilters.Roles.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => setGlobalFilters(f => ({ ...f, Roles: undefined }))}
                >
                  Clear All
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* Chips for selected filters */}
      {(globalSearch ||
        globalFilters.Status ||
        globalFilters['Is Sidebar'] ||
        (globalFilters.Roles && globalFilters.Roles.length > 0)) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {globalSearch && (
            <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
              <Search className="w-3 h-3 mr-1" />
              <span>{globalSearch}</span>
              <button
                className="ml-1 text-xs text-muted-foreground hover:text-destructive cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  setGlobalSearch('');
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {globalFilters.Status && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 py-1 bg-muted border border-foreground"
            >
              <span>Status: {globalFilters.Status}</span>
              <button
                className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                onClick={e => {
                  e.stopPropagation();
                  setGlobalFilters(f => ({ ...f, Status: undefined }));
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {globalFilters['Is Sidebar'] && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 py-1 bg-muted border border-foreground"
            >
              <span>Is Sidebar: {globalFilters['Is Sidebar']}</span>
              <button
                className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                onClick={e => {
                  e.stopPropagation();
                  setGlobalFilters(f => ({ ...f, 'Is Sidebar': undefined }));
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {globalFilters.Roles &&
            globalFilters.Roles.map(role => (
              <Badge
                key={role}
                variant="secondary"
                className="flex items-center gap-1 py-1 bg-muted border border-foreground"
              >
                <span>{role}</span>
                <button
                  className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                  onClick={e => {
                    e.stopPropagation();
                    setGlobalFilters(prev => ({
                      ...prev,
                      Roles: (prev.Roles || []).filter((r: string) => r !== role) || undefined,
                    }));
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
        </div>
      )}
      {/* Search results summary */}
      {(globalSearch ||
        globalFilters.Status ||
        globalFilters['Is Sidebar'] ||
        (globalFilters.Roles && globalFilters.Roles.length > 0)) && (
        <div className="mt-2 pt-2 border-t border-muted-foreground flex flex-row gap-4 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">
              {/* You can customize this summary as needed */}
              Showing filtered results for your search/filter.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Render expanded component with recursive filtering
  const renderExpandedComponent = (row: Record<string, any>) => {
    if (!row._subModules || row._subModules.length === 0) return null;
    return (
      <DynamicTable
        data={getSubModuleTableData(recursiveFilter(row._subModules))}
        customRender={customRender}
        expandableRows={true}
        expandedComponent={renderExpandedComponent}
        rowExpandable={row => Array.isArray(row._subModules) && row._subModules.length > 0}
        disableSearch={true}
        filterConfig={filterConfig}
      />
    );
  };

  // Route components for the selected route
  const routeId = viewComponentPanel;
  const { data: routeComponents } = useRouteComponents(routeId ?? 0);
  const addRouteComponentMutation = useAddRouteComponent();
  const removeRouteComponentMutation = useRemoveRouteComponent();

  // Build userComponentsMap from hook
  const userComponentsMap = useMultiUserComponents(selectedUsers);

  // Prepare table data for user-component assignment
  const componentTableData = (routeComponents?.component_ids || []).map(component_id => {
    const row: any = { Component: component_id };
    selectedUsers.forEach(user_id => {
      row[userIdToName[user_id] || user_id] = { component_id, user_id }; // Show name, keep id for API
    });
    return row;
  });

  const addMutation = useAddUserComponent();
  const removeMutation = useRemoveUserComponent();

  const componentTableCustomRender = selectedUsers.reduce(
    (acc: { [key: string]: (val: any) => React.JSX.Element }, user_id) => {
      const userName = userIdToName[user_id] || user_id;
      acc[userName] = (val: any) => {
        const assignedComponents = userComponentsMap[user_id] || [];
        const isAssigned = assignedComponents.includes(val.component_id);
        const isLoading = addMutation.isPending || removeMutation.isPending;
        return (
          <button
            type="button"
            className={`relative w-12 h-6 flex items-center rounded-full p-1 
              transition-all duration-200 ease-in-out ${isAssigned ? 'bg-success' : 'bg-muted-foreground/20'} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`}
            disabled={isLoading}
            onClick={() => {
              if (isAssigned) {
                removeMutation.mutate({ component_id: val.component_id, user_id: val.user_id });
              } else {
                addMutation.mutate({ component_id: val.component_id, user_id: val.user_id });
              }
            }}
          >
            <span className={`bg-background w-4 h-4 rounded-full ${isAssigned ? 'translate-x-6' : 'translate-x-0'}`} />
            {isLoading && <Loader2 className="absolute inset-0 m-auto w-3 h-3 animate-spin text-foreground" />}
          </button>
        );
      };
      return acc;
    },
    {}
  );

  const routeComponentTableData = (routeComponents?.component_ids || []).map(component_id => ({
    Component: component_id,
    Actions: { route_id: routeId, component_id },
  }));

  const routeComponentTableCustomRender = {
    Actions: (val: { route_id?: number; component_id: string }) => (
      <Button
        size="icon"
        variant="destructive"
        onClick={() => {
          if (val.route_id && val.component_id) {
            removeRouteComponentMutation.mutate({ route_id: val.route_id, component_id: val.component_id });
          }
        }}
        disabled={removeRouteComponentMutation.isPending}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    ),
  };

  return (
    <HelmetWrapper
      title="Paths | HorizonX"
      heading="Path Management"
      subHeading="Manage application paths and their access control."
    >
      <div className="mb-4 rounded-xl shadow-sm border border-border bg-card p-4 transition-all duration-300">
        {renderGlobalFilters()}
      </div>

      {filteredSidebarItems.map((mod: any) => (
        <div key={mod.id} className="mb-8">
          <DynamicTable
            tableHeading={mod.label}
            data={getSubModuleTableData(mod.subModules || [])}
            customRender={customRender}
            expandableRows={true}
            expandedComponent={renderExpandedComponent}
            rowExpandable={row => Array.isArray(row._subModules) && row._subModules.length > 0}
            isLoading={sidebarLoading || rolesLoading}
            headerActions={
              <Button
                size="sm"
                onClick={() => {
                  setCreateDialogParent({ module_id: mod.id, parent_id: null });
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Route
              </Button>
            }
            onRowClick={() => {}}
            filterConfig={filterConfig}
          />
        </div>
      ))}
      {/* Edit Route Dialog */}
      <Dialog
        open={!!editRoute}
        onOpenChange={open => {
          if (!open) setEditRoute(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Route</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={getSchema()}
            defaultValues={{
              ...editRoute,
              module_id: editRoute?.module_id ?? '',
              parent_id: editRoute?.parent_id ?? '',
              is_active: !!editRoute?.isActive,
              role_ids: Array.isArray(editRoute?.role_ids)
                ? editRoute.role_ids.map(String)
                : (editRoute?.roles || []).map((r: any) => String(r.role_id)),
            }}
            onSubmit={async (formData: Record<string, any>) => {
              if (!editRoute) return;
              await updateMutation.mutateAsync({
                route_id: editRoute.id || editRoute.route_id,
                payload: {
                  path: formData.path,
                  label: formData.label,
                  icon: formData.icon,
                  is_active: !!formData.is_active,
                  is_sidebar: !!formData.is_sidebar,
                  module_id: Number(editRoute.module_id),
                  parent_id:
                    editRoute.parent_id === null || editRoute.parent_id === undefined
                      ? null
                      : Number(editRoute.parent_id),
                  role_ids: Array.isArray(formData.role_ids)
                    ? formData.role_ids.map((id: string) => Number(id))
                    : typeof formData.role_ids === 'string'
                      ? formData.role_ids.split(',').map((id: string) => Number(id.trim()))
                      : [],
                },
              });
              toast({ title: 'Route updated' });
              setEditRoute(null);
            }}
            onCancel={() => setEditRoute(null)}
            submitButtonText="Save"
          />
        </DialogContent>
      </Dialog>
      {/* Create Route Dialog */}
      <Dialog
        open={!!createDialogParent}
        onOpenChange={open => {
          if (!open) setCreateDialogParent(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Route</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={getSchema()}
            defaultValues={{
              module_id: createDialogParent?.module_id,
              parent_id: createDialogParent?.parent_id ?? '',
              role_ids: [],
            }}
            onSubmit={async (formData: Record<string, any>) => {
              if (!createDialogParent) return;
              await createMutation.mutateAsync({
                path: formData.path,
                label: formData.label,
                icon: formData.icon,
                is_active: !!formData.is_active,
                is_sidebar: !!formData.is_sidebar,
                module_id: Number(createDialogParent.module_id),
                parent_id:
                  createDialogParent.parent_id !== null &&
                  createDialogParent.parent_id !== undefined
                    ? Number(createDialogParent.parent_id)
                    : null,
                role_ids: Array.isArray(formData.role_ids)
                  ? formData.role_ids.map((id: string) => Number(id))
                  : typeof formData.role_ids === 'string'
                    ? formData.role_ids.split(',').map((id: string) => Number(id.trim()))
                    : [],
              });
              toast({ title: 'Route created' });
              setCreateDialogParent(null);
            }}
            onCancel={() => setCreateDialogParent(null)}
            submitButtonText="Create"
          />
        </DialogContent>
      </Dialog>
      {/* View Component Sheet */}
      <Sheet
        open={!!viewComponentPanel}
        onOpenChange={open => {
          if (!open) setViewComponentPanel(0);
        }}
      >
        <SheetTitle style={{ display: 'none' }} />
        <SheetContent side="right" className="
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
          style={{ width: '90vw', maxWidth: '1200px' }}>
          <Tabs value={tab} onValueChange={value => setTab(value as 'user' | 'component')} className='m-10'>
            <TabsList className='mb-5'>
              <TabsTrigger value="user">User Permissions</TabsTrigger>
              <TabsTrigger value="component">Add Components</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <DynamicForm
                schema={[
                  {
                    name: 'users',
                    label: 'Select Users',
                    type: 'select',
                    multiSelect: true,
                    options: userList.map(u => ({
                      value: u.id,
                      label: `${u.name} (${u.email})`,
                    })),
                    required: true,
                    columns: 2,
                  },
                ]}
                defaultValues={{ users: selectedUsers }}
                onSubmit={data => setSelectedUsers(data.users)}
              />
              {selectedUsers.length > 0 && (
                <DynamicTable
                  data={componentTableData}
                  customRender={componentTableCustomRender}
                  disableSearch
                  className='mt-10'
                />
              )}
            </TabsContent>
            <TabsContent value="component">
              <div className="space-y-4">
                {/* Input for new component */}
                <div className="flex gap-2 items-center mb-4">
                  <Input
                    type="text"
                    placeholder="Enter new component ID"
                    value={newComponentId}
                    onChange={e => setNewComponentId(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (newComponentId.trim() && routeId) {
                        addRouteComponentMutation.mutate(
                          { route_id: routeId, component_id: newComponentId.trim() },
                          { onSuccess: () => setNewComponentId('') }
                        );
                      }
                    }}
                    disabled={addRouteComponentMutation.isPending || !newComponentId.trim()}
                  >
                    Add Component
                  </Button>
                </div>

                {/* Table of components */}
                <DynamicTable
                  data={routeComponentTableData}
                  customRender={routeComponentTableCustomRender}
                  disableSearch
                  className='mt-10'
                />
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </HelmetWrapper>
  );
};

export default RouteManagement;
