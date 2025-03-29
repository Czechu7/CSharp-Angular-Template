import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordInputComponent } from './password-input.component';
import { IPasswordInputProps } from '../../types/password-input.types';
import { FormControl } from '@angular/forms';

const meta: Meta<PasswordInputComponent<IPasswordInputProps>> = {
  title: 'Components/PasswordInput',
  component: PasswordInputComponent,
};
export default meta;

const args: IPasswordInputProps = {
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
  formControl: new FormControl(),
  autocomplete: 'new-password',
};

type PasswordInputStory = StoryObj<PasswordInputComponent<IPasswordInputProps>>;

export const primary: PasswordInputStory = {
  args: args,
};
