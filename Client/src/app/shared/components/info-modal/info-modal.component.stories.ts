import type { Meta, StoryObj } from '@storybook/angular';
import { IInfoModalProps } from '../../types/modal.types';
import { InfoModalComponent } from './info-modal.component';

const meta: Meta<InfoModalComponent> = {
  title: 'Components/InfoModalComponent',
  component: InfoModalComponent,
};
export default meta;

const args: IInfoModalProps = {
  header: 'Information',
  visible: true,
  message: 'This is an information message',
};

type InfoModalStory = StoryObj<InfoModalComponent>;

export const Primary: InfoModalStory = {
  args: args,
};
