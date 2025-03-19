import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { IButtonProps } from '../../types/button.types';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
};
export default meta;

const args: IButtonProps = {
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

type ButtonStory = StoryObj<ButtonComponent>;

export const primary: ButtonStory = {
  args: args,
};
