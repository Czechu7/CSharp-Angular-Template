import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';
import { FormDatePicker } from './FormDatePicker';

type Props = {
    placeholder: string;
    label: ReactNode;
    description?: ReactNode;
};

export const FormWrapper = ({ label, placeholder, description }: Props) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormDatePicker
                form={methods}
                name={'date-picker'}
                placeholder={placeholder}
                label={label}
                description={description}
            />
        </FormProvider>
    );
};

const meta = {
    title: 'Components/FormDatePicker',
    component: FormWrapper,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DatePicker: Story = {
    args: {
        placeholder: 'Enter text...',
        label: 'Example Label',
        description: 'This is an example description',
    },
};
