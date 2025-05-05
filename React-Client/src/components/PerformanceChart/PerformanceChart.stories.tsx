import type { Meta, StoryObj } from '@storybook/react';
import { PerformanceChart } from './PerformanceChart';

const meta = {
    title: 'Components/PerformanceChart',
    component: PerformanceChart,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PerformanceChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerformanceChartExample: Story = {
    args: {
        data: [
            { name: 'Chrome', value: 275, color: 'hsl(210, 100%, 60%)' },
            { name: 'Safari', value: 200, color: 'hsl(195, 100%, 40%)' },
            { name: 'Firefox', value: 187, color: 'hsl(14, 100%, 50%)' },
            { name: 'Edge', value: 173, color: 'hsl(210, 100%, 40%)' },
            { name: 'Other', value: 90, color: 'hsl(0, 0%, 66%)' },
        ],
        title: 'This is a title',
        subTitle: 'This is a subtitle',
        description: 'This is a description',
        dataKey: 'value',
        nameKey: 'name',
        activeIndex: 0,
    },
};
