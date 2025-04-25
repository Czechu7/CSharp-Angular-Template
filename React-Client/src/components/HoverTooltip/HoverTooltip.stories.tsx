import type { Meta, StoryObj } from '@storybook/react';
import { HoverTooltip } from './HoverTooltip';

const meta = {
    title: 'Components/HoverTooltip',
    component: HoverTooltip,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof HoverTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {
    args: {
        content: 'This is a tooltip content',
        children: (
            <button className="px-4 py-2 bg-cyan-500 text-black rounded-md hover:bg-cyan-600 transition">
                Hover over me
            </button>
        ),
    },
};
