import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import { FooterProps } from '../../types/footer.types';

const meta: Meta<FooterComponent> = {
  title: 'Components/FooterComponent',
  component: FooterComponent,
};
export default meta;

const args: FooterProps = {
  logo: 'assets/logo.png',
  title: 'My Application',
  links: [
    { label: 'Home', routerLink: '/home' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' },
  ],
  socialLinks: [
    { label: 'Facebook', icon: 'fa-facebook', url: 'https://facebook.com' },
    { label: 'Twitter', icon: 'fa-twitter', url: 'https://twitter.com' },
    { label: 'Instagram', icon: 'fa-instagram', url: 'https://instagram.com' },
  ],
  theme: 'dark',
  customClass: 'footer',
};

type FooterStory = StoryObj<FooterComponent>;

export const Primary: FooterStory = {
  args: args,
};
