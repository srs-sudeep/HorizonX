export type FieldType = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  columns?: number;
  options?: { value: string; label: string }[];
  minItems?: number;
  maxItems?: number;
  fields?: FieldType[];
  section?: string; // <-- Add this line
};
