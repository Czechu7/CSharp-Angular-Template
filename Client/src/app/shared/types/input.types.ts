export type InputTypes =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'url';

export type InputIcons =
  | 'user'
  | 'map'
  | 'clock'
  | 'star'
  | 'check'
  | 'times'
  | 'shopping-cart';

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: InputTypes;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  prefixIcon?: InputIcons;
  prefixText?: string;
  suffixIcon?: InputIcons;
  suffixText?: string;
  formControlName?: string;
}
