import React, { useState } from 'react';
import { Plus, MoreVertical, Clock, User, Trash2, Pencil } from 'lucide-react';
import { DynamicForm } from '../DynamicForm';
import { TimeRangePicker } from '../ui/timeRangePicker';
import { DateRangePicker } from '../ui/dateRangePicker';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  dateRange?: any;
  time?: any;
  timeRange?: any;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-blue-500',
    tasks: [
      {
        id: '1',
        title: 'Design System Update',
        description: 'Update the design system with new components',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-01-15',
        tags: ['Design', 'UI'],
        difficulty: 'medium',
      },
      {
        id: '2',
        title: 'API Integration',
        description: 'Integrate payment gateway API',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-01-20',
        tags: ['Backend', 'API'],
        difficulty: 'hard',
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-yellow-500',
    tasks: [
      {
        id: '3',
        title: 'User Authentication',
        description: 'Implement OAuth2 authentication flow',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-01-18',
        tags: ['Security', 'Auth'],
        difficulty: 'hard',
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
    tasks: [
      {
        id: '4',
        title: 'Database Setup',
        description: 'Set up PostgreSQL database with migrations',
        priority: 'medium',
        assignee: 'Sarah Wilson',
        dueDate: '2024-01-10',
        tags: ['Database', 'Backend'],
        difficulty: 'easy',
      }
    ]
  }
];

const taskFormSchema = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'assignee', label: 'Assignee', type: 'text' },
  { name: 'dueDate', label: 'Due Date', type: 'date' },
  { name: 'dateRange', label: 'Date Range', type: 'daterange' },
  { name: 'time', label: 'Time', type: 'time' },
  { name: 'timeRange', label: 'Time Range', type: 'timerange' },
  { name: 'tags', label: 'Tags', type: 'text', placeholder: 'Comma separated' },
  { name: 'priority', label: 'Priority', type: 'select', options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ]
  },
  { name: 'difficulty', label: 'Difficulty', type: 'select', options: [
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' }
    ]
  }
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalColumnId, setModalColumnId] = useState<string>('');
  const [editTask, setEditTask] = useState<Task | null>(null);
  // Change menuTask to only track taskId and colId
  const [menuTask, setMenuTask] = useState<{ taskId: string; colId: string } | null>(null);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceColId: string } | null>(null);

  // Add/Edit column state
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');
  const [newColColor, setNewColColor] = useState('bg-blue-500');
  const [editingColId, setEditingColId] = useState<string | null>(null);
  const [editingColTitle, setEditingColTitle] = useState('');

  // Edit Column Modal State
  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);
  const [editColId, setEditColId] = useState<string | null>(null);
  const [editColTitle, setEditColTitle] = useState('');
  const [editColColor, setEditColColor] = useState('bg-blue-500');

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, task: Task, colId: string) => {
    setDraggedTask({ task, sourceColId: colId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColId } = draggedTask;
    if (sourceColId === targetColId) return;

    setColumns(cols => cols.map(col => {
      if (col.id === sourceColId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) };
      }
      if (col.id === targetColId) {
        return { ...col, tasks: [task, ...col.tasks] };
      }
      return col;
    }));
    setDraggedTask(null);
  };

  // Add/Edit Task Modal
  const openAddModal = (colId: string) => {
    setModalColumnId(colId);
    setEditTask(null);
    setModalOpen(true);
  };
  const openEditModal = (colId: string, task: Task) => {
    setModalColumnId(colId);
    setEditTask(task);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  // Add column handler
  const handleAddColumn = (title: string, color: string) => {
    setColumns(cols => [
      ...cols,
      { id: Date.now().toString(), title, color, tasks: [] }
    ]);
    setAddColumnModalOpen(false);
    setNewColTitle('');
    setNewColColor('bg-blue-500');
  };

  // Delete column handler
  const handleDeleteColumn = (colId: string) => {
    if (window.confirm('Delete this column and all its tasks?')) {
      setColumns(cols => cols.filter(col => col.id !== colId));
    }
  };

  // Edit column title handler
  const handleEditColumnTitle = (colId: string, newTitle: string) => {
    setColumns(cols => cols.map(col =>
      col.id === colId ? { ...col, title: newTitle } : col
    ));
    setEditingColId(null);
    setEditingColTitle('');
  };

  // Open edit column modal
  const openEditColumnModal = (col: Column) => {
    setEditColId(col.id);
    setEditColTitle(col.title);
    setEditColColor(col.color);
    setEditColumnModalOpen(true);
  };

  // Handle edit column modal submit
  const handleEditColumnModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editColId) return;
    setColumns(cols => cols.map(col =>
      col.id === editColId ? { ...col, title: editColTitle, color: editColColor } : col
    ));
    setEditColumnModalOpen(false);
    setEditColId(null);
    setEditColTitle('');
    setEditColColor('bg-blue-500');
  };

  // Handle DynamicForm submit
  const handleDynamicFormSubmit = (formData: any) => {
    // Parse tags
    const tags = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : formData.tags;
    const taskData = { ...formData, tags };
    if (editTask) {
      // Edit
      setColumns(cols => cols.map(col =>
        col.id === modalColumnId
          ? { ...col, tasks: col.tasks.map(t => t.id === editTask.id ? { ...editTask, ...taskData } : t) }
          : col
      ));
    } else {
      // Add
      const newTask: Task = { ...taskData, id: Date.now().toString() };
      setColumns(cols => cols.map(col =>
        col.id === modalColumnId
          ? { ...col, tasks: [newTask, ...col.tasks] }
          : col
      ));
    }
    closeModal();
  };
  // Delete Task
  const handleDelete = (colId: string, taskId: string) => {
    setColumns(cols => cols.map(col =>
      col.id === colId
        ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
        : col
    ));
    setMenuTask(null);
  };
  // Move Task
  const handleMove = (fromColId: string, toColId: string, task: Task) => {
    setColumns(cols => cols.map(col => {
      if (col.id === fromColId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) };
      }
      if (col.id === toColId) {
        return { ...col, tasks: [task, ...col.tasks] };
      }
      return col;
    }));
    setMenuTask(null);
  };
  // Priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Difficulty color (optional)
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-purple-600';
      case 'medium': return 'bg-blue-600';
      case 'easy': return 'bg-green-600';
      default: return 'bg-gray-400';
    }
  };

  const colorOptions = [
    'bg-blue-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-gray-500'
  ];

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColId, setSelectedColId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarEditMode, setSidebarEditMode] = useState(false);

  // Open sidebar with task details
  const handleCardClick = (colId: string, task: Task) => {
    setSelectedTask(task);
    setSelectedColId(colId);
    setSidebarOpen(true);
    setSidebarEditMode(false);
  };

  // Close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarEditMode(false);
    setSelectedTask(null);
    setSelectedColId(null);
  };

  // Save edits from sidebar
  const handleSidebarEditSave = (formData: any) => {
    const tags = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : formData.tags;
    const taskData = { ...formData, tags };
    if (selectedTask && selectedColId) {
      setColumns(cols => cols.map(col =>
        col.id === selectedColId
          ? { ...col, tasks: col.tasks.map(t => t.id === selectedTask.id ? { ...selectedTask, ...taskData } : t) }
          : col
      ));
      setSelectedTask({ ...selectedTask, ...taskData });
    }
    setSidebarEditMode(false);
  };

  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close menuTask when clicking outside
  React.useEffect(() => {
    if (!menuTask) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuTask(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuTask]);

  return (
    <div className="h-full relative bg-gray-100 dark:bg-gray-900 p-4 rounded">
      {/* Add Column Button */}
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setAddColumnModalOpen(true)}
      >
        + Add Column
      </button>
      {/* Add Column Modal */}
      {addColumnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-lg mb-4">Add Column</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAddColumn(newColTitle, newColColor);
              }}
            >
              <input
                value={newColTitle}
                onChange={e => setNewColTitle(e.target.value)}
                placeholder="Column Title"
                className="w-full px-3 py-2 rounded border mb-3"
                required
              />
              {/* Color palette for new column */}
              <div className="flex gap-2 flex-wrap mb-3">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${newColColor === color ? 'border-black' : 'border-transparent'} ${color}`}
                    onClick={() => setNewColColor(color)}
                    aria-label={color}
                  />
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAddColumnModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 text-gray-800 border border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-500">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Column Modal */}
      {editColumnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-lg mb-4">Edit Column</h3>
            <form onSubmit={handleEditColumnModalSubmit}>
              <input
                value={editColTitle}
                onChange={e => setEditColTitle(e.target.value)}
                placeholder="Column Title"
                className="w-full px-3 py-2 rounded border mb-3"
                required
              />
              {/* Color palette for edit column */}
              <div className="flex gap-2 flex-wrap mb-3">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${editColColor === color ? 'border-black' : 'border-transparent'} ${color}`}
                    onClick={() => setEditColColor(color)}
                    aria-label={color}
                  />
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditColumnModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 text-gray-800 border border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-500">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
      </div>
      )}
      {/* Modal for Add/Edit Task */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-xl flex flex-col max-h-[90vh]">
            <h3 className="font-semibold text-lg mb-4 px-6 pt-6">{editTask ? 'Edit Task' : 'Add Task'}</h3>
            <div className="overflow-y-auto px-6" style={{ maxHeight: '60vh' }}>
              <DynamicForm
                schema={taskFormSchema}
                onSubmit={handleDynamicFormSubmit}
                onCancel={closeModal}
                defaultValues={editTask ? { ...editTask, tags: editTask.tags.join(', ') } : { tags: '' }}
                submitButtonText={editTask ? 'Save' : 'Add'}
              />
            </div>
          </div>
        </div>
      )}
      {/* Task Menu */}
      {/* (Removed the old global menuTask rendering here) */}
      {/* Sidebar for task details */}
      {sidebarOpen && selectedTask && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
          {/* Sliding Sidebar with glassmorphism and accent bar */}
          <aside
            className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col border-l border-gray-200 dark:border-gray-800 transition-transform duration-600 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ willChange: 'transform' }}
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-l-lg" />
            {/* Glassmorphism background */}
            <div className="relative flex-1 flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-l-2xl h-full overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-lg font-bold text-blue-600 dark:text-pink-400">
                    <svg className="w-6 h-6 text-blue-500 dark:text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Task Details
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!sidebarEditMode && (
                    <button onClick={() => setSidebarEditMode(true)} className="rounded-full p-2 bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition" title="Edit">
                      <Pencil className="w-5 h-5 text-blue-600 dark:text-pink-400" />
                    </button>
                  )}
                  <button onClick={closeSidebar} className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-red-200 dark:hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition" title="Close">
                    <span className="text-2xl text-gray-700 dark:text-white">&times;</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6 animate-fade-in">
                {sidebarEditMode ? (
                  <DynamicForm
                    schema={taskFormSchema}
                    onSubmit={handleSidebarEditSave}
                    onCancel={() => setSidebarEditMode(false)}
                    defaultValues={{ ...selectedTask, tags: selectedTask.tags.join(', ') }}
                    submitButtonText="Save"
                  />
                ) : (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                        <svg className="w-4 h-4 text-blue-500 dark:text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Title
                      </div>
                      <div className="font-semibold text-xl text-gray-900 dark:text-white">{selectedTask.title}</div>
                    </div>
                    {/* Description */}
                    {selectedTask.description && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6" /></svg>
                          Description
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{selectedTask.description}</div>
                      </div>
                    )}
                    {/* Assignee */}
                    {selectedTask.assignee && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Assignee
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{selectedTask.assignee}</div>
                      </div>
                    )}
                    {/* Due Date */}
                    {selectedTask.dueDate && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          Due Date
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{selectedTask.dueDate}</div>
                      </div>
                    )}
                    {/* Date Range */}
                    {selectedTask.dateRange && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2-4h6a2 2 0 012 2v4H7V6a2 2 0 012-2z" /></svg>
                          Date Range
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{typeof selectedTask.dateRange === 'string' ? selectedTask.dateRange : JSON.stringify(selectedTask.dateRange)}</div>
                      </div>
                    )}
                    {/* Time */}
                    {selectedTask.time && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Time
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{typeof selectedTask.time === 'string' ? selectedTask.time : JSON.stringify(selectedTask.time)}</div>
                      </div>
                    )}
                    {/* Time Range */}
                    {selectedTask.timeRange && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Time Range
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{typeof selectedTask.timeRange === 'string' ? selectedTask.timeRange : JSON.stringify(selectedTask.timeRange)}</div>
                      </div>
                    )}
                    {/* Tags */}
                    {selectedTask.tags && selectedTask.tags.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01" /></svg>
                          Tags
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedTask.tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Priority */}
                    {selectedTask.priority && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Priority
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getPriorityColor(selectedTask.priority)} text-white`}>{selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}</span>
                      </div>
                    )}
                    {/* Difficulty */}
                    {selectedTask.difficulty && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-1">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Difficulty
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getDifficultyColor(selectedTask.difficulty)} text-white`}>{selectedTask.difficulty.charAt(0).toUpperCase() + selectedTask.difficulty.slice(1)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  {/* Editable column title */}
                  {editingColId === column.id ? (
                    <input
                      value={editingColTitle}
                      onChange={e => setEditingColTitle(e.target.value)}
                      onBlur={() => handleEditColumnTitle(column.id, editingColTitle)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleEditColumnTitle(column.id, editingColTitle);
                      }}
                      className="font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-400"
                      autoFocus
                    />
                  ) : (
                    <h3
                      className="font-semibold text-gray-900 dark:text-white cursor-pointer"
                      onClick={() => {
                        setEditingColId(column.id);
                        setEditingColTitle(column.title);
                      }}
                    >
                    {column.title}
                  </h3>
                  )}
                  <button
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => openEditColumnModal(column)}
                    title="Edit column title and color"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => openAddModal(column.id)}
                  >
                  <Plus className="w-4 h-4" />
                </button>
                  <button
                    onClick={() => handleDeleteColumn(column.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
                className={`max-h-[400px] overflow-y-auto transition-colors ${
                  draggedTask && draggedTask.sourceColId !== column.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                {column.tasks.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No tasks in this column
                  </div>
                ) : (
                  column.tasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, column.id)}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-3 shadow-sm border border-gray-200 dark:border-gray-600 cursor-grab active:cursor-grabbing transition-all hover:shadow-md relative"
                      onClick={() => handleCardClick(column.id, task)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {task.title}
                        </h4>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation(); // Prevent sidebar from opening
                              setMenuTask({ taskId: task.id, colId: column.id });
                            }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {/* Task Menu rendered inside the card, absolutely positioned */}
                          {menuTask && menuTask.taskId === task.id && menuTask.colId === column.id && (
                            <div
                              ref={menuRef}
                              className="absolute z-50 right-0 mt-2"
                              style={{ minWidth: 140 }}
                            >
                              <div className="bg-white dark:bg-gray-800 rounded shadow-lg border dark:border-gray-700 min-w-[140px]">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { openEditModal(column.id, task); setMenuTask(null); }}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleDelete(column.id, task.id)}>Delete</button>
                                {columns.filter(col => col.id !== column.id).map(col => (
                                  <button key={col.id} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleMove(column.id, col.id, task)}>
                                    Move to {col.title}
                                  </button>
                                ))}
                                <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setMenuTask(null)}>Close</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {task.assignee}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {task.dueDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1">
                          {task.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                          {/* Difficulty indicator */}
                          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(task.difficulty)} text-white`}>
                            {task.difficulty
                              ? task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)
                              : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
