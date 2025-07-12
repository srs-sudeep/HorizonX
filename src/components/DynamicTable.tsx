import {
  Button,
  Checkbox,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableShimmer,
  Transitions,
} from '@/components';

import { cn } from '@/lib/utils';
import { FilterConfig } from '@/types';
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

type DynamicTableProps = {
  data: Record<string, any>[];
  customRender?: {
    [key: string]: (value: any, row: Record<string, any>) => React.ReactNode;
  };
  isLoading?: boolean;
  filterConfig?: FilterConfig[];
  className?: string;
  expandableRows?: boolean;
  expandedComponent?: (row: Record<string, any>) => React.ReactNode;
  disableSearch?: boolean;
  onRowClick?: (row: Record<string, any>, index: number) => void;
  headerActions?: React.ReactNode;
  tableHeading?: string;
  rowExpandable?: (row: Record<string, any>) => boolean;
  filterMode?: 'local' | 'ui';
  onSearchChange?: (val: string) => void;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  total?: number;
};

type SortDirection = 'asc' | 'desc' | null;

function toSentenceCase(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  customRender = {},
  isLoading = false,
  filterConfig = [],
  className = '',
  expandableRows = false,
  expandedComponent,
  disableSearch = false,
  onRowClick,
  headerActions,
  tableHeading,
  rowExpandable,
  filterMode = 'local',
  onSearchChange,
  page = 1,
  onPageChange,
  limit = 2,
  onLimitChange,
  total = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [localPage, setLocalPage] = useState(1);
  const [localLimit, setLocalLimit] = useState(10);
  const headers = data.length ? Object.keys(data[0]).filter(key => !key.startsWith('_')) : [];
  const [totalRecords, setTotalRecords] = useState(total);
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const clearFilter = (column: string) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };
  const handleSearch = () => {
    if (filterMode === 'ui' && onSearchChange) {
      onSearchChange(searchTerm.trim() === '' ? '' : searchTerm);
    }
  };
  const now = new Date();
  const defaultFrom = new Date(now.getFullYear(), 0, 1);
  const defaultTo = new Date(now.getFullYear(), 11, 31);
  const [tempRange, setTempRange] = useState<{ from: Date; to: Date }>(() => ({
    from: defaultFrom,
    to: defaultTo,
  }));
  const renderFilter = (filter: FilterConfig) => {
    const currentValue = filter.value !== undefined ? filter.value : columnFilters[filter.column];
    const onChange =
      filter.onChange ??
      ((val: any) => {
        setColumnFilters(prev => ({
          ...prev,
          [filter.column]: val,
        }));
      });

    switch (filter.type) {
      case 'multi-select': {
        const selectedValues = Array.isArray(currentValue) ? currentValue : [];
        return (
          <div
            key={filter.column}
            className="w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px] xl:min-w-[220px] relative"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:min-w-[180px] lg:min-w-[200px] flex justify-between items-center h-10 sm:h-11 text-sm"
                >
                  <span className="truncate">
                    {selectedValues.length > 0
                      ? `${selectedValues.length} selected`
                      : `Filter ${filter.column}`}
                  </span>
                  <ChevronDownIcon className="ml-2 h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <ScrollArea className="max-h-48 overflow-auto">
                  {filter.options?.map(opt => (
                    <div
                      key={opt}
                      className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => {
                        const exists = selectedValues.includes(opt);
                        onChange(
                          exists
                            ? selectedValues.filter((v: string) => v !== opt)
                            : [...selectedValues, opt]
                        );
                      }}
                    >
                      <Checkbox
                        checked={selectedValues.includes(opt)}
                        onCheckedChange={() => {
                          const exists = selectedValues.includes(opt);
                          onChange(
                            exists
                              ? selectedValues.filter((v: string) => v !== opt)
                              : [...selectedValues, opt]
                          );
                        }}
                        className="mr-2"
                        tabIndex={-1}
                        aria-label={opt}
                      />
                      <span className="text-sm">{opt}</span>
                    </div>
                  ))}
                </ScrollArea>
                {selectedValues.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full text-sm"
                    onClick={() => onChange([])}
                  >
                    Clear All
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        );
      }

      case 'dropdown': {
        return (
          <div
            key={filter.column}
            className="w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px] relative"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center h-10 sm:h-11 text-sm"
                >
                  <span className="truncate">{currentValue || `Filter ${filter.column}`}</span>
                  <ChevronDownIcon className="ml-2 h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <ScrollArea className="max-h-48 overflow-auto">
                  {filter.options?.map(opt => (
                    <div
                      key={opt}
                      className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer"
                      onClick={() => onChange(opt === currentValue ? undefined : opt)}
                    >
                      <Checkbox
                        checked={currentValue === opt}
                        onCheckedChange={() => onChange(opt === currentValue ? undefined : opt)}
                        className="mr-2"
                        tabIndex={-1}
                        aria-label={opt}
                      />
                      <span className="text-sm">{opt}</span>
                    </div>
                  ))}
                </ScrollArea>
                {currentValue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full text-sm"
                    onClick={() => onChange(undefined)}
                  >
                    Clear
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        );
      }

      case 'date':
        return (
          <div
            key={filter.column}
            className="w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px] relative"
          >
            <DatePicker value={currentValue} onChange={val => onChange(val)} />
            {currentValue && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  clearFilter(filter.column);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted hover:text-muted-foreground z-10"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        );

      case 'date-range': {
        return (
          <div
            key={filter.column}
            className="w-full sm:w-auto sm:min-w-[220px] lg:min-w-[250px] relative flex items-center gap-2"
          >
            <DateRangePicker
              value={tempRange}
              onChange={setTempRange as any}
              className="w-full h-10 sm:h-11"
            />
            <Button
              size="sm"
              variant="outline"
              className="ml-2"
              disabled={!tempRange.from || !tempRange.to}
              onClick={() => onChange(tempRange)}
            >
              Apply
            </Button>
            {currentValue && (currentValue.startDate || currentValue.endDate) && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  clearFilter(filter.column);
                  setTempRange({
                    from: undefined as unknown as Date,
                    to: undefined as unknown as Date,
                  });
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted hover:text-muted-foreground z-10"
                title="Clear"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </button>
            )}
          </div>
        );
      }

      case 'datetime':
        return (
          <div
            key={filter.column}
            className="w-full sm:w-auto sm:min-w-[220px] lg:min-w-[250px] relative"
          >
            <DateTimePicker onChange={val => onChange(val)} />
            {currentValue && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  clearFilter(filter.column);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted hover:text-muted-foreground z-10"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  };
  const filteredData = useMemo(() => {
    if (filterMode === 'ui') {
      setTotalRecords(data.length);
      return data;
    }
    let result = data.filter(row => {
      let searchMatch = true;
      if (!disableSearch && searchTerm) {
        searchMatch = Object.values(row).some(val => {
          if (val == null) return false;
          if (Array.isArray(val)) {
            return val.some(item => String(item).toLowerCase().includes(searchTerm.toLowerCase()));
          }
          if (typeof val === 'object') {
            try {
              return JSON.stringify(val).toLowerCase().includes(searchTerm.toLowerCase());
            } catch {
              return false;
            }
          }
          return String(val).toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      if (!disableSearch && searchTerm && !searchMatch) {
        return false;
      }
      for (const [col, val] of Object.entries(columnFilters)) {
        if (val === null || val === undefined || val === '') continue;
        if (Array.isArray(val) && val.length === 0) continue;
        if (typeof val === 'object' && !(val instanceof Date) && !Array.isArray(val)) {
          if (Object.keys(val).length === 0) continue;
        }
        const rowValue = row[col];

        // --- Single Date filter ---
        if (val instanceof Date) {
          const rowDate = new Date(rowValue);
          if (isNaN(rowDate.getTime())) return false;
          const filterDate = new Date(val);
          filterDate.setHours(0, 0, 0, 0);
          const comparableRowDate = new Date(rowDate);
          comparableRowDate.setHours(0, 0, 0, 0);
          if (comparableRowDate.getTime() !== filterDate.getTime()) return false;
        }
        // --- Date Range filter ---
        else if (val && typeof val === 'object' && (val.from || val.to)) {
          let rowDate: Date | null = null;
          if (rowValue instanceof Date) {
            rowDate = rowValue;
          } else if (typeof rowValue === 'string') {
            rowDate = new Date(rowValue);
          }
          if (!rowDate || isNaN(rowDate.getTime())) return false;

          if (val.from) {
            const startDate = new Date(val.from);
            startDate.setHours(0, 0, 0, 0);
            if (rowDate < startDate) return false;
          }
          if (val.to) {
            const endDate = new Date(val.to);
            endDate.setHours(23, 59, 59, 999);
            if (rowDate > endDate) return false;
          }
        }
        // --- Time Range filter ---
        else if (val && typeof val === 'object' && (val.startTime || val.endTime)) {
          // rowValue should be a time string (e.g., "14:30")
          const [rowHour, rowMin] = String(rowValue).split(':').map(Number);
          const rowMinutes = rowHour * 60 + rowMin;

          if (val.startTime) {
            const [startHour, startMin] = String(val.startTime).split(':').map(Number);
            const startMinutes = startHour * 60 + startMin;
            if (rowMinutes < startMinutes) return false;
          }
          if (val.endTime) {
            const [endHour, endMin] = String(val.endTime).split(':').map(Number);
            const endMinutes = endHour * 60 + endMin;
            if (rowMinutes > endMinutes) return false;
          }
        }
        // --- Other filter types ---
        else if (Array.isArray(val)) {
          if (Array.isArray(rowValue)) {
            const hasMatch = val.some(selected =>
              rowValue.some(rv => String(rv.label).toLowerCase() === String(selected).toLowerCase())
            );
            if (!hasMatch) return false;
          } else {
            const hasMatch = val.some(
              selected => String(rowValue).toLowerCase() === String(selected).toLowerCase()
            );
            if (!hasMatch) return false;
          }
        } else {
          if (Array.isArray(rowValue)) {
            const hasMatch = rowValue.some(v =>
              typeof v === 'object' && v !== null && !Array.isArray(v)
                ? JSON.stringify(v).toLowerCase().includes(String(val).toLowerCase())
                : String(v).toLowerCase().includes(String(val).toLowerCase())
            );
            if (!hasMatch) return false;
          } else if (
            typeof rowValue === 'object' &&
            rowValue !== null &&
            !Array.isArray(rowValue) &&
            !React.isValidElement(rowValue)
          ) {
            if (!JSON.stringify(rowValue).toLowerCase().includes(String(val).toLowerCase())) {
              return false;
            }
          } else if (React.isValidElement(rowValue)) {
            return false;
          } else {
            if (!String(rowValue).toLowerCase().includes(String(val).toLowerCase())) {
              return false;
            }
          }
        }
      }

      return true;
    });
    // Sort the filtered data
    if (sortColumn && sortDirection) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        // Handle nulls/undefined
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortDirection === 'asc' ? -1 : 1;
        if (bVal == null) return sortDirection === 'asc' ? 1 : -1;

        // Handle dates
        if (aVal instanceof Date && bVal instanceof Date) {
          return sortDirection === 'asc'
            ? aVal.getTime() - bVal.getTime()
            : bVal.getTime() - aVal.getTime();
        }

        // Try to parse as dates if they're strings
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return sortDirection === 'asc'
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }

        // Handle numbers
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // Try to parse as numbers
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // Handle booleans
        if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
          return sortDirection === 'asc'
            ? aVal === bVal
              ? 0
              : aVal
                ? 1
                : -1
            : aVal === bVal
              ? 0
              : aVal
                ? -1
                : 1;
        }

        // Default string comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }
    setTotalRecords(result.length);
    return result;
  }, [data, searchTerm, columnFilters, disableSearch, sortColumn, sortDirection, filterMode]);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const activeColumnFilters =
    filterMode === 'ui'
      ? Object.fromEntries(
          (filterConfig || [])
            .filter(f => f.value && f.column !== 'search')
            .map(f => [f.column, f.value])
        )
      : columnFilters;

  const paginatedData = useMemo(() => {
    if (filterMode === 'ui') return filteredData;
    const start = (localPage - 1) * localLimit;
    return filteredData.slice(start, start + localLimit);
  }, [filteredData, filterMode, localPage, localLimit]);

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-2xl shadow-lg border border-border bg-card p-6 space-y-4 transition-all duration-300">
        {(tableHeading || headerActions) && (
          <div className="mb-4 space-y-4">
            {/* Table Heading and Header Actions - Responsive Layout */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Table Heading */}
              {tableHeading && (
                <div className="flex-1">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {toSentenceCase(tableHeading)}
                  </h2>
                </div>
              )}

              {/* Header Actions */}
              {headerActions && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto">
                  {headerActions}
                </div>
              )}
            </div>
          </div>
        )}

        {(!disableSearch || filterConfig.length > 0) && (
          <div className="mb-2 space-y-2">
            {/* Search and additional controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3 lg:gap-4">
              {/* Search Bar */}
              {!disableSearch && (
                <div className="w-full sm:flex-1 sm:min-w-[280px] lg:min-w-[320px] xl:min-w-[400px] relative">
                  <div className="relative w-full group">
                    <Input
                      placeholder="Search across all columns..."
                      value={searchTerm}
                      onChange={e => {
                        setSearchTerm(e.target.value);
                        if (e.target.value.trim() === '') handleSearch();
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                      onBlur={handleSearch}
                      className="w-full h-11 sm:h-12 pl-4 pr-16 bg-background 
                rounded-xl
                text-foreground
                placeholder-muted-foreground"
                    />

                    {/* Right side icons */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {/* Clear Button */}
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            handleSearch();
                          }}
                          className="text-muted-foreground hover:text-foreground
                    transition-colors duration-200 p-1 rounded-full
                    hover:bg-primary"
                          type="button"
                          title="Clear search"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}

                      {/* Search Icon Button */}
                      <button
                        onClick={handleSearch}
                        className="text-primary hover:text-foreground
                  transition-colors duration-200 p-1.5 rounded-lg
                  hover:bg-primary/10  hover:border border-primary focus-visible:bg-primary focus-visible:border focus-visible:border-primary"
                        type="button"
                        title="Search"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filters */}
            {filterConfig.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-2 sm:gap-3">
                {filterConfig.map(renderFilter)}
              </div>
            )}
          </div>
        )}

        {(!disableSearch || filterConfig.length > 0) && (
          <div className="border-t border-muted-foreground/60 my-6 "></div>
        )}

        <div className="relative overflow-hidden rounded-xl border border-muted-foreground/40 ">
          {isLoading ? (
            <Transitions type="slide" direction="down" position="top" show={true}>
              <TableShimmer />
            </Transitions>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow
                    className="bg-primary/80
                                     hover:bg-accent"
                  >
                    {expandableRows && (
                      <TableHead className="w-12 px-4 py-4 text-center">
                        <span className="sr-only">Expand</span>
                      </TableHead>
                    )}
                    {headers.map(key => (
                      <TableHead
                        key={key}
                        className="px-6 py-4 text-left text-xs font-semibold text-foreground 
                                 uppercase tracking-wider bg-transparent cursor-pointer group"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <div className="opacity-0 group-hover:opacity-70 transition-opacity">
                            {sortColumn === key ? (
                              sortDirection === 'asc' ? (
                                <ArrowUpIcon className="w-4 h-4 text-foreground" />
                              ) : (
                                <ArrowDownIcon className="w-4 h-4 text-foreground" />
                              )
                            ) : (
                              <div className="w-4 h-4 flex flex-col">
                                <ArrowUpIcon className="w-3 h-3 opacity-40" />
                                <ArrowDownIcon className="w-3 h-3 opacity-40" />
                              </div>
                            )}
                          </div>
                          {sortColumn === key && (
                            <div className="ml-1">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="w-4 h-4 text-foreground" />
                              ) : (
                                <ArrowDownIcon className="w-4 h-4 text-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={headers.length + (expandableRows ? 1 : 0)}
                        className="px-6 py-12 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-foreground font-medium">No data found</p>
                          <p className="text-sm text-muted-foreground max-w-xs text-center">
                            {searchTerm ||
                            Object.values(activeColumnFilters).some(
                              v =>
                                v !== undefined &&
                                v !== null &&
                                !(Array.isArray(v) && v.length === 0) &&
                                !(
                                  typeof v === 'object' &&
                                  !Array.isArray(v) &&
                                  Object.keys(v).length === 0
                                ) &&
                                v !== ''
                            )
                              ? "Try adjusting your search or filters to find what you're looking for."
                              : 'No records are currently available in this table.'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((row, i) => {
                      const canExpand = rowExpandable ? rowExpandable(row) : expandableRows;
                      const isExpanded = expandedRows[i] || false;

                      return (
                        <React.Fragment key={i}>
                          <TableRow
                            className={cn(
                              'group transition-all duration-200 border-b border-border md:overflow-scroll',
                              i % 2 === 0 ? 'bg-sidebar' : 'bg-sidebar-primary-foreground',
                              'hover:bg-sidebar-accent/30',
                              isExpanded && 'bg-sidebar-accent/20 shadow-sm',
                              onRowClick && 'cursor-pointer active:scale-[0.995]'
                            )}
                            onClick={() => onRowClick && onRowClick(row, i)}
                          >
                            {expandableRows && (
                              <TableCell
                                onClick={e => {
                                  e.stopPropagation();
                                  if (canExpand) toggleRow(i);
                                }}
                                className={cn(
                                  'px-4 py-4 text-center transition-colors duration-200',
                                  canExpand && 'cursor-pointer hover:bg-sidebar-accent/30'
                                )}
                              >
                                {canExpand ? (
                                  <div
                                    className={cn(
                                      'flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300',
                                      isExpanded ? 'border border-primary' : 'bg-muted'
                                    )}
                                  >
                                    <ChevronDownIcon
                                      className={cn(
                                        'h-4 w-4 transition-all duration-300',
                                        isExpanded
                                          ? 'text-foreground rotate-180'
                                          : 'text-muted-foreground rotate-0 group-hover:text-primary'
                                      )}
                                    />
                                  </div>
                                ) : null}
                              </TableCell>
                            )}
                            {headers.map((key, keyIndex) => {
                              const value = row[key];
                              const isLastColumn = keyIndex === headers.length - 1;
                              const isActiveSortColumn = sortColumn === key;

                              return (
                                <TableCell
                                  key={key}
                                  className={cn(
                                    'px-6 py-4 text-sm text-foreground font-medium',
                                    isLastColumn && !expandableRows && 'rounded-r-lg',
                                    isActiveSortColumn && 'bg-sidebar-accent/5'
                                  )}
                                >
                                  {customRender[key] ? (
                                    customRender[key](value, row)
                                  ) : React.isValidElement(value) ? (
                                    value
                                  ) : value instanceof Date ? (
                                    <span className="text-muted-foreground">
                                      {value.toLocaleString()}
                                    </span>
                                  ) : typeof value === 'object' && value !== null ? (
                                    <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                                      {(() => {
                                        try {
                                          return JSON.stringify(value);
                                        } catch {
                                          return '[Object]';
                                        }
                                      })()}
                                    </code>
                                  ) : (
                                    <span className="break-words">{String(value)}</span>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                          {expandableRows && isExpanded && expandedComponent && canExpand && (
                            <TableRow className="transition-all duration-300">
                              <TableCell colSpan={headers.length + 1} className="p-0">
                                <div className="mx-4 mt-0 mb-4 overflow-hidden rounded-b-lg">
                                  <div className="p-5">{expandedComponent(row)}</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        {totalRecords > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 p-4 sm:p-6 bg-sidebar rounded-lg border border-muted-foreground/50">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <span className="text-sm font-medium text-muted-foreground">Rows per page</span>
              <div className="relative">
                <Select
                  value={String(filterMode === 'ui' ? limit : localLimit)}
                  onValueChange={val => {
                    const newLimit = Number(val);
                    if (filterMode === 'ui' && onLimitChange) {
                      onLimitChange(newLimit);
                      if (onPageChange) onPageChange(1);
                    } else {
                      setLocalLimit(newLimit);
                      setLocalPage(1);
                    }
                  }}
                >
                  <SelectTrigger className="w-24 bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary transition-colors cursor-pointer">
                    {String(filterMode === 'ui' ? limit : localLimit)}
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 5, 10, 20, 50, 100].map(opt => (
                      <SelectItem key={opt} value={String(opt)} className="text-muted-foreground">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  filterMode === 'ui' && onPageChange
                    ? onPageChange(Math.max(1, (page || 1) - 1))
                    : setLocalPage(Math.max(1, localPage - 1))
                }
                disabled={(filterMode === 'ui' ? page : localPage) === 1}
                className="flex items-center justify-center w-9 h-9 bg-background border-2 border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:border-muted-foreground
                disabled:hover:text-muted-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2 px-3 py-2 bg-accent dark:bg-foreground border-2 border-primary rounded-md">
                <span className="text-sm font-medium text-primary">
                  {filterMode === 'ui' ? page : localPage}
                </span>
                <span className="text-sm text-primary">of</span>
                <span className="text-sm font-medium text-primary">
                  {Math.ceil(
                    (filterMode === 'ui' ? total || 0 : totalRecords) /
                      (filterMode === 'ui' ? limit : localLimit)
                  )}
                </span>
              </div>

              <button
                onClick={() =>
                  filterMode === 'ui' && onPageChange
                    ? onPageChange((page || 1) + 1)
                    : setLocalPage(localPage + 1)
                }
                disabled={
                  filterMode === 'ui'
                    ? page >= Math.ceil((total || 0) / limit)
                    : localPage >= Math.ceil(totalRecords / localLimit)
                }
                className="flex items-center justify-center w-9 h-9 bg-background border-2 border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:border-muted-foreground
                disabled:hover:text-muted-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {paginatedData.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Showing</span>
              <span className="px-2 py-1 rounded bg-accent dark:bg-foreground text-primary border-2 border-primary text-sm font-medium">
                {paginatedData.length}
              </span>
              <span className="text-sm text-muted-foreground">of</span>
              <span className="px-2 py-1 rounded bg-accent dark:bg-foreground text-primary border-2 text-sm border-primary font-medium">
                {totalRecords}
              </span>
              <span className="text-sm text-muted-foreground">results</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {sortColumn && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium bg-accent dark:bg-foreground border-2 border-primary text-primary">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={
                        sortDirection === 'asc'
                          ? 'M8 10L12 6M12 6L16 10M12 6V18'
                          : 'M8 14L12 18M12 18L16 14M12 18V6'
                      }
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Sorted by {sortColumn}</span>
                  <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary">
                    {sortDirection === 'asc' ? 'A→Z' : 'Z→A'}
                  </span>
                </div>
              )}

              {(searchTerm ||
                Object.keys(columnFilters).length > 0 ||
                Object.values(activeColumnFilters).some(
                  v =>
                    v !== undefined &&
                    v !== null &&
                    !(Array.isArray(v) && v.length === 0) &&
                    !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) &&
                    v !== ''
                )) && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium bg-accent dark:bg-foreground border-2 border-primary text-primary">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75M3 18h14.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Filtered results</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
