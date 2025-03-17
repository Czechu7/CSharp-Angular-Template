import type { Meta, StoryObj } from '@storybook/angular';
import { IConfirmModalProps } from '../../types/modal.types';
import { ConfirmModalComponent } from './confirm-modal.component';

const meta: Meta<ConfirmModalComponent> = {
  title: 'Components/ConfirmModalComponent',
  component: ConfirmModalComponent,
};
export default meta;

const args: IConfirmModalProps = {
  header: 'Confirm',
  visible: true,
  message: 'Are you sure?',
  yesLabel: 'Yes',
  noLabel: 'No',
  onYes: () => {},
  onNo: () => {},
};

type ConfirmModalStory = StoryObj<ConfirmModalComponent>;

export const Primary: ConfirmModalStory = {
  args: args,
};
