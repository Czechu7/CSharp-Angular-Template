import { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '@/components/FileUploader/FileUploader.tsx';

const meta: Meta<typeof FileUploader> = {
    title: 'Components/FileUploader',
    component: FileUploader,
    tags: ['autodocs'],
    argTypes: {
        allowedFormats: {
            control: 'object',
            description: 'Lista dozwolonych formatów plików',
            defaultValue: [
                'doc',
                'docx',
                'xls',
                'xlsx',
                'pdf',
                'ppt',
                'pptx',
                'msg',
                'dwg',
                'dxf',
                'cdr',
                'psd',
                'zip',
                '7z',
                'mp4',
            ],
        },
        placeholderText: {
            control: 'text',
            description: 'Tekst zastępczy wyświetlany w uploaderze',
        },
        errorMessage: {
            control: 'text',
            description: 'Wiadomość błędu wyświetlana przy niedozwolonym formacie pliku',
        },
        onFileUpload: { action: 'onFileUpload' },
        onError: { action: 'onError' },
    },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
    args: {},
};
