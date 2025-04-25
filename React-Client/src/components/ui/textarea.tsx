import * as React from 'react';

import { cn } from '@/lib/utils.ts';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'flex h-[7.43rem] w-full  max-w-[57rem] rounded-[0.46rem] border border-[#605F764D] bg-darkGray px-[1.3rem] pt-[1rem] pb-[0.75rem] text-[#9C9EA1] resize-none placeholder:text-[#A8A7AB] hover:border-blue focus-visible:border-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#605F7666] disabled:hover:border-[#605F7666] disabled:opacity-50',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
