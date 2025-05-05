import type { Meta, StoryObj } from '@storybook/react';
import { LineAndBarChart } from './LineAndBarChart';

const meta = {
    title: 'Components/LineAndBarChart',
    component: LineAndBarChart,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof LineAndBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineAndBarChartExample: Story = {
    args: {
        data: [
            { date: '2023-07-07', hours: 7, progress: 10 },
            { date: '2023-07-08', hours: 7, progress: 40 },
            { date: '2023-07-09', hours: 8, progress: 10 },
            { date: '2023-07-10', hours: 3, progress: 40 },
            { date: '2023-07-11', hours: 10.5, progress: 20 },
            { date: '2023-07-12', hours: 8, progress: 50 },
            { date: '2023-07-13', hours: 5, progress: 16 },
            { date: '2023-07-14', hours: 6, progress: 19 },
        ],
        dataKey1: 'date',
        dataKey2: 'hours',
        dataKey3: 'progress',
        barLabel1: 'date',
        barLabel2: 'hours',
        lineLabel: 'progress',
    },
};
