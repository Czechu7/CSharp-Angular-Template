import type { Meta, StoryObj } from '@storybook/angular';
import { InputProps } from '../../types/input.types';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent<any>> = {
  title: 'Components/Input',
  component: InputComponent,
};
export default meta;

const args: InputProps = {
  label: 'Username',
  placeholder: 'Enter username',
  type: 'text',
  prefixIcon: 'user',
  required: true,
  errorMessage: 'This field is required',
};

type UserDetailsStory = StoryObj<InputComponent<any>>;

export const primary: UserDetailsStory = {
  args: args,
};
