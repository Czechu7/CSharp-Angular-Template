export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  url?: string;
  target?: string;
  command?: () => void;
  queryParams?: { [key: string]: string };
  items?: MenuItem[];
  visible?: boolean;
  disabled?: boolean;
  expanded?: boolean;
}
export interface User {
  name: string;
  avatar?: string;
  id?: string;
  role?: string;
}

export type Langs = { label: string; value: string }[];

export interface NavbarProps {
  title: string;
  logo?: string;
  commonMenuItems: MenuItem[];
  authMenuItems: MenuItem[];
  nonAuthMenuItems: MenuItem[];
  sticky?: boolean;
  customClass?: string;
  showSwitchTheme?: boolean;
  showSwtichLang?: boolean;
  langs: Langs;
  isAuthenticated?: boolean;
  user?: User;
}
