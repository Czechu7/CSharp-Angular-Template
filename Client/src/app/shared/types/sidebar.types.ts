export interface ISidebarItem {
  label: string;
  icon?: string;
  routerLink?: string;
  url?: string;
  target?: string;
  command?: () => void;
  items?: ISidebarItem[];
  visible?: boolean;
  disabled?: boolean;
}
