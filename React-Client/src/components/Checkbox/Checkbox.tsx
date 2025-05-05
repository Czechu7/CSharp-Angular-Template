import { Checkbox as ShadCnCheckbox } from '@/components/ui/checkbox.tsx';
import { cn } from '@/lib/utils.ts';
import { CheckedState } from '@radix-ui/react-checkbox';
import { PropsWithChildren } from 'react';

type Props = {
    checked: CheckedState;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
};

export const Checkbox = ({ checked, onCheckedChange, disabled = false, children }: PropsWithChildren<Props>) => {
    return (
        <div className="flex items-center space-x-2">
            <ShadCnCheckbox
                className={cn(
                    `border border-gray-600 
                data-[state=checked]:bg-[#246BFA] 
                data-[state=checked]:border-[#246BFA]`,
                    !disabled && 'hover:border-[#246BFA]',
                )}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
            />
            {children && <span className="text-white">{children}</span>}
        </div>
    );
};
