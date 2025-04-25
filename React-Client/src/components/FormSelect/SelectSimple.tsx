import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import clsx from 'clsx';
import { ReactNode } from 'react';

type SelectOption = {
    value: string;
    label: ReactNode;
};

type Props = {
    items: SelectOption[];
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export const SelectSimple = ({ items, placeholder, label, description, value, onChange, error }: Props) => {
    return (
        <FormItem className="select-item">
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={onChange} value={value}>
                <FormControl
                    className={clsx({
                        'border-[#FD83A5] placeholder:text-[#FD83A5] hover:border-[#FD83A5] focus-visible:border-[#FD83A5]':
                            error,
                    })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {items && items.length > 0 ? (
                        items.map(item => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem disabled value="NoOptions">
                            Brak dostępnych opcji
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
    );
};
