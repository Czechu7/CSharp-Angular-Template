import { FormControl } from '@angular/forms';

export type Size = 'small' | 'large' | undefined;

export type Variant = 'filled' | 'outlined';

export interface PasswordInputProps {
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
  variant: Variant;
  inavlid?: boolean;
  formControl: FormControl;
}
