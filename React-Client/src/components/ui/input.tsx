import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'input flex h-[2.36rem] max-w-[19rem] w-full rounded-[0.43rem] text-[#A8A7AB] text-[1rem] text-ellipsis	border border-[#605F7666] bg-darkGray px-[1.3rem] py-[0.5rem] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#A8A7AB] hover:border-blue focus-visible:border-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#605F7666] disabled:hover:border-[#605F7666] disabled:opacity-50',
                className,
            )}
            ref={ref}
            autoComplete="off"
            {...props}
        />
    );
});
Input.displayName = 'Input';

export { Input };
