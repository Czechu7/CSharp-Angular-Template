import { HttpClientModule } from '@angular/common/http';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FileUploaderComponent } from './file-uploader.component';
import { IFileUploadProps } from '../../types/fileUploader.types';

const meta: Meta<FileUploaderComponent> = {
  title: 'Components/FileUploaderComponent',
  component: FileUploaderComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'File uploader component that allows users to upload files',
      },
    },
  },
  argTypes: {
    onFileUpload: { action: 'onFileUpload' },
  },
};

export default meta;

type Story = StoryObj<FileUploaderComponent> & {
  args: IFileUploadProps;
};

export const Primary: Story = {
  args: {
    url: 'https://httpbin.org/post',
    multiple: true,
    accept: 'image/*',
    maxFileSize: 1000000,
    mode: 'advanced',
    emptyMessage: 'Drag and drop files to here to upload.',
    name: 'demo',
    auto: false,
    showCancelButton: true,
    showUploadButton: true,
    chooseLabel: 'Choose Files',
    uploadLabel: 'Upload Files',
    cancelLabel: 'Cancel Upload',
  },
};

export const BasicMode: Story = {
  args: {
    ...Primary.args,
    mode: 'basic',
    emptyMessage: 'Click to upload',
  },
};

export const AutoUpload: Story = {
  args: {
    ...Primary.args,
    auto: true,
    showUploadButton: false,
  },
};
