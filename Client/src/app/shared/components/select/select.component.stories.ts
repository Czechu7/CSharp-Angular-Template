import type { Meta, StoryObj } from '@storybook/angular';
import { ISelectProps } from '../../types/select.types';
import { SelectComponent } from './select.component';
import { FormControl } from '@angular/forms';

const meta: Meta<SelectComponent<ISelectProps>> = {
  title: 'Components/SelectComponent',
  component: SelectComponent,
};
export default meta;

const args: ISelectProps = {
  formControl: new FormControl(),
  label: 'Select',
  placeholder: 'Select an option',
  required: true,
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ],
  checkmark: false,
  showClear: false,
  editable: false,
  loading: false,
};

type SelectStory = StoryObj<SelectComponent>;

export const primary: SelectStory = {
  args: args,
};
