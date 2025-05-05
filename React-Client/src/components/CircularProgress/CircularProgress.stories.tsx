import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';

const meta = {
    title: 'Components/CircularProgress',
    component: CircularProgress,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CircularProgressExample: Story = {
    args: {
        value: 60,
        label: 'Progress',
    },
};
