import { FormControl } from '@angular/forms';

export interface IToggleSwitchProps {
  formControl?: FormControl;
  iconOn?: string;
  iconOff?: string;
  invalid?: boolean;
  errorMessage?: string;
  required?: boolean;
  label?: string;
}
