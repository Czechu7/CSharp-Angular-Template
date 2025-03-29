import type { Meta, StoryObj } from '@storybook/angular';
import { IInputProps } from '../../types/input.types';
import { InputComponent } from './input.component';
import { FormControl } from '@angular/forms';

const meta: Meta<InputComponent<IInputProps>> = {
  title: 'Components/Input',
  component: InputComponent,
};
export default meta;

const args: IInputProps = {
  label: 'Username',
  placeholder: 'Enter username',
  type: 'text',
  prefixIcon: 'user',
  required: true,
  errorMessage: 'This field is required',
  formControl: new FormControl(),
  autocomplete: 'given-name',
};

type InputStory = StoryObj<InputComponent<IInputProps>>;

export const primary: InputStory = {
  args: args,
};
