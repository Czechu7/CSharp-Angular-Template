import type { Meta, StoryObj } from '@storybook/angular';
import { ConfirmModalProps } from '../../types/modal.types';
import { ConfirmModalComponent } from './confirm-modal.component';

const meta: Meta<ConfirmModalComponent> = {
  title: 'Components/ConfirmModalComponent',
  component: ConfirmModalComponent,
};
export default meta;

const args: ConfirmModalProps = {
  header: 'Confirm',
  visible: true,
  message: 'Are you sure?',
  yesLabel: 'Yes',
  noLabel: 'No',
  onYes: () => {},
  onNo: () => {},
};

type NavbarStory = StoryObj<ConfirmModalComponent>;

export const Primary: NavbarStory = {
  args: args,
};
