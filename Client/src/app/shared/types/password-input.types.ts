export type Size = 'small' | 'large';

export type Variant = 'filled' | 'outlined';

export interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  formControlName?: string;
  feedback?: boolean;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  size?: Size;
  variant?: Variant;
}
