import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordInputComponent } from './password-input.component';
import { PasswordInputProps } from '../../types/password-input.types';

const meta: Meta<PasswordInputComponent<any>> = {
  title: 'Components/PasswordInput',
  component: PasswordInputComponent,
};
export default meta;

const args: PasswordInputProps = {
  label: 'Pasword',
  placeholder: 'Enter password',
  required: true,
  errorMessage: 'This field is required',
  promptLabel: 'Choose a password',
  weakLabel: 'Too simple',
  mediumLabel: 'Average complexity',
  strongLabel: 'Strong password',
  feedback: true,
  variant: 'outlined',
  invalid: false,
};

type PasswordInputStory = StoryObj<PasswordInputComponent<any>>;

export const primary: PasswordInputStory = {
  args: args,
};
