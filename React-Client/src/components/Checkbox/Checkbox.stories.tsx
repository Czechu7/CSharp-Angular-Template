import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox.tsx';

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxChecked: Story = {
    args: {
        checked: false,
        onCheckedChange: () => {},
        disabled: false,
    },
};
export const CheckboxUnchecked: Story = {
    args: {
        checked: true,
        onCheckedChange: () => {},
        disabled: false,
    },
};
export const CheckboxDisabledUnchecked: Story = {
    args: {
        checked: false,
        onCheckedChange: () => {},
        disabled: true,
    },
};
export const CheckboDisabledChecked: Story = {
    args: {
        checked: true,
        onCheckedChange: () => {},
        disabled: true,
    },
};
