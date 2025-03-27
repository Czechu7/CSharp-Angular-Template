import { IMenuItem } from './navbar.types';

export interface IFooterProps {
  logo?: string;
  title?: string;
  links?: IMenuItem[];
  socialLinks?: IMenuItem[];
  customClass?: string;
}
