import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { LuTrash2 } from 'react-icons/lu';
import clsx from 'clsx';
import './FileUploader.scss';

type Props = {
    allowedFormats?: string[];
    onFileUpload: (file: File) => void;
    onError?: (error: string) => void;
    placeholderText?: string;
    errorMessage?: string;
};

export const FileUploader = ({
    allowedFormats = [
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
    onFileUpload,
    onError,
    placeholderText,
    errorMessage = 'Niepoprawny format pliku',
}: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFileFormat = useCallback(
        (file: File) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            return fileExtension ? allowedFormats.includes(fileExtension) : false;
        },
        [allowedFormats],
    );

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const uploadedFile = acceptedFiles[0];

                if (validateFileFormat(uploadedFile)) {
                    setFile(uploadedFile);
                    setError(null);
                    onFileUpload?.(uploadedFile);
                } else {
                    const errorText = errorMessage || 'Niepoprawny format pliku';
                    setError(errorText);
                    setFile(null);
                    onError?.(errorText);
                }
            } else {
                setError(errorMessage || 'Niepoprawny format pliku');
            }
        },
        [validateFileFormat, onFileUpload, onError, errorMessage],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: allowedFormats.reduce(
            (acc, format) => {
                acc[`.${format}`] = [];
                return acc;
            },
            {} as Record<string, string[]>,
        ),
        multiple: false,
    });

    const defaultPlaceholder =
        'Przeciągnij i upuść plik tutaj, lub <span class="text-[#246BFA]">wybierz</span> z dysku';

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
    };

    return (
        <div className="uploader max-w-[43.08rem] min-h-[8.5rem] mx-auto">
            <div
                {...getRootProps()}
                className={clsx(
                    'relative h-full min-h-[8.5rem] flex justify-center align-center p-[1rem] text-center cursor-pointer rounded-[.86rem] transition-colors duration-300',
                    'bg-darkGray hover:bg-[#31313df7]',
                    { 'bg-[#31313df7]': isDragActive },
                )}
            >
                <div
                    className={clsx(
                        'absolute inset-0 rounded-[0.86rem] bg-transparent pointer-events-none',
                        error ? 'custom-border-red' : 'custom-border',
                    )}
                />
                <input {...getInputProps()} />
                {file ? (
                    <div className="w-100 flex gap-[1rem] justify-center items-center overflow-hidden">
                        <span className="text-[#918F97] text-[0.93rem] overflow-hidden truncate max-w-full whitespace-normal">
                            {file.name}
                        </span>
                        <button
                            onClick={handleRemoveFile}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                            aria-label="Usuń plik"
                        >
                            <LuTrash2 color="#918F97" />
                        </button>
                    </div>
                ) : error ? (
                    <div className="w-100 flex justify-center items-center flex-col overflow-hidden">
                        <p className="text-[#FD83A5] text-[1rem] mb-[0.25rem]">{error}</p>
                        <div className="text-[0.86rem] text-[#FD83A5] leading-[1.07rem] italic">
                            <p>Dopuszczalne formaty:</p>
                            <p>{allowedFormats.join(', ')}</p>
                        </div>
                    </div>
                ) : (
                    <div className="pt-[1.5rem]">
                        {isDragActive ? (
                            <p className="text-[1rem] text-[#918F97] mb-[0.5rem]">Upuść plik tutaj...</p>
                        ) : (
                            <p
                                className="text-[1rem] text-[#918F97] mb-[0.5rem]"
                                dangerouslySetInnerHTML={{
                                    __html: placeholderText || defaultPlaceholder,
                                }}
                            />
                        )}
                        <div className="text-[0.86rem] text-[#918F97] leading-[1.07rem] italic">
                            <p>Dopuszczalne formaty:</p>
                            <p>{allowedFormats.join(', ')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
