export type IButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

export type IButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';

export type IButtonVariant = 'text' | 'outlined';

export type IButtonSize = 'small' | 'large';

export type IButtonBadgeSeverity = 'info' | 'success' | 'warn' | 'danger' | 'contrast';

export interface IButtonProps {
  label?: string;
  icon?: string;
  iconPos?: IButtonIconPosition;
  badge?: string;
  badgeSeverity?: IButtonBadgeSeverity;
  severity?: IButtonSeverity;
  raised?: boolean;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  variant?: IButtonVariant;
  size?: IButtonSize;
  styleClass?: string;
  ariaLabel?: string;
}
