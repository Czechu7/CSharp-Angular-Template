import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/ReusableButton',
    component: Button,
    argTypes: {
        label: {
            control: 'text',
            defaultValue: 'Save',
        },
        variant: {
            control: 'select',
            options: ['filled', 'outlined', 'square', 'default'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon', 'actionButton'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SaveButton: Story = {
    args: {
        label: 'Save',
        variant: 'filled',
        size: 'actionButton',
        disabled: false,
        type: 'save',
    },
};

export const SaveButtonDisabled: Story = {
    args: {
        label: 'Save',
        variant: 'filled',
        size: 'actionButton',
        disabled: true,
        type: 'save',
    },
};

export const CancelButton: Story = {
    args: {
        label: 'Cancel',
        variant: 'outlined',
        size: 'actionButton',
        disabled: false,
        type: 'cancel',
    },
};

export const CancelButtonDisabled: Story = {
    args: {
        label: 'Cancel',
        variant: 'outlined',
        size: 'actionButton',
        disabled: true,
        type: 'cancel',
    },
};
