import type { Meta, StoryObj } from '@storybook/react';
import { SelectView } from './SelectView';

const meta = {
    title: 'Components/SelectView',
    component: SelectView,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SelectView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectView1: Story = {
    args: {
        items: [
            { value: 'onTime', label: 'On Time' },
            { value: 'delayed', label: 'Delayed' },
            { value: 'ahead', label: 'Ahead' },
        ],
        placeholder: 'Choose Status',
        onChange: (value: string) => console.log(value),
    },
};
