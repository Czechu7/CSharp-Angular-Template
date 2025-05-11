import { RolesEnum } from '../../enums/roles.enum';

export interface IMenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  url?: string;
  target?: string;
  roles?: RolesEnum[];
  command?: () => void;
  queryParams?: Record<string, string>;
  items?: IMenuItem[];
  visible?: boolean;
  disabled?: boolean;
  expanded?: boolean;
}
export interface IUser {
  name: string;
  avatar?: string;
  id?: string;
  role?: string;
}

export interface Ilang {
  label: string;
  value: string;
}

export type ILangs = Ilang[];

export interface INavbarProps {
  title: string;
  logo?: string;
  commonMenuItems: IMenuItem[];
  authMenuItems: IMenuItem[];
  nonAuthMenuItems: IMenuItem[];
  sticky?: boolean;
  customClass?: string;
  showSwitchTheme?: boolean;
  showSwitchLang?: boolean;
  langs: ILangs;
  isAuthenticated?: boolean;
  user?: IUser;
}
