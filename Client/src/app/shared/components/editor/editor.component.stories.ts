import type { Meta, StoryObj } from '@storybook/angular';
import { IEditorProps } from '../../types/editor.types';
import { EditorComponent } from './editor.component';

const meta: Meta<EditorComponent> = {
  title: 'Components/EditorComponent',
  component: EditorComponent,
  parameters: {
    docs: {
      description: {
        component: 'Rich text editor component with various formatting options',
      },
    },
  },
};
export default meta;

const baseArgs: IEditorProps = {
  style: { height: '320px' },
  styleClass: 'editor',
  placeholder: 'Enter text here...',
  readOnly: false,
};

type EditorStory = StoryObj<EditorComponent> & {
  args: IEditorProps;
};

export const Primary: EditorStory = {
  args: baseArgs,
};

export const ReadOnly: EditorStory = {
  args: {
    ...baseArgs,
    readOnly: true,
  },
};
