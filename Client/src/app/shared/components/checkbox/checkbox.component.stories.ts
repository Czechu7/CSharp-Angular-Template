import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { ICheckboxProps } from '../../types/checkbox.types';
import { FormControl } from '@angular/forms';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
};
export default meta;

const args: ICheckboxProps = {
  inputId: 'checkbox',
  name: 'checkbox',
  required: false,
  label: 'Checkbox',
  formControl: new FormControl(false),
  value: true,
};

type CheckboxStory = StoryObj<CheckboxComponent>;

export const primary: CheckboxStory = {
  args: args,
};
