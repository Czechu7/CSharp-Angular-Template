import * as React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button.tsx';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                'calendar mt-[.65rem] w-[calc(var(--radix-popper-anchor-width)+4rem)] rounded-[0.43rem] border border-blue bg-darkGray pb-[.7rem]',
                className,
            )}
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'w-full',
                caption: 'flex justify-center py-[.5rem] px-[1rem] relative items-center',
                caption_label: 'text-[1rem] leading-[1.85rem] text-[#D6D1E2]',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(buttonVariants({}), 'bg-transparent p-[.2rem] h-auto'),
                nav_button_previous: 'absolute left-[1.25rem]',
                nav_button_next: 'absolute right-[1.25rem]',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex border-b border-[#393949] px-[1rem] h-[1.5rem]',
                head_cell: 'flex-1 text-[0.93rem] text-[#676767]',
                row: 'flex w-full mt-[.35rem] px-[1rem]',
                cell: 'h-[1.64rem] flex-1 flex items-center justify-center text-center text-[.93rem] p-0 text-[#A8A7AB] relative rounded-[.29rem] py-[.9rem]',
                day: 'h-[1.64rem] w-[1.78rem] p-0 text-[.93rem] border border-transparent aria-selected:bg-blue rounded-[.29rem] flex items-center justify-center hover:border-blue',
                day_range_end: 'day-range-end',
                day_selected:
                    'bg-primary text-[#FFFFFF] hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-blue',
                day_today: 'bg',
                day_outside: 'day-outside text-[#676767] aria-selected:bg-blue/50 aria-selected:text-[#676767]',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                ...classNames,
            }}
            components={{
                IconLeft: () => <LuChevronLeft size="1rem" className="text-blue" />,
                IconRight: () => <LuChevronRight size="1rem" className="text-blue" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
