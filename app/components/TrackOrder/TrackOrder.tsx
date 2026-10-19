import { CubeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { action } from '~/routes/api.track-order';

export default function TrackOrder() {
  const actionData = useActionData<typeof action>;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="w-full">
      <div className="bg-[#F1F3FB] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CubeIcon className="w-8 h-8 text-gray-900 stroke-2" />
          <h1 className="text-2xl font-bold text-gray-900">Track your order</h1>
        </div>

        <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
          To track your order please enter your order ID in the input field
          below and press the "Track Order" button. this was given to you on
          your receipt and in the confirmation email you should have received.
        </p>

        <Form method="post" action="/api/track-order" className="space-y-4">
          {/* Order ID */}
          <div className="space-y-2">
            <label
              htmlFor="orderId"
              className="block text-gray-900 font-bold text-base"
            >
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              placeholder="Enter your order number"
              className="w-full h-12 px-4 bg-transparent border border-gray-400 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-0 transition-colors"
              required
            />
          </div>

          <div className="flex items-start gap-2 text-gray-600 mt-4">
            <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
            <p className="text-xs pt-0.5">
              Order ID that we sended to your in your email address.
            </p>
          </div>

          {actionData?.error && (
            <div className="text-red-600 text-sm font-medium mt-2">
              {actionData.error}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#D3461E] hover:bg-[#b03a19] text-white font-medium py-2.5 px-8 rounded-lg text-base transition-colors duration-200"
            >
              {isSubmitting ? 'Tracking...' : 'Track Order'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
