import {
  useActionData,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/server-runtime';
import { ReactNode, useRef, useState } from 'react';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { QR_PAYMENT_UPLOAD_URL } from '~/constants';
import { Asset } from '~/generated/graphql';
import { addQrPaymentProof } from '~/providers/checkout/checkout';

// Helper component for an 'X' icon (optional, but cleaner than hardcoding SVG)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export async function loader() {
  return { qrPaymentUrl: QR_PAYMENT_UPLOAD_URL };
}

export async function action({ request }: ActionFunctionArgs) {
  // const body = await request.formData();
  const formData = await request.formData();

  const assetId = String(formData.get('assetId'));
  const orderCode = String(formData.get('orderCode'));

  if (!assetId || !orderCode) {
    return { error: 'AssetId or Order code is invalid.' };
  }

  if (assetId && orderCode) {
    const res = await addQrPaymentProof(assetId, orderCode);
    if (res.addQrPaymentProof.success) {
      return redirect('/checkout/confirmation/' + orderCode);
    }
  }

  return {
    error:
      'An issue on the server occured. Please contact support if you already have made the payment.',
  };
}

export default function QRPayment() {
  const { qrPaymentUrl } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const { submit, state } = useFetcher();

  const [searchParams] = useSearchParams();

  const encodedImageUrl = searchParams.get('imageUrl') || '';
  // Decode the image URL from search params
  const decodedImageUrl = decodeURIComponent(encodedImageUrl);

  const orderCode = searchParams.get('orderCode') || '';

  const totalFromSearchParams = searchParams.get('total') || 0;
  const total = Number(totalFromSearchParams) || 0;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles both file selection from input and drag-and-drop.
   * @param selectedFile The File object to process.
   */
  const processFile = (selectedFile: File | undefined) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('File must be an image.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null); // Clear any previous errors
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow a drop
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the first file from the dropped items
    const selectedFile = e.dataTransfer.files?.[0];
    processFile(selectedFile);
  };

  const handleRemoveImage = () => {
    // Revoke the object URL to free up memory
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);

    // Reset the file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please upload an image first.');
      return;
    }
    setError(null); // Clear error before upload

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);

      const response = await fetch(qrPaymentUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Handle non-2xx status codes
        setError(
          'Failed to upload image. Please try again or contact support.',
        );
        return;
      }

      const data: Asset = await response.json();

      if (data.id) {
        submit(
          {
            assetId: data.id,
            orderCode,
          },
          { method: 'POST' },
        );
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError(
        'Failed to add proof for payment. This might probably due to network issues. Please contact issues if you have already paid.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!qrPaymentUrl) {
    return <ErrorBlock>QR Payment URL not found</ErrorBlock>;
  }

  if (!decodedImageUrl) {
    return <ErrorBlock>Image URL not found</ErrorBlock>;
  }

  if (!orderCode) {
    return <ErrorBlock>Order Code not found</ErrorBlock>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6 mt-12">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        💳 QR Payment
      </h2>

      {/* Order Code Display */}
      <p className="text-center text-sm text-gray-500">
        Order Code: <strong className="text-gray-700">{orderCode}</strong>
      </p>

      <div className="text-center font-bold text-3xl border border-primary p-3 rounded-lg">
        Total: <DynamicPrice priceWithTax={total} />
      </div>

      {/* QR Image */}
      <div className="text-center">
        <p className="mb-2 text-gray-600">Scan this QR to make the payment</p>
        <img
          src={decodedImageUrl}
          alt="QR Code"
          className="w-full max-w-[300px] mx-auto aspect-auto object-contain border rounded-lg p-2 shadow-md"
          height={200}
          width={200}
        />
      </div>

      <hr className="border-gray-200" />

      {/* Upload Section (Improved UI) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Upload Payment Screenshot
        </h3>

        {/* Preview and Remove Feature */}
        {preview ? (
          <div className="relative mt-3 group">
            <img
              src={preview}
              alt="Payment Screenshot Preview"
              className="w-full max-h-80 object-contain border-2 border-green-400 rounded-lg shadow-lg"
            />
            {/* 'X' button to remove the image */}
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-xl hover:bg-red-700 transition opacity-80 group-hover:opacity-100"
              aria-label="Remove image"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Drag and Drop/Click to Upload Area */
          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <XIcon className="w-10 h-10 text-gray-400 rotate-90" />{' '}
            {/* Reusing XIcon for a paperclip-like effect */}
            <p className="mt-2 text-sm text-gray-600 font-medium">
              Drag 'n' drop or{' '}
              <span className="text-primary font-bold">
                click to select file
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, or JPEG (Max 5MB)
            </p>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden" // Keep the input hidden
        />

        {/* Error message display */}
        {error && (
          <div className="p-2 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )}
      </div>

      {error ? <p className="text-red-500">{error}</p> : null}

      {actionData?.error ? (
        <p className="text-red-500">{actionData.error}</p>
      ) : null}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        // Button is only enabled if a file is selected and not loading
        disabled={loading || !file || state !== 'idle'}
        className="w-full py-3 bg-primary2 text-white font-semibold rounded-xl 
          hover:bg-primary2/90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {loading || state !== 'idle'
          ? '⏳ Uploading...'
          : '✅ Upload Screenshot'}
      </button>
    </div>
  );
}

function ErrorBlock({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center text-red-500 italic h-32 w-full">
      {children}
    </div>
  );
}
