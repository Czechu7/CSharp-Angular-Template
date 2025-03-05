export interface ToggleSwitchProps {
  formControlName: string | null;
  disabled: boolean;
  iconOn?: string;
  iconOff?: string;
  invalid?: boolean;
  errorMessage?: string;
  required?: boolean;
  label?: string;
}
