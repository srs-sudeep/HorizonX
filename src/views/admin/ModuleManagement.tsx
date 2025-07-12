import { useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  DynamicForm,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DynamicTable,
  Button,
  toast,
  HelmetWrapper,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components';
import { useModules, useCreateModule, useUpdateModule, useDeleteModule } from '@/hooks';
import { FieldType, Module } from '@/types';

const schema: FieldType[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, columns: 2 },
  { name: 'label', label: 'Label', type: 'text', required: true, columns: 2 },
  { name: 'icon', label: 'Icon', type: 'text', required: true, columns: 2 },
  { name: 'is_active', label: 'Active', type: 'toggle', required: true, columns: 2 },
];

const ModuleManagement = () => {
  const { data: modules = [], isFetching } = useModules();
  const createMutation = useCreateModule();
  const updateMutation = useUpdateModule();
  const deleteMutation = useDeleteModule();

  const [editModule, setEditModule] = useState<Module | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleEdit = (mod: Module) => setEditModule(mod);

  const handleUpdate = async (formData: Record<string, any>) => {
    if (!editModule) return;
    await updateMutation.mutateAsync({
      module_id: editModule.module_id,
      payload: {
        name: formData.name,
        label: formData.label,
        icon: formData.icon,
        is_active: !!formData.is_active,
      },
    });
    toast({ title: 'Module updated' });
    setEditModule(null);
  };

  const handleDelete = async (module_id: number) => {
    await deleteMutation.mutateAsync(module_id);
    toast({ title: 'Module deleted' });
  };

  const handleCreate = async (formData: Record<string, any>) => {
    await createMutation.mutateAsync({
      name: formData.name,
      label: formData.label,
      icon: formData.icon,
      is_active: !!formData.is_active,
    });
    toast({ title: 'Module created' });
    setCreateDialogOpen(false);
  };

  const customRender = {
    Edit: (_: any, row: Record<string, any>) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={e => {
              e.stopPropagation();
              handleEdit(row._row);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Module</TooltipContent>
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
              handleDelete(row._row.id);
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Module</TooltipContent>
      </Tooltip>
    ),
    is_active: (value: boolean) => (
      <span className={value ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
    icon: (value: string) => (
      <span>
        <i className={value} /> {value}
      </span>
    ),
  };

  const getTableData = (mods: Module[]) =>
    mods.map(mod => ({
      Name: mod.name,
      Label: mod.label,
      Icon: mod.icon,
      Active: mod.is_active,
      Edit: '',
      Delete: '',
      _row: {
        ...mod,
      },
    }));

  return (
    <HelmetWrapper
      title="Modules | HorizonX"
      heading="Module Management"
      subHeading="Manage modules and their visibility in the application."
    >
      <DynamicTable
        data={getTableData(modules).map(row => ({
          ...row,
          Edit: customRender.Edit('', row._row),
          Delete: customRender.Delete('', row._row),
          Active: customRender.is_active(row.Active),
          Icon: customRender.icon(row.Icon),
        }))}
        customRender={customRender}
        isLoading={isFetching}
        onRowClick={() => {}}
        headerActions={
          <>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Module
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Module</DialogTitle>
                </DialogHeader>
                <DynamicForm
                  schema={schema}
                  onSubmit={handleCreate}
                  onCancel={() => setCreateDialogOpen(false)}
                  submitButtonText="Create"
                />
              </DialogContent>
            </Dialog>
          </>
        }
      />
      <Dialog
        open={!!editModule}
        onOpenChange={open => {
          if (!open) setEditModule(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
          </DialogHeader>
          <DynamicForm
            schema={schema}
            onSubmit={handleUpdate}
            defaultValues={editModule ?? undefined}
            onCancel={() => setEditModule(null)}
            submitButtonText="Save"
          />
        </DialogContent>
      </Dialog>
    </HelmetWrapper>
  );
};

export default ModuleManagement;
