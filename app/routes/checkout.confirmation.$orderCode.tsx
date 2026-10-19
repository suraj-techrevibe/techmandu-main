import { XCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Link, useLoaderData, useRevalidator } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getOrderByCode } from '~/providers/orders/order';

// Helper function to calculate delivery date range (3-4 days from order placement)
function getDeliveryDateRange(orderDate: string): string {
  const order = new Date(orderDate);
  const startDate = new Date(order);
  const endDate = new Date(order);

  // Add 3 days for start of delivery window
  startDate.setDate(startDate.getDate() + 3);
  // Add 4 days for end of delivery window
  endDate.setDate(endDate.getDate() + 4);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export async function loader({ params, request }: DataFunctionArgs) {
  try {
    const order = await getOrderByCode(params.orderCode!, { request });
    return {
      order,
      error: false,
    };
  } catch (ex) {
    return {
      order: null,
      error: true,
    };
  }
}

export default function CheckoutConfirmation() {
  const { order, error } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [retries, setRetries] = useState(1);
  const { t } = useTranslation();

  const orderNotFound = !order && !error;
  const orderErrored = !order && error;
  const maxRetries = 5;
  const retriesExhausted = retries >= maxRetries;
  const retryTimeout = 2500;

  const retry = () => {
    if (!window) return;
    setRetries(retries + 1);
    window.setTimeout(() => {
      if (retries > maxRetries) return;
      revalidator.revalidate();
    }, retryTimeout);
  };

  useEffect(() => {
    if (orderErrored) {
      retry();
    }
  }, [order]);

  useEffect(() => {
    if (
      revalidator.state === 'idle' &&
      orderErrored &&
      retries <= maxRetries &&
      retries > 1
    ) {
      retry();
    }
  }, [revalidator.state]);

  if (orderNotFound) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900">
            {t('checkout.orderNotFound')}
          </h2>
        </div>
      </div>
    );
  }

  if (orderErrored && retriesExhausted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <XCircleIcon className="text-red-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            {t('checkout.orderErrorTitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('checkout.orderErrorMessage')}
          </p>
        </div>
      </div>
    );
  }

  if (orderErrored) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-light text-gray-700">
            {t('checkout.orderProcessing')}
          </h2>
        </div>
      </div>
    );
  }

  const deliveryDateRange = getDeliveryDateRange(order!.orderPlacedAt);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Success Hero Section */}
        <div className="text-center w-full mb-12">
          {/* Success Icon Wrapper */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-8 shadow-lg w-32 h-32 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-semibold text-[#2b0e6e] mb-2">
            Order Successful !
          </h1>
          <p className="text-gray-700 text-lg mb-1">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-600 text-lg">
            Get delivery by {deliveryDateRange}
          </p>

          {/* Buttons & Links */}
          <div className="mt-10 flex flex-col items-center space-y-6 w-full max-w-sm mx-auto">
            <Link
              to="/"
              className="w-full bg-[#253574] text-white font-medium py-3 rounded-md shadow hover:bg-opacity-90 transition-all text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/track-order"
              className="w-full text-[#253574] font-medium py-3 rounded-md shadow hover:bg-opacity-90 transition-all text-center border border-[#253574] border-2"
            >
              Track My Order
            </Link>
          </div>
        </div>

        {/* Payment Information Alert */}
        {order!.active && (
          <div className="w-full max-w-2xl rounded-md bg-blue-50 p-4 mb-8 border border-blue-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {t('checkout.paymentMessage')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Section (Clean White Background) */}
        {/* <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between items-center">
            <span>Order Details</span>
            <span className="text-sm font-normal text-gray-500">#{order!.code}</span>
          </h2>

          <div className="mb-6 overflow-hidden">
            <CartContents
              orderLines={order!.lines}
              currencyCode={order!.currencyCode}
              editable={false}
            />
          </div>

          <div className="border-t border-gray-100 pt-6">
            <CartTotals order={order as OrderDetailFragment} />
          </div>
        </div> */}

      </div>
    </div>
  );
}
