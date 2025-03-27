import { FormControl } from '@angular/forms';

export interface ISelectOption {
  label: string;
  value: string;
}

export type ISelectOptions = ISelectOption[];

export type IVariant = 'filled' | 'outlined';

export type ISize = 'small' | 'large';

export type ILabelVariant = 'over' | 'in' | 'on';

export interface ISelectProps<T = ISelectOption> {
  formControl: FormControl;
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
  variant?: IVariant;
  size?: ISize;
  label?: string;
  labelVariant?: ILabelVariant;
  inputId?: string;
  inavlid?: boolean;
  errorMessage?: string;
}
