import type { Meta, StoryObj } from '@storybook/react';
import { SwitchDarkMode } from './SwitchDarkMode';

type Props = {
    isDarkMode: boolean;
    onToggleDarkMode: (checked: boolean) => void;
};

export const SwitchWrapper = ({ isDarkMode, onToggleDarkMode }: Props) => {
    return (
        <div>
            <SwitchDarkMode isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
        </div>
    );
};

const meta = {
    title: 'Components/SwitchDarkMode',
    component: SwitchWrapper,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SwitchDarkMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchThemeMode: Story = {
    args: {
        isDarkMode: false,
        onToggleDarkMode: () => {},
    },
};
