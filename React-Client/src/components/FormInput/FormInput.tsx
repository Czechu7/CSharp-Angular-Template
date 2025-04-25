import { Path, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { IoSearchOutline } from 'react-icons/io5';

type Props<T extends Record<string, unknown>> = {
    name: Path<T>;
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    form: UseFormReturn<T>;
    type?: 'text' | 'number' | 'email' | 'password';
    search?: boolean;
};

export const FormInput = <T extends Record<string, unknown>>({
    name,
    placeholder,
    label,
    description,
    form,
    type = 'text',
    search,
}: Props<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={type}
                                placeholder={placeholder}
                                className={clsx({
                                    'border-[#FD83A5] placeholder:text-[#FD83A5] hover:border-[#FD83A5] focus-visible:border-[#FD83A5]':
                                        fieldState.error,
                                    'pr-[3rem] text-[#DBDBEB]': search,
                                })}
                                value={field.value as string}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                            />
                            {search && (
                                <IoSearchOutline className="search-icon w-[1.35rem] h-[1.35rem] absolute right-[1rem] top-[50%] translate-y-[-50%] text-blue" />
                            )}
                        </div>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
