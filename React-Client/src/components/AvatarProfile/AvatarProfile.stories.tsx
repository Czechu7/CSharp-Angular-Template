import type { Meta, StoryObj } from '@storybook/react';
import { AvatarProfile } from './AvatarProfile';

const meta = {
    title: 'Components/Avatar',
    component: AvatarProfile,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof AvatarProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarWithPicture: Story = {
    args: {
        src: 'https://github.com/shadcn.png',
    },
};
export const AvatarWithoutPicture: Story = {
    args: {
        src: '',
    },
};
