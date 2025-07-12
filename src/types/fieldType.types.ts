export type FieldType = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: Array<
    | string
    | {
        value: string;
        label: string | { id: string; name: string };
      }
  >;
  columns?: number;
  placeholder?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  className?: string;
  section?: string;
  defaultValue?: string | number | boolean | null;

  minItems?: number;
  maxItems?: number;
  fields?: FieldType[];
};
