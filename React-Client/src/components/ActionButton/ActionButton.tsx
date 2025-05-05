import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { IconElement } from '@/components/ActionButton/IconElement.tsx';
import { Icon } from '@/enums';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

type Props = {
    icon: Icon;
    className?: string;
    onClick: () => void;
    type?: ButtonType;
};

export const ActionButton = ({ icon, className, onClick, type = 'button' }: Props) => {
    return (
        <Button
            className={cn(
                `w-[2.36rem] h-[2.36rem] justify-center bg-darkGray hover:bg-darkGray border border-borderGray rounded-[0.43rem] p-0 hover:border hover:border-blue shrink-0`,
                'transition-all duration-200',
                className,
            )}
            onClick={onClick}
            type={type}
        >
            <div className="icon text-blue">
                <IconElement icon={icon} />
            </div>
        </Button>
    );
};
