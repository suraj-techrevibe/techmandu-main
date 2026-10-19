import { DocumentTextIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import { useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import {
  CheckCircleIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
} from 'lucide-react';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { getOrderByCode } from '~/providers/orders/order';

export async function loader({ params, request }: DataFunctionArgs) {
  const url = new URL(request.url);

  let orderCode = (url.searchParams.get('ordercode') || '').trim();

  // if missing required values, return null order (will show form)
  if (!orderCode) {
    return { order: null, error: false };
  }

  try {
    const order = await getOrderByCode(orderCode, { request });
    return { order, error: false };
  } catch (ex) {
    return { order: null, error: true };
  }
}

import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import TrackOrderComponent from '~/components/TrackOrder/TrackOrder';

const TrackOrderRoute = () => {
  const { order, error } = useLoaderData<typeof loader>();
  const orderNotFound = !order && !error;
  const orderErrored = !order && error;

  if (orderNotFound) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <CustomBreadCrumb items={[{ name: 'Track Order', href: '/track-order' }]} />
        </div>
        <TrackOrderComponent />
      </div>
    );
  }

  if (orderErrored) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-full text-left self-start">
          <CustomBreadCrumb items={[{ name: 'Track Order', href: '/track-order' }]} />
        </div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
          <span>No Order Found</span>
        </h2>
        <p className="text-lg text-gray-700">
          The order with the Id you provided doesn't exist.
        </p>
      </div>
    );
  }

  const selectedOrder = order;

  if (!selectedOrder) {
    return null;
  }

  const getOrderProgress = (state: string) => {
    const stages = [
      'PaymentAuthorized',
      'PaymentSettled',
      'Shipped',
      'Delivered',
    ];
    const currentIndex = stages.indexOf(state);
    return currentIndex >= 0 ? currentIndex + 1 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-4 sm:gap-6">
      <div className="w-full text-left self-start">
        <CustomBreadCrumb items={[{ name: 'Track Order', href: '/track-order' }]} />
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg border border-gray-200 p-4 sm:p-8">
        <div className="relative mb-8 sm:mb-12">
          {/* Background Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 hidden sm:block"></div>

          {/* Progress Line */}
          <div
            className="absolute top-6 left-0 h-1 bg-[#2D1B69] transition-all duration-500 hidden sm:block"
            style={{
              width: `${(getOrderProgress(selectedOrder.state) / 4) * 100}%`,
            }}
          ></div>

          {/* Steps */}
          <div className="relative flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
            {/* Order Placed */}
            <div className="flex items-center sm:flex-col gap-3 sm:gap-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getOrderProgress(selectedOrder.state) >= 1
                  ? 'bg-[#2D1B69]'
                  : 'bg-gray-200'
                  }`}
              >
                {getOrderProgress(selectedOrder.state) >= 1 ? (
                  <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                )}
              </div>
              <span
                className={`text-sm font-medium sm:mt-3 ${getOrderProgress(selectedOrder.state) >= 1
                  ? 'text-gray-900'
                  : 'text-gray-400'
                  }`}
              >
                Order Placed
              </span>
            </div>

            {/* Packaging */}
            <div className="flex items-center sm:flex-col gap-3 sm:gap-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getOrderProgress(selectedOrder.state) >= 2
                  ? 'bg-[#2D1B69]'
                  : 'bg-gray-200'
                  }`}
              >
                <PackageIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${getOrderProgress(selectedOrder.state) >= 2
                    ? 'text-white'
                    : 'text-gray-400'
                    }`}
                />
              </div>
              <span
                className={`text-sm font-medium sm:mt-3 ${getOrderProgress(selectedOrder.state) >= 2
                  ? 'text-gray-900'
                  : 'text-gray-400'
                  }`}
              >
                Packaging
              </span>
            </div>

            {/* On The Road */}
            <div className="flex items-center sm:flex-col gap-3 sm:gap-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getOrderProgress(selectedOrder.state) >= 3
                  ? 'bg-[#2D1B69]'
                  : 'bg-gray-200'
                  }`}
              >
                <TruckIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${getOrderProgress(selectedOrder.state) >= 3
                    ? 'text-white'
                    : 'text-gray-400'
                    }`}
                />
              </div>
              <span
                className={`text-sm font-medium sm:mt-3 ${getOrderProgress(selectedOrder.state) >= 3
                  ? 'text-gray-900'
                  : 'text-gray-400'
                  }`}
              >
                On The Road
              </span>
            </div>

            {/* Delivered */}
            <div className="flex items-center sm:flex-col gap-3 sm:gap-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getOrderProgress(selectedOrder.state) >= 4
                  ? 'bg-[#2D1B69]'
                  : 'bg-gray-200'
                  }`}
              >
                <HandRaisedIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${getOrderProgress(selectedOrder.state) >= 4
                    ? 'text-white'
                    : 'text-gray-400'
                    }`}
                />
              </div>
              <span
                className={`text-sm font-medium sm:mt-3 ${getOrderProgress(selectedOrder.state) >= 4
                  ? 'text-gray-900'
                  : 'text-gray-400'
                  }`}
              >
                Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                #{selectedOrder.code}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {selectedOrder.lines.reduce(
                  (sum, line) => sum + line.quantity,
                  0,
                )}{' '}
                Products • Order Placed in{' '}
                {new Date(selectedOrder.orderPlacedAt).toLocaleDateString(
                  undefined,
                  {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  },
                )}{' '}
                at{' '}
                {new Date(selectedOrder.orderPlacedAt).toLocaleTimeString(
                  undefined,
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </p>
              {selectedOrder.customFields?.estimatedDeliveryDate && (
                <p className="text-xs sm:text-sm text-gray-600">
                  Order expected arrival{' '}
                  {new Date(
                    selectedOrder.customFields.estimatedDeliveryDate,
                  ).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-[#2D1B69]">
                <DynamicPrice priceWithTax={selectedOrder.totalWithTax} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Product ({selectedOrder.lines.length.toString().padStart(2, '0')})
        </h3>

        {/* Products Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-5">Products</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-3 text-right">Subtotal</div>
        </div>

        {/* Products List */}
        <div className="space-y-4 mt-4">
          {selectedOrder.lines.map((line) => (
            <div
              key={line.id}
              className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 md:items-center pb-4 border-b border-gray-200 md:border-0 last:border-0"
            >
              {/* Mobile & Desktop Product Info */}
              <div className="md:col-span-5 flex gap-3 sm:gap-4">
                {line.featuredAsset && (
                  <img
                    src={line.featuredAsset.preview}
                    alt={line.productVariant.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border border-gray-200 flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#F15A27] font-medium uppercase mb-1">
                    {line.productVariant.product.slug.split('-')[0]}
                  </p>
                  <p className="text-sm font-medium text-gray-900 break-words">
                    {line.productVariant.name}
                  </p>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex justify-between text-sm">
                <div className="flex gap-4">
                  <div>
                    <span className="text-gray-500 text-xs">Price:</span>
                    <div className="text-gray-900 font-medium">
                      <DynamicPrice priceWithTax={line.unitPriceWithTax} />
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Qty:</span>
                    <div className="text-gray-900 font-medium">
                      x{line.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs block">Subtotal:</span>
                  <div className="text-gray-900 font-semibold">
                    <DynamicPrice priceWithTax={line.linePriceWithTax} />
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block md:col-span-2 text-sm text-gray-900">
                <DynamicPrice priceWithTax={line.unitPriceWithTax} />
              </div>

              <div className="hidden md:block md:col-span-2 text-sm text-gray-900">
                x{line.quantity}
              </div>

              <div className="hidden md:block md:col-span-3 text-right text-sm font-medium text-gray-900">
                <DynamicPrice priceWithTax={line.linePriceWithTax} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderRoute;
