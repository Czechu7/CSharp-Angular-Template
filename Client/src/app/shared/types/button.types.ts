export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

export type ButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';

export type ButtonVariant = 'text' | 'outlined';

export type ButtonSize = 'small' | 'large';

export type ButtonBadgeSeverity = 'info' | 'success' | 'warn' | 'danger' | 'contrast';

export interface ButtonProps {
  label?: string;
  icon?: string;
  iconPos?: ButtonIconPosition;
  badge?: string;
  badgeSeverity?: ButtonBadgeSeverity;
  severity?: ButtonSeverity;
  raised?: boolean;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  styleClass?: string;
  ariaLabel?: string;
}
