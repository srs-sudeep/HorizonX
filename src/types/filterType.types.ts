export interface FilterConfig {
  column: string;
  type: 'search' | 'dropdown' | 'multi-select' | 'date' | 'date-range' | 'datetime';
  options?: string[];
  onChange?: (val: any) => void;
  value?: any;
}
