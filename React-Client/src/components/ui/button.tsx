import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils.ts';

const buttonVariants = cva(
    'btn inline-flex items-center bg:darkGray text-[0.93rem] px-[1rem] rounded-[.43rem] focus:shadow-outline transition duration-300 focus-visible:outline-none bg:darkGray disabled:bg-darkGray border-[transparent] disabled:border-[#3A3D4E] disabled:text-[#6A6D80] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-[1.14rem] [&_svg]:shrink-0 disabled',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                filled: 'bg-blue text-white border border-[transparent] hover:bg-blue disabled:bg-[#2B2F3D80] disabled:text-[#B5B5B5] disabled:border disabled:border-[#3A3D4E]',
                outlined: 'border border-red text-red hover:bg-red hover:text-white disabled:text-[#B5B5B5]',
                outlinedError: 'border border-redError text-redError hover:bg-redError hover:text-white disabled:text-[#B5B5B5]',
                outlinedGray: 'border border-gray3 text-gray3 hover:bg-gray3 hover:text-white disabled:text-[#B5B5B5]',
                square: 'justify-center flex-shrink-0 rounded-[0.43rem] bg-darkGray border border-borderGray text-blue hover:border-blue transition duration-300 p-0',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'w-[2.36rem] h-[2.36rem]',
                actionButton: 'h-[2.36rem] min-w-[7.86rem] px-[0.93rem] py-[0.36rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    },
);
Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
