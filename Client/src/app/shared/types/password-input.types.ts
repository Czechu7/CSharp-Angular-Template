import { FormControl } from '@angular/forms';
import { IAutocompletePassword } from './auto-complete.types';

export type IVariant = 'filled' | 'outlined';

export interface IPasswordInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  feedback?: boolean;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  variant: IVariant;
  inavlid?: boolean;
  formControl: FormControl;
  autocomplete: IAutocompletePassword;
}
