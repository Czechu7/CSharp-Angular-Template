import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploaderComponent } from './file-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { MessageService } from 'primeng/api';

const meta: Meta<FileUploaderComponent> = {
  title: 'Components/FileUploaderComponent',
  component: FileUploaderComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule],
      providers: [MessageService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'File uploader component that allows users to upload files',
      },
    },
  },
};

export default meta;

export const Primary: StoryObj<FileUploaderComponent> = {
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
  },
};

export const BasicMode: StoryObj<FileUploaderComponent> = {
  args: {
    ...Primary.args,
    mode: 'basic',
    emptyMessage: 'Click to upload',
  },
};

export const AutoUpload: StoryObj<FileUploaderComponent> = {
  args: {
    ...Primary.args,
    auto: true,
    showUploadButton: false,
  },
};
