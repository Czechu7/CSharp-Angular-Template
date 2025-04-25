import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { FaMoon } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import { MdSunny } from 'react-icons/md';

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            'group inline-flex h-[2rem] w-[3.71rem] shrink-0 cursor-pointer items-center rounded-[1.43rem] border border-[#DBDBEB38] bg-[#2A2A36] transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#2A2A36] data-[state=unchecked]:bg-[#2A2A36]',
            className,
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                'relative pointer-events-none h-[1.57rem] w-[1.57rem] rounded-full bg-blue shadow-switch transition-transform data-[state=checked]:translate-x-[1.85rem] data-[state=unchecked]:translate-x-[.29rem]',
            )}
        >
            <FaMoon
                className="absolute top-[50%] left-[50%] translate-y-[-50%]	translate-x-[-50%] moon text-white group-data-[state=checked]:hidden"
                size=".95rem"
            />
            <MdSunny
                className="absolute top-[50%] left-[50%] translate-y-[-50%]	translate-x-[-50%] sun text-white group-data-[state=unchecked]:hidden"
                size="1.25rem"
            />
        </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
