import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent, InputIcons, InputTypes } from './input.component';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: InputTypes;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  prefixIcon?: InputIcons;
  prefixText?: string;
  suffixIcon?: InputIcons;
  suffixText?: string;
}

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
