import type { Meta, StoryObj } from '@storybook/react';
import ProgressSlider from './ProgressSilder';

const meta = {
    title: 'Components/ProgressSlider',
    component: ProgressSlider,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ProgressSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressSliderExample: Story = {
    args: {
        max: 100,
        value: 50,
        label: 'Progress',
        step: 1,
    },
};
