import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonProps } from '../../types/button.types';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
};
export default meta;

const args: ButtonProps = {
  label: 'Success',
  icon: 'home',
  iconPos: 'left',
  badge: '15',
  badgeSeverity: 'contrast',
  severity: 'help',
  raised: false,
  rounded: false,
  loading: false,
  disabled: false,
  variant: 'text',
  styleClass: '',
  ariaLabel: '',
};

type UserDetailsStory = StoryObj<ButtonComponent>;

export const primary: UserDetailsStory = {
  args: args,
};
