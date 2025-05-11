export interface ISiebarItem {
  label: string;
  icon?: string;
  routerLink?: string;
  url?: string;
  target?: string;
  command?: () => void;
  items?: ISiebarItem[];
  visible?: boolean;
  disabled?: boolean;
}
