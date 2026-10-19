import { X, Upload, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { PROFILE_PICTURE_UPLOAD_URL } from '~/constants';

interface ProfilePictureUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (imageUrl: string) => void;
}

export function ProfilePictureUploadModal({
  isOpen,
  onClose,
  userId,
  onSuccess,
}: ProfilePictureUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await fetch(`${PROFILE_PICTURE_UPLOAD_URL}/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = (await response.json()) as any;
      // Assuming the response contains the new image URL
      // Adjust based on actual API response structure if known
      onSuccess(data.url || data.imageUrl || previewUrl || '');
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Update Profile Picture
          </h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div
              onClick={triggerFileInput}
              className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
                previewUrl
                  ? 'border-indigo-200 bg-indigo-50/30'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg mx-auto">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
              <span className="w-1 h-1 bg-red-600 rounded-full" />
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !file}
              className="flex-1 px-4 py-3 bg-[#253574] text-white font-bold rounded-xl hover:bg-[#1a2656] shadow-lg shadow-[#253574]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Save Photo'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
