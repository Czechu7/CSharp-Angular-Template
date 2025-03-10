import { MenuItem } from './navbar.types';

export interface FooterProps {
  logo?: string;
  title?: string;
  links?: MenuItem[];
  socialLinks?: MenuItem[];
  customClass?: string;
}
