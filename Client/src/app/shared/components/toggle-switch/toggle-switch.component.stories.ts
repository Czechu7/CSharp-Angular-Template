import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from './toggle-switch.component';
import { ToggleSwitchProps } from '../../types/toogleSwitch.types';

const meta: Meta<ToggleSwitchComponent> = {
  title: 'Components/ToggleSwitchComponent',
  component: ToggleSwitchComponent,
};
export default meta;

const args: ToggleSwitchProps = {
  formControlName: 'toggle',
  disabled: false,
  iconOn: 'pi-check',
  iconOff: 'pi-times',
  invalid: false,
  errorMessage: 'Error message',
};

type ToggleSwitchStory = StoryObj<ToggleSwitchComponent>;

export const primary: ToggleSwitchStory = {
  args: args,
};
