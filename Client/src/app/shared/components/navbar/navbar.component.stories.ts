import type { Meta, StoryObj } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { NavbarProps } from '../../types/navbar.types';

const meta: Meta<NavbarComponent> = {
  title: 'Components/NavbarComponent',
  component: NavbarComponent,
};
export default meta;

const args: NavbarProps = {
  title: 'My Application',
  logo: 'assets/logo.png',
  authMenuItems: [
    { label: 'Profile', routerLink: '/profile' },
    { label: 'Logout', command: () => {} },
  ],
  nonAuthMenuItems: [
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
  ],
  isAuthenticated: false,
  user: {
    name: 'John Doe',
    avatar: 'assets/avatar.png',
  },
  showSwitchTheme: true,
  showSwtichLang: true,
  commonMenuItems: [
    { label: 'Settings', routerLink: '/settings' },
    { label: 'Help', routerLink: '/help' },
  ],
  langs: [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
  ],
};

type NavbarStory = StoryObj<NavbarComponent>;

export const Primary: NavbarStory = {
  args: args,
};

export const Authenticated: NavbarStory = {
  args: {
    ...args,
    isAuthenticated: true,
  },
};
