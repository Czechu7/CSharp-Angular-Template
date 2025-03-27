import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { ICheckboxProps } from '../../types/checkbox.types';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
};
export default meta;

const args: ICheckboxProps = {
  inputId: 'checkbox',
  name: 'checkbox',
  disabled: false,
  required: false,
  label: 'Checkbox',
  formControlName: 'checkbox',
  value: true,
};

type CheckboxStory = StoryObj<CheckboxComponent>;

export const primary: CheckboxStory = {
  args: args,
};
