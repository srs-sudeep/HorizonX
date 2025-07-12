import {
  Button,
  Checkbox,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  TimeRangePicker,
} from '@/components';
import { cn } from '@/lib';
import { type FieldType as BaseFieldType } from '@/types';
import { parse } from 'date-fns';
import { Check, ChevronDown, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Extend FieldType to include 'fields', 'minItems', and 'maxItems' for array type
type FieldType = BaseFieldType & {
  fields?: BaseFieldType[];
  minItems?: number;
  maxItems?: number;
  section?: string;
};

type DynamicFormProps = {
  schema: FieldType[];
  onSubmit: (formData: Record<string, any>) => void;
  submitButtonText?: string;
  isSubmitButtonVisible?: boolean;
  onCancel?: () => void;
  defaultValues?: Record<string, any>;
  disabled?: boolean;
  onChange?: (formData: Record<string, any>) => void; // <-- Add this line
};

function parseTimeRangeString(str: string): { start?: Date; end?: Date } {
  if (!str || typeof str !== 'string') return {};
  const [startStr, endStr] = str.split(' - ');
  if (!startStr || !endStr) return {};
  // Use today's date for both, only time matters
  const today = new Date();
  const parseTime = (s: string) => parse(s, 'hh:mma', today);
  return {
    start: parseTime(startStr.trim()),
    end: parseTime(endStr.trim()),
  };
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  onSubmit,
  onCancel,
  defaultValues,
  submitButtonText = 'Submit',
  isSubmitButtonVisible = true,
  disabled,
  onChange,
}) => {
  const initialFormData = { ...(defaultValues || {}) };
  schema.forEach(field => {
    if (
      field.type === 'timerange' &&
      initialFormData[field.name] &&
      typeof initialFormData[field.name] === 'string'
    ) {
      initialFormData[field.name] = parseTimeRangeString(initialFormData[field.name]);
    }
  });

  const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // For array fields, initialize state for each array field
  const [arrayFieldData, setArrayFieldData] = useState<Record<string, any[]>>(() => {
    const initial: Record<string, any[]> = {};
    schema.forEach(field => {
      if (field.type === 'array') {
        initial[field.name] =
          defaultValues?.[field.name] && Array.isArray(defaultValues[field.name])
            ? defaultValues[field.name]
            : [field.fields?.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})];
      }
    });
    return initial;
  });

  // Add search state at the top of your component
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openDropdowns).forEach(fieldName => {
        if (
          openDropdowns[fieldName] &&
          dropdownRefs.current[fieldName] &&
          !dropdownRefs.current[fieldName]?.contains(event.target as Node)
        ) {
          setOpenDropdowns(prev => ({ ...prev, [fieldName]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdowns]);

  // Update formData and call onChange if provided
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, type, value, checked, files, multiple, options } = e.target;

    let updatedFormData: Record<string, any>;
    if (type === 'checkbox' && Array.isArray(formData[name])) {
      const updated = checked
        ? [...formData[name], value]
        : formData[name].filter((v: string) => v !== value);
      updatedFormData = { ...formData, [name]: updated };
    } else if (type === 'checkbox') {
      updatedFormData = { ...formData, [name]: checked };
    } else if (type === 'file') {
      updatedFormData = { ...formData, [name]: files[0] };
    } else if (multiple) {
      const selectedValues = Array.from(options)
        .filter(option => (option as HTMLOptionElement).selected)
        .map(option => (option as HTMLOptionElement).value);
      updatedFormData = { ...formData, [name]: selectedValues };
    } else {
      updatedFormData = { ...formData, [name]: value };
    }
    setFormData(updatedFormData);
    if (onChange) onChange(updatedFormData); // <-- Call onChange if provided
  };

  const handleMultiSelectToggle = (fieldName: string, optionValue: string) => {
    const currentValues = Array.isArray(formData[fieldName]) ? formData[fieldName] : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v: string) => v !== optionValue)
      : [...currentValues, optionValue];

    setFormData({ ...formData, [fieldName]: newValues });
  };

  const getSelectedLabel = (field: FieldType) => {
    const selectedValues = Array.isArray(formData[field.name]) ? formData[field.name] : [];
    if (selectedValues.length === 0) return 'Select options...';
    if (selectedValues.length === 1) {
      const option = field.options?.find(
        opt => (typeof opt === 'string' ? opt : opt.value) === selectedValues[0]
      );
      return typeof option === 'string' ? option : option?.label || selectedValues[0];
    }
    return `${selectedValues.length} options selected`;
  };

  const handleArrayFieldChange = (fieldName: string, idx: number, subField: string, value: any) => {
    setArrayFieldData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) =>
        i === idx ? { ...item, [subField]: value } : item
      ),
    }));
  };

  const handleAddArrayFieldItem = (fieldName: string, fields: FieldType[]) => {
    setArrayFieldData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})],
    }));
  };

  const handleRemoveArrayFieldItem = (fieldName: string, idx: number) => {
    setArrayFieldData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData };
    // Add array fields to finalData
    Object.keys(arrayFieldData).forEach(fieldName => {
      finalData[fieldName] = arrayFieldData[fieldName];
    });
    onSubmit(finalData);
  };

  // Also call onChange when arrayFieldData changes
  useEffect(() => {
    if (onChange) {
      const merged = { ...formData };
      Object.keys(arrayFieldData).forEach(fieldName => {
        merged[fieldName] = arrayFieldData[fieldName];
      });
      onChange(merged);
    }
  }, [arrayFieldData]);

  // Call onChange with defaultValues on mount
  useEffect(() => {
    if (onChange) {
      onChange(defaultValues || {});
    }
  }, []);

  // Update formData when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const sectionMap: Record<string, FieldType[]> = {};
  schema.forEach(field => {
    const section = field.section || 'General';
    if (!sectionMap[section]) sectionMap[section] = [];
    sectionMap[section].push(field);
  });

  // Handle dropdown positioning to prevent it from going off-screen
  useEffect(() => {
    const handleDropdownPosition = () => {
      Object.keys(openDropdowns).forEach(fieldName => {
        if (openDropdowns[fieldName] && dropdownRefs.current[fieldName]) {
          const dropdown = dropdownRefs.current[fieldName]?.querySelector('div[class*="absolute"]');
          if (!dropdown) return;

          const rect = dropdown.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const dropdownEl = dropdown as HTMLElement;
          if (rect.bottom > viewportHeight) {
            // If dropdown would go below viewport, position it above the button instead
            dropdownEl.style.bottom = '100%';
            dropdownEl.style.top = 'auto';
            dropdownEl.style.marginTop = '0';
            dropdownEl.style.marginBottom = '0.25rem';
          } else {
            // Reset to default (below button)
            dropdownEl.style.top = 'auto';
            dropdownEl.style.bottom = 'auto';
            dropdownEl.style.marginBottom = '0';
            dropdownEl.style.marginTop = '0.25rem';
          }
        }
      });
    };

    if (Object.values(openDropdowns).some(Boolean)) {
      handleDropdownPosition();
      window.addEventListener('scroll', handleDropdownPosition);
      window.addEventListener('resize', handleDropdownPosition);
    }

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, [openDropdowns]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mx-auto max-w-5xl w-full">
      {Object.entries(sectionMap).map(([section, fields]) => (
        <div key={section} className="mb-8">
          {section !== 'General' && <h2 className="text-lg font-semibold mb-4">{section}</h2>}
          {/* Render fields in this section as before */}
          {(() => {
            // Build rows for this section
            const rows: FieldType[][] = [];
            let currentRow: FieldType[] = [];
            let currentColCount = 0;
            fields.forEach(field => {
              const col = field.columns || 1;
              if (currentColCount + col > 2) {
                rows.push(currentRow);
                currentRow = [field];
                currentColCount = col;
              } else {
                currentRow.push(field);
                currentColCount += col;
              }
            });
            if (currentRow.length > 0) rows.push(currentRow);

            return rows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {row.map(field => (
                  <div
                    key={field.name}
                    className={`flex flex-col ${field.columns === 2 ? 'md:col-span-2' : 'md:col-span-1'}`}
                  >
                    <label
                      className={`mb-2 text-sm font-medium text-muted-foreground ${field.className || ''}`}
                    >
                      {field.label}
                      {field.required && <span className="ml-1 text-destructive">*</span>}
                    </label>
                    {field.type === 'array' && field.fields ? (
                      <div className="mb-6">
                        {arrayFieldData[field.name]?.map((item, idx) => (
                          <div key={idx} className="flex gap-2 mb-2 items-center">
                            {field.fields?.map(subField =>
                              subField.type === 'select' ? (
                                <Select
                                  key={subField.name}
                                  value={item[subField.name] || ''}
                                  onValueChange={value =>
                                    handleArrayFieldChange(field.name, idx, subField.name, value)
                                  }
                                  disabled={disabled}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subField.options?.map(opt => {
                                      const optionValue = typeof opt === 'string' ? opt : opt.value;
                                      const optionLabel = typeof opt === 'string' ? opt : opt.label;
                                      return (
                                        <SelectItem key={optionValue} value={String(optionValue)}>
                                          {typeof optionLabel === 'object' && optionLabel !== null
                                            ? `${optionLabel.id} - ${optionLabel.name}`
                                            : String(optionLabel)}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  key={subField.name}
                                  type={subField.type}
                                  placeholder={subField.label}
                                  className="w-full bg-background text-foreground"
                                  value={item[subField.name]}
                                  onChange={e =>
                                    handleArrayFieldChange(
                                      field.name,
                                      idx,
                                      subField.name,
                                      e.target.value
                                    )
                                  }
                                  required={subField.required}
                                  disabled={disabled}
                                />
                              )
                            )}
                            {arrayFieldData[field.name].length > (field.minItems || 1) && (
                              <Trash2
                                className="text-destructive cursor-pointer hover:bg-destructive/30 rounded p-1"
                                size={24}
                                onClick={() => handleRemoveArrayFieldItem(field.name, idx)}
                                style={{ minWidth: 24, minHeight: 24 }}
                                aria-label="Remove"
                                tabIndex={0}
                                role="button"
                              />
                            )}
                            <Plus
                              className="rounded cursor-pointer h-9 w-9 p-2 border border-border hover:bg-muted"
                              onClick={() => handleAddArrayFieldItem(field.name, field.fields!)}
                              aria-label={`Add ${field.label}`}
                              tabIndex={0}
                              role="button"
                            />
                          </div>
                        ))}
                      </div>
                    ) : field.type === 'timerange' ? (
                      <TimeRangePicker
                        value={formData[field.name]}
                        onChange={range => {
                          setFormData({
                            ...formData,
                            [field.name]: range,
                          });
                        }}
                        placeholder="Select time range"
                      />
                    ) : field.type === 'toggle' ? (
                      <label className="flex items-center gap-2 my-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={formData[field.name]}
                          className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none ${
                            formData[field.name] ? 'bg-success' : 'bg-secondary-foreground/30'
                          }`}
                          onClick={() =>
                            setFormData({ ...formData, [field.name]: !formData[field.name] })
                          }
                          disabled={disabled || field.disabled}
                        >
                          <span
                            className={`bg-background w-4 h-4 rounded-full shadow-md ml-1 transform transition-transform duration-200 ${
                              formData[field.name] ? 'translate-x-5' : ''
                            }`}
                          />
                        </button>
                        <span
                          className={`text-sm font-medium ${
                            formData[field.name] ? 'text-success' : 'text-secondary-foreground/50'
                          }`}
                        >
                          {formData[field.name] ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        className="bg-background text-foreground mb-6"
                        value={formData[field.name] || ''}
                        disabled={disabled || field.disabled}
                      />
                    ) : field.type === 'select' && field.multiSelect ? (
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between h-auto min-h-[40px] p-2 my-3"
                              disabled={disabled || field.disabled}
                            >
                              <span
                                className={`${!formData[field.name]?.length ? 'text-muted-foreground' : 'text-foreground font-medium'}`}
                              >
                                {getSelectedLabel(field)}
                              </span>
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            align="start"
                            style={{ width: 'var(--radix-popover-trigger-width)' }}
                          >
                            <div className="max-h-60 overflow-auto">
                              {/* Search Input */}
                              <div className="sticky top-0 z-10 p-2 bg-background border-b">
                                <Input
                                  type="text"
                                  className="w-full h-8 text-sm"
                                  placeholder="Search options..."
                                  value={searchTerms[field.name] || ''}
                                  onChange={e => {
                                    setSearchTerms(prev => ({
                                      ...prev,
                                      [field.name]: e.target.value,
                                    }));
                                  }}
                                  onClick={e => e.stopPropagation()}
                                />
                              </div>

                              {/* Option List */}
                              <div className="p-1">
                                {field.options
                                  ?.filter(opt => {
                                    const searchTerm = searchTerms[field.name]?.toLowerCase() || '';
                                    if (!searchTerm) return true;

                                    const optionLabel = typeof opt === 'string' ? opt : opt.label;
                                    const labelText =
                                      typeof optionLabel === 'object' && optionLabel !== null
                                        ? `${optionLabel.id} - ${optionLabel.name}`
                                        : String(optionLabel);

                                    return labelText.toLowerCase().includes(searchTerm);
                                  })
                                  ?.map(opt => {
                                    const optionValue = typeof opt === 'string' ? opt : opt.value;
                                    const optionLabel = typeof opt === 'string' ? opt : opt.label;
                                    const isSelected =
                                      Array.isArray(formData[field.name]) &&
                                      formData[field.name]
                                        .map(String)
                                        .includes(String(optionValue));

                                    return (
                                      <div
                                        key={optionValue}
                                        className={cn(
                                          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                                          isSelected
                                            ? 'bg-accent text-accent-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                        )}
                                        onClick={() => {
                                          handleMultiSelectToggle(field.name, optionValue);
                                          const updatedFormData = {
                                            ...formData,
                                            [field.name]: Array.isArray(formData[field.name])
                                              ? formData[field.name].includes(optionValue)
                                                ? formData[field.name].filter(
                                                    (v: string) => v !== optionValue
                                                  )
                                                : [...formData[field.name], optionValue]
                                              : [optionValue],
                                          };
                                          setFormData(updatedFormData);
                                          if (onChange) onChange(updatedFormData);
                                        }}
                                      >
                                        <div className="flex items-center gap-2 w-full">
                                          <div
                                            className={cn(
                                              'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                              isSelected
                                                ? 'bg-primary text-primary-foreground'
                                                : 'opacity-50 [&_svg]:invisible'
                                            )}
                                          >
                                            <Check className="h-4 w-4" />
                                          </div>
                                          <span className={isSelected ? 'font-medium' : ''}>
                                            {typeof optionLabel === 'object' && optionLabel !== null
                                              ? `${optionLabel.id} - ${optionLabel.name}`
                                              : optionLabel}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}

                                {/* Empty state */}
                                {field.options?.filter(opt => {
                                  const searchTerm = searchTerms[field.name]?.toLowerCase() || '';
                                  if (!searchTerm) return true;

                                  const optionLabel = typeof opt === 'string' ? opt : opt.label;
                                  const labelText =
                                    typeof optionLabel === 'object' && optionLabel !== null
                                      ? `${optionLabel.id} - ${optionLabel.name}`
                                      : String(optionLabel);

                                  return labelText.toLowerCase().includes(searchTerm);
                                })?.length === 0 && (
                                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                    {searchTerms[field.name]
                                      ? 'No matching options found'
                                      : 'No options available'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        {/* Selected Options Chips */}
                        {Array.isArray(formData[field.name]) && formData[field.name].length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {formData[field.name].map((val: string) => {
                              const option = field.options?.find(
                                (opt: any) =>
                                  String(typeof opt === 'string' ? opt : opt.value) === String(val)
                              );
                              const label =
                                typeof option === 'string' ? option : option?.label || val;

                              return (
                                <div
                                  key={val}
                                  className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm border border-primary/20 transition-all duration-200 hover:bg-primary/20"
                                >
                                  <span className="font-medium">
                                    {typeof label === 'object' &&
                                    label !== null &&
                                    'id' in label &&
                                    'name' in label
                                      ? `${label.id} - ${label.name}`
                                      : String(label)}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto w-auto p-0 hover:bg-transparent hover:text-destructive"
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleMultiSelectToggle(field.name, val);
                                      const updatedFormData = {
                                        ...formData,
                                        [field.name]: formData[field.name].filter(
                                          (v: string) => v !== val
                                        ),
                                      };
                                      setFormData(updatedFormData);
                                      if (onChange) onChange(updatedFormData);
                                    }}
                                    disabled={disabled || field.disabled}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : field.type === 'select' && !field.multiSelect ? (
                      <Select
                        value={formData[field.name] || ''}
                        onValueChange={value => {
                          const updatedFormData = { ...formData, [field.name]: value };
                          setFormData(updatedFormData);
                          if (onChange) onChange(updatedFormData);
                        }}
                        disabled={disabled || field.disabled}
                      >
                        <SelectTrigger className="w-full mb-6">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map(opt => {
                            const optionValue = typeof opt === 'string' ? opt : opt.value;
                            const optionLabel = typeof opt === 'string' ? opt : opt.label;
                            return (
                              <SelectItem key={optionValue} value={String(optionValue)}>
                                {typeof optionLabel === 'object' &&
                                optionLabel !== null &&
                                'id' in optionLabel &&
                                'name' in optionLabel
                                  ? `${optionLabel.id} - ${optionLabel.name}`
                                  : String(optionLabel)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'radio' ? (
                      <RadioGroup
                        value={formData[field.name] || ''}
                        onValueChange={value => {
                          const updatedFormData = { ...formData, [field.name]: value };
                          setFormData(updatedFormData);
                          if (onChange) onChange(updatedFormData);
                        }}
                        disabled={disabled || field.disabled}
                        className="flex flex-wrap gap-4 mb-6"
                      >
                        {field.options?.map(opt => {
                          const optionValue = typeof opt === 'string' ? opt : opt.value;
                          const optionLabel = typeof opt === 'string' ? opt : opt.label;
                          return (
                            <div key={optionValue} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={String(optionValue)}
                                id={`${field.name}-${optionValue}`}
                              />
                              <label
                                htmlFor={`${field.name}-${optionValue}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {typeof optionLabel === 'object' &&
                                optionLabel !== null &&
                                'id' in optionLabel &&
                                'name' in optionLabel
                                  ? `${optionLabel.id} - ${optionLabel.name}`
                                  : String(optionLabel)}
                              </label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    ) : field.type === 'checkbox' && field.options ? (
                      <div className="flex flex-wrap gap-4 mb-2">
                        {field.options.map(opt => {
                          const optionValue = typeof opt === 'string' ? opt : opt.value;
                          const optionLabel = typeof opt === 'string' ? opt : opt.label;
                          const isChecked =
                            Array.isArray(formData[field.name]) &&
                            formData[field.name].includes(optionValue);

                          return (
                            <div key={optionValue} className="flex items-center space-x-2 mb-6">
                              <Checkbox
                                id={`${field.name}-${optionValue}`}
                                checked={isChecked}
                                onCheckedChange={checked => {
                                  const currentValues = Array.isArray(formData[field.name])
                                    ? formData[field.name]
                                    : [];

                                  const updatedFormData = {
                                    ...formData,
                                    [field.name]: checked
                                      ? [...currentValues, optionValue]
                                      : currentValues.filter((val: any) => val !== optionValue),
                                  };

                                  setFormData(updatedFormData);
                                  if (onChange) onChange(updatedFormData);
                                }}
                                disabled={disabled || field.disabled}
                              />
                              <label
                                htmlFor={`${field.name}-${optionValue}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {typeof optionLabel === 'object' &&
                                optionLabel !== null &&
                                'id' in optionLabel &&
                                'name' in optionLabel
                                  ? `${optionLabel.id} - ${optionLabel.name}`
                                  : String(optionLabel)}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    ) : field.type === 'chip' ? (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {field.options?.map(opt => {
                          const optionValue = typeof opt === 'string' ? opt : opt.value;
                          const optionLabel = typeof opt === 'string' ? opt : opt.label;
                          const selected = formData[field.name] === optionValue;

                          if (
                            optionLabel &&
                            typeof optionLabel === 'object' &&
                            optionLabel !== null &&
                            'id' in optionLabel &&
                            'name' in optionLabel &&
                            typeof (optionLabel as { id: any; name: any }).id !== 'undefined' &&
                            typeof (optionLabel as { id: any; name: any }).name !== 'undefined'
                          ) {
                            const labelObj = optionLabel as { id: string; name: string };
                            return (
                              <button
                                key={optionValue}
                                type="button"
                                className={cn(
                                  // Base styles
                                  'group relative px-6 py-4 my-2 rounded-xl border-2',
                                  'transition-all duration-300 ease-out',
                                  'flex flex-col items-center justify-center min-w-[140px] min-h-[100px]',
                                  'transform hover:scale-105 hover:shadow-lg',
                                  'focus:outline-none focus:ring-4 focus:ring-opacity-50',
                                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                                  // Selected state
                                  selected
                                    ? 'bg-primary/10 text-primary border-primary shadow-lg shadow-primary/20 focus:ring-primary/30'
                                    : 'bg-background text-foreground border-border hover:border-muted-foreground hover:shadow-md hover:bg-muted/50 focus:ring-ring'
                                )}
                                onClick={() => {
                                  const updatedFormData = {
                                    ...formData,
                                    [field.name]: optionValue,
                                  };
                                  setFormData(updatedFormData);
                                  if (onChange) onChange(updatedFormData);
                                }}
                                disabled={disabled || field.disabled}
                              >
                                {/* Subtle background pattern */}
                                <div
                                  className={cn(
                                    'absolute inset-0 rounded-xl transition-opacity duration-300',
                                    'bg-gradient-to-br from-transparent via-background/20 to-transparent',
                                    selected ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                                  )}
                                />

                                {/* Content container */}
                                <div className="relative z-10 flex flex-col items-center space-y-1">
                                  {/* Main label with enhanced typography */}
                                  <span
                                    className={cn(
                                      'font-bold text-center leading-tight transition-all duration-300',
                                      selected
                                        ? 'text-3xl text-primary transform scale-110'
                                        : 'text-2xl group-hover:text-3xl group-hover:transform group-hover:scale-105'
                                    )}
                                  >
                                    {labelObj.id}
                                  </span>

                                  {/* Secondary label with improved styling */}
                                  <span
                                    className={cn(
                                      'text-sm font-medium text-center leading-relaxed transition-all duration-300',
                                      selected
                                        ? 'text-primary/80'
                                        : 'text-muted-foreground group-hover:text-foreground'
                                    )}
                                  >
                                    {labelObj.name}
                                  </span>
                                </div>

                                {/* Selection indicator */}
                                {selected && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  </div>
                                )}

                                {/* Ripple effect on click */}
                                <div className="absolute inset-0 rounded-xl overflow-hidden">
                                  <div
                                    className={cn(
                                      'absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent',
                                      'transform -skew-x-12 -translate-x-full',
                                      'group-active:translate-x-full group-active:duration-700',
                                      'transition-transform duration-0'
                                    )}
                                  />
                                </div>
                              </button>
                            );
                          }

                          // Fallback for string or other label types
                          return (
                            <button
                              key={optionValue}
                              type="button"
                              className={cn(
                                'px-4 py-2 my-1 mb-2 rounded-full border transition-colors',
                                selected
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground'
                              )}
                              onClick={() => {
                                const updatedFormData = { ...formData, [field.name]: optionValue };
                                setFormData(updatedFormData);
                                if (onChange) onChange(updatedFormData);
                              }}
                              disabled={disabled || field.disabled}
                            >
                              {typeof optionLabel === 'object' &&
                              optionLabel !== null &&
                              'id' in optionLabel &&
                              'name' in optionLabel
                                ? `${optionLabel.id} - ${optionLabel.name}`
                                : String(optionLabel)}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <Input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        className="w-full bg-background text-foreground mb-6"
                        value={formData[field.name] ?? ''}
                        disabled={disabled || field.disabled}
                      />
                    )}
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      ))}
      <div className="flex justify-end gap-2 mt-8">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-primary text-primary bg-background hover:bg-background"
            disabled={disabled}
          >
            Cancel
          </Button>
        )}
        {isSubmitButtonVisible ? (
          <Button
            type="submit"
            className="bg-primary transition-colors text-sm font-semibold px-4 py-2 rounded-md shadow-md"
            disabled={disabled}
          >
            {submitButtonText || 'Submit'}
          </Button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
};
