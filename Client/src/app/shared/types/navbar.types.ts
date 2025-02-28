export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  visible?: boolean;
  items?: MenuItem[];
  command?: () => void;
  queryParams?: { [key: string]: any };
  state?: { [key: string]: any };
  url?: string;
  target?: string;
  styleClass?: string;
  id?: string;
  expanded?: boolean;
  disabled?: boolean;
  data?: any;
}

export interface User {
  name: string;
  avatar?: string;
  id?: string;
  role?: string;
  [key: string]: any;
}

export interface NavbarProps {
  title: string;
  logo?: string;
  commonMenuItems: MenuItem[];
  authMenuItems: MenuItem[];
  nonAuthMenuItems: MenuItem[];
  sticky?: boolean;
  theme?: 'light' | 'dark' | 'custom';
  customClass?: string;
}
