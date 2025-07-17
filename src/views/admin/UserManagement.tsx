import { HelmetWrapper, Sheet, SheetContent, SheetTitle, DynamicTable, toast } from '@/components';
import { useUsers, useAssignRoleToUser, useRemoveRoleFromUser, useUserFilter } from '@/hooks';
import { Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import type { FilterConfig, UserAPI, UserRoleAPI } from '@/types';

const UserManagement = () => {
  const [filters, setFilters] = useState<{ status?: boolean; roles?: number[] }>({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: filterOptions } = useUserFilter();
  const { data, isPending: usersLoading } = useUsers({
    ...filters,
    search,
    limit,
    offset: (page - 1) * limit,
  });
  const users: UserAPI[] = Array.isArray(data)
    ? data
    : data && Array.isArray((data as { users?: UserAPI[] }).users)
      ? (data as { users: UserAPI[] }).users
      : [];
  const totalCount = data?.total_count ?? 0;
  const assignRoleToUser = useAssignRoleToUser();
  const removeRoleFromUser = useRemoveRoleFromUser();

  const [editUser, setEditUser] = useState<UserAPI | null>(null);

  // Filter state for filterConfig
  const [selectedRoleNames, setSelectedRoleNames] = useState<string[]>([]);
  const [selectedStatusLabel, setSelectedStatusLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (filterOptions?.roles) {
      setSelectedRoleNames(prev =>
        prev.filter(roleName => filterOptions.roles.some(r => r.name === roleName))
      );
    }
    if (filterOptions?.status) {
      setSelectedStatusLabel(prev =>
        filterOptions.status.some(s => s.label === prev) ? prev : undefined
      );
    }
  }, [filterOptions]);

  useEffect(() => {
    if (!editUser) return;
    const updated = users.find(u => u.username === editUser.username);
    if (updated) setEditUser(updated);
  }, [users, editUser?.username]);

  const getTableData = (users: UserAPI[]) =>
    users.map(user => ({
      Name: user.name,
      Username: user.username,
      Email: user.email,
      Phone: user.phoneNumber,
      Active: user.is_active,
      Roles: user.roles
        .filter(r => r.isAssigned)
        .map(role => ({
          label: role.name,
          value: role.role_id,
        })),
      _row: user,
    }));

  // FilterConfig with value and onChange for each filter
  const filterConfig: FilterConfig[] = useMemo(
    () => [
      {
        column: 'Active',
        type: 'dropdown',
        options: filterOptions?.status?.map(s => s.label) ?? [],
        value: selectedStatusLabel,
        onChange: (val: string | undefined) => {
          setSelectedStatusLabel(val);
          const statusValue = filterOptions?.status?.find(s => s.label === val)?.value;
          setFilters(f => ({ ...f, status: statusValue }));
        },
      },
      {
        column: 'Roles',
        type: 'multi-select',
        options: filterOptions?.roles?.map(r => r.name) ?? [],
        value: selectedRoleNames,
        onChange: (val: string[]) => {
          setSelectedRoleNames(val);
          const roles = val
            .map(roleName => filterOptions?.roles?.find(r => r.name === roleName)?.role_id)
            .filter((id): id is number => typeof id === 'number');
          setFilters(f => ({ ...f, roles: roles.length ? roles : undefined }));
        },
      },
    ],
    [filterOptions, selectedStatusLabel, selectedRoleNames]
  );

  const customRender = {
    Active: (value: boolean) => (
      <span className={value ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
    Roles: (_: any, row: any) => (
      <div className="flex flex-wrap gap-1">
        {row._row.roles.filter((r: UserRoleAPI) => r.isAssigned).length > 0 ? (
          row._row.roles
            .filter((r: UserRoleAPI) => r.isAssigned)
            .map((role: UserRoleAPI) => (
              <span
                key={role.role_id}
                className="px-2 py-0.5 rounded-full text-xs font-medium border bg-chip-blue/10 border-chip-blue text-chip-blue"
              >
                {role.name}
              </span>
            ))
        ) : (
          <span className="text-muted-foreground text-xs">No Roles</span>
        )}
      </div>
    ),
  };

  return (
    <HelmetWrapper
      title="Users | HorizonX"
      heading="User Management"
      subHeading="Manage users, roles, and permissions for your organization."
    >
      <DynamicTable
        data={getTableData(users)}
        customRender={customRender}
        onRowClick={row => setEditUser(row._row)}
        filterConfig={filterConfig}
        filterMode="ui"
        onSearchChange={setSearch}
        page={page}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={setLimit}
        total={totalCount}
        isLoading={usersLoading}
      />
      <Sheet open={!!editUser} onOpenChange={open => !open && setEditUser(null)}>
        <SheetTitle style={{ display: 'none' }} />
        <SheetContent
          side="right"
          className="
              p-0 
              fixed right-0 top-1/2 -translate-y-1/2
              min-h-fit max-h-[100vh]
              sm:w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw]
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
              {editUser && (
                <>
                  <div className="border-b border-border pb-4">
                    <h2 className="text-3xl font-bold text-foreground mb-2">User Details</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage user information and role assignments
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Name</span>
                        <span className="text-sm font-semibold text-foreground">
                          {editUser.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Username</span>
                        <span className="text-sm font-mono text-foreground">{editUser.username}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Email</span>
                        <span className="text-sm font-mono text-foreground">
                          {editUser.email}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">Phone</span>
                        <span className="text-sm font-mono text-foreground">
                          {editUser.phoneNumber}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground">Status</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            editUser.is_active
                              ? 'bg-success/10 border-success text-success'
                              : ' bg-destructive/10 border-destructive text-destructive'
                          }`}
                        >
                          {editUser.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Currently Assigned Roles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {editUser.roles.filter(r => r.isAssigned).length > 0 ? (
                        editUser.roles
                          .filter(r => r.isAssigned)
                          .map(role => (
                            <span
                              key={role.role_id}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                            >
                              {role.name}
                            </span>
                          ))
                      ) : (
                        <div className="w-full text-center py-8">
                          <span className="text-muted-foreground text-sm">
                            No roles currently assigned
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Manage Role Assignments
                    </h3>
                    <div className="space-y-3">
                      {editUser.roles.map((role: UserRoleAPI) => {
                        const isLoading =
                          assignRoleToUser.isPending || removeRoleFromUser.isPending;
                        const checked = !!role.isAssigned;
                        return (
                          <div
                            key={role.role_id}
                            className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">{role.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Role ID: {role.role_id}
                              </span>
                            </div>
                            <button
                              type="button"
                              className={`
                                  relative w-12 h-6 flex items-center rounded-full p-1 
                                  transition-all duration-200 ease-in-out
                                  ${
                                    checked
                                      ? 'bg-success shadow-inner'
                                      : 'bg-muted-foreground/20 shadow-inner'
                                  } 
                                  ${
                                    isLoading
                                      ? 'opacity-50 cursor-not-allowed'
                                      : 'cursor-pointer hover:scale-105'
                                  }
                                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                                `}
                              disabled={isLoading}
                              aria-pressed={checked}
                              aria-label={`${checked ? 'Remove' : 'Assign'} ${role.name} role`}
                              onClick={() => {
                                if (isLoading) return;
                                if (checked) {
                                  removeRoleFromUser.mutate(
                                    { user_id: editUser.id, role_id: role.role_id },
                                    {
                                      onSuccess: () =>
                                        toast({
                                          title: 'Role removed successfully',
                                          description: `${role.name} has been removed from ${editUser.name}`,
                                        }),
                                    }
                                  );
                                } else {
                                  assignRoleToUser.mutate(
                                    { user_id: editUser.id, role_id: role.role_id },
                                    {
                                      onSuccess: () =>
                                        toast({
                                          title: 'Role assigned successfully',
                                          description: `${role.name} has been assigned to ${editUser.name}`,
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
                                    ${checked ? 'translate-x-6' : 'translate-x-0'}
                                  `}
                              />
                              {isLoading && (
                                <Loader2 className="absolute inset-0 m-auto w-3 h-3 animate-spin text-foreground" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </HelmetWrapper>
  );
};

export default UserManagement;
