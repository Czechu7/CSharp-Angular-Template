import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';

type SelectOption = {
    value: string | number;
    label: ReactNode;
};

type Props<T extends Record<string, unknown>> = {
    name: Path<T>;
    items: SelectOption[];
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    form: UseFormReturn<T>;
};

export const FormSelect = <T extends Record<string, unknown>>({
    name,
    items,
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
                <FormItem className="select-item">
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                        defaultValue={field.value as string}
                    >
                        <FormControl
                            className={clsx({
                                'border-[#FD83A5] placeholder:text-[#FD83A5] hover:border-[#FD83A5] focus-visible:border-[#FD83A5]':
                                    fieldState.error,
                            })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items && items.length > 0 ? (
                                items.map(item => (
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem disabled value="NoOptions">
                                    No options available
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
