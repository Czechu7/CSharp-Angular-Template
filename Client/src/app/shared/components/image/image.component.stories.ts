import type { Meta, StoryObj } from '@storybook/angular';
import { ImageComponent } from './image.component';
import { IImageProps } from '../../types/image.types';

const meta: Meta<ImageComponent> = {
  title: 'Components/ImageComponent',
  component: ImageComponent,
  parameters: {
    docs: {
      description: {
        component: 'Responsive image component with preview functionality',
      },
    },
  },
};

export default meta;

type ImageStory = StoryObj<ImageComponent> & {
  args: IImageProps;
};

export const Basic: ImageStory = {
  args: {
    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
    alt: 'Sample image',
    width: '250px',
    preview: true,
  },
};

export const NoPreview: ImageStory = {
  args: {
    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
    alt: 'Image without preview',
    width: '250px',
    preview: false,
  },
};

export const Downloadable: ImageStory = {
  args: {
    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
    alt: 'Downloadable image',
    width: '250px',
    preview: true,
  },
};

export const WithCustomSize: ImageStory = {
  args: {
    src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
    alt: 'Custom size image',
    width: '300px',
    height: '200px',
    preview: true,
  },
};
