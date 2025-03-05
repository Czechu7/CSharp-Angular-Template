export interface SelectOption {
  label: string;
  value: string;
}

export type SelectOptions = SelectOption[];

export type Variant = 'filled' | 'outlined';

export type Size = 'small' | 'large';

export type LabelVariant = 'over' | 'in' | 'on';

export interface SelectProps<T = any> {
  formControlName?: string;
  checkmark: boolean;
  showClear: boolean;
  editable: boolean;
  loading: boolean;
  options?: T[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  filter?: boolean;
  filterBy?: string;
  virtualScroll?: boolean;
  virtualScrollItemSize?: number;
  value?: T;
  variant?: Variant;
  size?: Size;
  label?: string;
  labelVariant?: LabelVariant;
  inputId?: string;
  inavlid?: boolean;
  errorMessage?: string;
}
