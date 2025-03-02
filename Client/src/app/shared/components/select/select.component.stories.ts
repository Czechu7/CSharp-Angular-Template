import type { Meta, StoryObj } from '@storybook/angular';
import { SelectProps } from '../../types/select.types';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent<any>> = {
  title: 'Components/SelectComponent',
  component: SelectComponent,
};
export default meta;

const args: SelectProps = {
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

type SelectStory = StoryObj<SelectComponent<any>>;

export const primary: SelectStory = {
  args: args,
};
