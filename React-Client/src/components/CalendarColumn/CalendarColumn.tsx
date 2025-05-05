import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { LuCalendarDays } from 'react-icons/lu';
import { Button } from '../ui/button.tsx';
import clsx from 'clsx';

export const CalendarColumn = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={clsx(
                        'flex items-center justify-center border-0 bg-transparent hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue p-0',
                    )}
                >
                    <LuCalendarDays size="1rem" className="text-blue" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                alignOffset={-100}
                sideOffset={-5}
                className="!z-[20]"
            >
                <Calendar mode="single" disabled={() => false} initialFocus className="w-full" />
            </PopoverContent>
        </Popover>
    );
};
