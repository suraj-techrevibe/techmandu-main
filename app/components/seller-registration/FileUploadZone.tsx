import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface FileUploadZoneProps {
    name: string;
    multiple?: boolean;
    onChange?: (files: File[]) => void;
}

export const FileUploadZone = ({
    name,
    multiple = true,
    onChange,
}: FileUploadZoneProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const newFiles = multiple ? [...selectedFiles, ...fileArray] : [fileArray[0]];
        setSelectedFiles(newFiles);
        onChange?.(newFiles);
    };

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    return (
        <div className="w-full">
            {/* Upload Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${dragActive
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-300 bg-white'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept="image/*,application/pdf"
                    multiple={multiple}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center">
                    {/* Upload Icon */}
                    <svg
                        className="h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>

                    <p className="text-base text-gray-700 mb-1">
                        Upload or Drag and Drop your documents
                    </p>
                    <p className="text-sm text-gray-500">
                        Maximum File Size is 20MB
                    </p>
                    <p className="text-sm text-gray-500">
                        Supported File Types are .png, .jpeg, .pdf, .csv
                    </p>
                </div>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Selected Files ({selectedFiles.length}):
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        {selectedFiles.map((file, index) => (
                            <li key={index}>• {file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
