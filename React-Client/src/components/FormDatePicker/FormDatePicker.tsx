import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { Button } from '../ui/button.tsx';
import { Path, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Calendar } from '@/components/ui/calendar';
import { DateTime } from 'luxon';
import clsx from 'clsx';
import { LuCalendarDays } from 'react-icons/lu';

type Props<T extends Record<string, unknown>> = {
    name: Path<T>;
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    form: UseFormReturn<T>;
};

export const FormDatePicker = <T extends Record<string, unknown>>({
    name,
    placeholder,
    label,
    description,
    form,
}: Props<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="flex flex-col z-[5]">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl className={clsx({ 'border-red-500': fieldState.error })}>
                                <Button
                                    className={cn(
                                        "flex h-[2.36rem] max-w-[13.57rem] w-full rounded-[0.43rem] text-[#A8A7AB] text-[1rem] text-ellipsis border border-[#605F7666] bg-darkGray px-[1rem] py-[0.5rem] file:border-0 file:bg-darkGray file:text-sm file:font-medium file:text-foreground placeholder:text-[#A8A7AB] hover:bg-darkGray hover:border-blue focus-visible:border-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#605F7666] disabled:hover:border-[#605F7666] disabled:opacity-50 [&[data-state='open']]:border-blue",
                                    )}
                                >
                                    {field.value && field.value instanceof Date ? (
                                        <span className="text-left flex-1 text-[.93rem] leading-none">
                                            {field.value.toLocaleDateString()}
                                        </span>
                                    ) : (
                                        <span className="text-left flex-1">{placeholder}</span>
                                    )}
                                    <LuCalendarDays size="1rem" className="text-blue" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value instanceof Date ? field.value : undefined}
                                onSelect={date => {
                                    const selectedDate = date instanceof Date ? date : undefined;
                                    field.onChange(selectedDate);
                                }}
                                disabled={(date: Date) => DateTime.fromJSDate(date) < DateTime.fromISO('1900-01-01')}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
