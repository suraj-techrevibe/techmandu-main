import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import NewsLetterIcon from '~/assets/images/Envelopes.png';

type ActionData = {
  success: boolean;
  message?: string;
  error?: string;
};

const NewsLetter = () => {
  // We use useFetcher instead of useActionData/useNavigation for global components in root.tsx
  // This avoids the "405 Method Not Allowed" error on pages without an action.
  const fetcher = useFetcher<ActionData>();
  const actionData = fetcher.data;
  const isSubmitting = fetcher.state === 'submitting';
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData?.success]);

  return (
    <div className="container py-4 lg:py-6">
      <div className="bg-[#F1F3FB] rounded-[12px] px-6 py-3 lg:px-10 lg:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
            Join Our newsletter
          </h2>

          {actionData?.success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-lg text-sm">
              {actionData.message}
            </div>
          )}
          {actionData?.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-lg text-sm">
              {actionData.error}
            </div>
          )}

          <fetcher.Form
            ref={formRef}
            method="post"
            action="/api/newsletter"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address..."
              required
              disabled={isSubmitting}
              className="flex-1 max-w-md px-5 py-2.5 rounded-lg bg-transparent border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A1D96] focus:border-transparent text-base disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:w-auto px-8 py-2.5 rounded-lg bg-[#253574] text-white font-semibold hover:bg-[#1a2654] transition-colors text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[130px]"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </fetcher.Form>

          <p className="text-sm text-black">
            Weekly newsletter only. No spam, unsubscribe at any time.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-[320px] flex-shrink-0">
          <img
            src={NewsLetterIcon}
            alt="Newsletter Subscription"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
