import { Path, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Textarea } from '../ui/textarea.tsx';

type TextareaProps<T extends Record<string, unknown>> = {
    name: Path<T>;
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    form: UseFormReturn<T>;
};

export const FormTextArea = <T extends Record<string, unknown>>({
    name,
    placeholder,
    label,
    description,
    form,
}: TextareaProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className={clsx({
                                'border-[#FD83A5] placeholder:text-[#FD83A5] hover:border-[#FD83A5] focus-visible:border-[#FD83A5]':
                                    fieldState.error,
                            })}
                            value={field.value as string}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
