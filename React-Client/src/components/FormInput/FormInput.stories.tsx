import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';
import { FormInput } from './FormInput';

type Props = {
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
    type?: 'text' | 'number' | 'email' | 'password';
};

export const FormWrapper = ({ label, placeholder, description, type }: Props) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormInput
                form={methods}
                name={'name'}
                placeholder={placeholder}
                label={label}
                description={description}
                type={type}
            />
        </FormProvider>
    );
};

const meta = {
    title: 'Components/FormInput',
    component: FormWrapper,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
    args: {
        placeholder: 'Enter text...',
        label: 'Example Label',
        description: 'This is an example description',
        type: 'text',
    },
};
