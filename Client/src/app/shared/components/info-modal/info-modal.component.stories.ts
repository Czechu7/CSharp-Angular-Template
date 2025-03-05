import type { Meta, StoryObj } from '@storybook/angular';
import { InfoModalProps } from '../../types/modal.types';
import { InfoModalComponent } from './info-modal.component';

const meta: Meta<InfoModalComponent> = {
  title: 'Components/InfoModalComponent',
  component: InfoModalComponent,
};
export default meta;

const args: InfoModalProps = {
  header: 'Information',
  visible: true,
  message: 'This is an information message',
};

type NavbarStory = StoryObj<InfoModalComponent>;

export const Primary: NavbarStory = {
  args: args,
};
