import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect } from './FormSelect';

type SelectOption = {
    value: string;
    label: ReactNode;
};

type Props = {
    items: SelectOption[];
    placeholder: string;
    label: ReactNode;
    description?: ReactNode;
};

export const FormWrapper = ({ label, placeholder, description, items }: Props) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormSelect
                form={methods}
                name="select"
                placeholder={placeholder}
                label={label}
                description={description}
                items={items}
            />
        </FormProvider>
    );
};

const meta = {
    title: 'Components/FormSelect',
    component: FormWrapper,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
    args: {
        placeholder: 'Enter text...',
        label: 'Example Label',
        description: 'This is an example description',
        items: [
            { value: 'Option 1', label: 'Option 1' },
            { value: 'Option 2', label: 'Option 2' },
            { value: 'Option 3', label: 'Option 3' },
        ],
    },
};
