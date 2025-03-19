import { FormControl } from '@angular/forms';

export type ISize = 'small' | 'large' | undefined;

export type IVariant = 'filled' | 'outlined';

export interface IPasswordInputProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  feedback?: boolean;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  // size?: Size;
  variant: IVariant;
  inavlid?: boolean;
  formControl: FormControl;
}
