import { Switch } from '@/components/ui/switch';

type Props = {
    isDarkMode: boolean;
    onToggleDarkMode: (checked: boolean) => void;
};

export const SwitchDarkMode = ({ isDarkMode, onToggleDarkMode }: Props) => {
    return (
        <div>
            <Switch id="airplane-mode" checked={!isDarkMode} onCheckedChange={onToggleDarkMode} />
        </div>
    );
};
