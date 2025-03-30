import { FormControl } from '@angular/forms';

export interface ICheckboxProps {
  label?: string;
  inputId?: string;
  name?: string;
  required?: boolean;
  formControl: FormControl;
  value?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}
