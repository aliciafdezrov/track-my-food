export interface Option {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  validation?: (value: string) => string | undefined;
  options?: Option[]; // Solo para campos de tipo select
  min?: number; // Solo para campos de tipo number
  max?: number; // Solo para campos de tipo number
}
