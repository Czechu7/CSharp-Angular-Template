import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';
import { FormTextArea } from './FormTextArea';

type Props = {
    placeholder: string;
    label?: ReactNode;
    description?: ReactNode;
};

export const FormWrapper = ({ label, placeholder, description }: Props) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <FormTextArea
                form={methods}
                name="textarea"
                placeholder={placeholder}
                label={label}
                description={description}
            />
        </FormProvider>
    );
};

const meta = {
    title: 'Components/FormTextArea',
    component: FormWrapper,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FormTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextArea: Story = {
    args: {
        placeholder: 'Enter text...',
        label: 'Example Label',
        description: 'This is an example description',
    },
};
