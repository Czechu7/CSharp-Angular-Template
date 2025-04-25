import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropsWithChildren, ReactNode } from 'react';

type SelectOption<T extends string> = {
    value: T;
    label: ReactNode;
};

type Props<T extends string> = PropsWithChildren<{
    items: SelectOption<T>[];
    onChange: (value: T) => void;
    placeholder: string;
    defaultValue?: T;
    value?: T;
}>;

export const SelectView = <T extends string>({ items, onChange, defaultValue, placeholder, children, value }: Props<T>) => {
    const handleValueChange = (value: T) => {
        onChange(value);
    };

    return (
        <Select onValueChange={handleValueChange} defaultValue={defaultValue} value={value}>
            {children}
            <SelectTrigger className="mb-0">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items && items.length > 0 ? (
                    items.map(item => (
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
    );
};
