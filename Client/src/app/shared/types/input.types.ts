import { FormControl } from '@angular/forms';
import { IAutocompletePersonalInfo } from './auto-complete.types';

export type IInputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

export type IInputIcons =
  | 'user'
  | 'map'
  | 'clock'
  | 'star'
  | 'check'
  | 'times'
  | 'shopping-cart'
  | 'search';

export interface IInputProps {
  label?: string;
  placeholder?: string;
  type?: IInputTypes;
  required?: boolean;
  errorMessage?: string;
  prefixIcon?: IInputIcons;
  prefixText?: string;
  suffixIcon?: IInputIcons;
  suffixText?: string;
  inavlid?: boolean;
  autocomplete: IAutocompletePersonalInfo;
  formControl: FormControl;
}
