import type { Meta, StoryObj } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';

interface NavbarProps {
  title: string;
  logo?: string;
  menuItems: any[];
  authMenuItems: any[];
  nonAuthMenuItems: any[];
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
}

const meta: Meta<NavbarComponent> = {
  title: 'Components/NavbarComponent',
  component: NavbarComponent,
};
export default meta;

const args: NavbarProps = {
  title: 'My Application',
  logo: 'assets/logo.png',
  menuItems: [
    { label: 'Home', routerLink: '/home' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' },
  ],
  authMenuItems: [
    { label: 'Profile', routerLink: '/profile' },
    { label: 'Logout', command: () => {} },
  ],
  nonAuthMenuItems: [
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
  ],
  isAuthenticated: false,
  userName: 'John Doe',
  userAvatar: 'assets/avatar.png',
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
