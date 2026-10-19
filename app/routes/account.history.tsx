import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  HandRaisedIcon,
  TruckIcon
} from '@heroicons/react/24/solid';
import { useLoaderData, useNavigation, useSubmit } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { PackageIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { OrderPagination } from '~/components/account/OrderPagination';
import { OrderStateBadge } from '~/components/account/OrderStateBadge';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { OrderListOptions, SortOrder } from '~/generated/graphql';
import { getActiveCustomerOrderList } from '~/providers/customer/customer';
import {
  paginationValidationSchema,
  translatePaginationFrom,
  translatePaginationTo,
} from '~/utils/pagination';

const paginationLimitMinimumDefault = 10;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  20,
  30,
]);
const orderPaginationSchema = paginationValidationSchema(
  allowedPaginationLimits,
);

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ?? paginationLimitMinimumDefault;
  const page = url.searchParams.get('page') ?? 1;

  const zodResult = orderPaginationSchema.safeParse({ limit, page });
  if (!zodResult.success) {
    url.search = '';
    return redirect(url.href);
  }

  const orderListOptions: OrderListOptions = {
    take: zodResult.data.limit,
    skip: (zodResult.data.page - 1) * zodResult.data.limit,
    sort: { createdAt: SortOrder.Desc },
    filter: { active: { eq: false } },
  };

  const res = await getActiveCustomerOrderList(orderListOptions, { request });
  if (!res.activeCustomer) {
    return redirect('/sign-in');
  }
  return json({
    orderList: res.activeCustomer.orders,
    appliedPaginationLimit: zodResult.data.limit,
    appliedPaginationPage: zodResult.data.page,
  });
}

export default function AccountHistory() {
  const { orderList, appliedPaginationLimit, appliedPaginationPage } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedOrder, setSelectedOrder] = useState<typeof orderList.items[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const showingOrdersFrom = translatePaginationFrom(
    appliedPaginationPage,
    appliedPaginationLimit,
  );
  const showingOrdersTo = translatePaginationTo(
    appliedPaginationPage,
    appliedPaginationLimit,
    orderList.items.length,
  );

  const handleViewDetails = (order: typeof orderList.items[0]) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const getOrderProgress = (state: string) => {
    const stages = ['PaymentAuthorized', 'PaymentSettled', 'Shipped', 'Delivered'];
    const currentIndex = stages.indexOf(state);
    return currentIndex >= 0 ? currentIndex + 1 : 0;
  };

  return (
    <div className="space-y-6">
      {!showDetails ? (
        // Order List View
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Order History</h3>

          {/* Loading Overlay */}
          {navigation.state !== 'idle' && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {orderList.items.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {orderList.totalItems === 0
                  ? t('order.historyEmpty')
                  : t('order.historyEnd')}
              </div>
            </div>
          )}

          {orderList.items.length > 0 && (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.items.map((order) => (
                      <tr
                        key={order.code}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        {/* Order ID */}
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                          #{order.code}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <OrderStateBadge state={order.state} />
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.orderPlacedAt
                            ? new Date(order.orderPlacedAt).toLocaleDateString(undefined, {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                            : '--'}
                        </td>

                        {/* Total */}
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                          <DynamicPrice priceWithTax={order.totalWithTax} />
                          <span className="text-gray-500 ml-1">
                            ({order.lines.reduce((sum, line) => sum + line.quantity, 0)} Products)
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#F15A27] hover:text-[#d14a1f] transition-colors"
                          >
                            View Details
                            <ArrowRightIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <span className="text-sm text-gray-600">
                  Showing orders {showingOrdersFrom} to {showingOrdersTo} of{' '}
                  {orderList.totalItems}
                </span>

                <ValidatedForm
                  validator={withZod(paginationValidationSchema(allowedPaginationLimits))}
                  method="get"
                  onChange={(e) => submit(e.currentTarget, { preventScrollReset: true })}
                  preventScrollReset
                >
                  <OrderPagination
                    appliedPaginationLimit={appliedPaginationLimit}
                    totalItems={orderList.totalItems}
                    appliedPaginationPage={appliedPaginationPage}
                  />
                </ValidatedForm>
              </div>
            </>
          )}
        </div>
      ) : selectedOrder ? (
        // Order Details View
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToList}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowRightIcon className="w-5 h-5 text-gray-600 rotate-180" />
              </button>
              <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
            </div>

            <button className="text-[#F15A27] font-medium text-sm hover:text-[#d14a1f] transition-colors">
              Leave a Rating +
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="relative mb-12">
                {/* Background Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200"></div>

                {/* Progress Line */}
                <div
                  className="absolute top-6 left-0 h-1 bg-[#2D1B69] transition-all duration-500"
                  style={{ width: `${(getOrderProgress(selectedOrder.state) / 4) * 100}%` }}
                ></div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {/* Order Placed */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getOrderProgress(selectedOrder.state) >= 1 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                      {getOrderProgress(selectedOrder.state) >= 1 ? (
                        <CheckCircleIcon className="w-6 h-6 text-white" />
                      ) : (
                        <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <span className={`mt-3 text-sm font-medium ${getOrderProgress(selectedOrder.state) >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Order Placed
                    </span>
                  </div>

                  {/* Packaging */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getOrderProgress(selectedOrder.state) >= 2 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                      <PackageIcon className={`w-6 h-6 ${getOrderProgress(selectedOrder.state) >= 2 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`mt-3 text-sm font-medium ${getOrderProgress(selectedOrder.state) >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Packaging
                    </span>
                  </div>

                  {/* On The Road */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getOrderProgress(selectedOrder.state) >= 3 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                      <TruckIcon className={`w-6 h-6 ${getOrderProgress(selectedOrder.state) >= 3 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`mt-3 text-sm font-medium ${getOrderProgress(selectedOrder.state) >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                      On The Road
                    </span>
                  </div>

                  {/* Delivered */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getOrderProgress(selectedOrder.state) >= 4 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                      <HandRaisedIcon className={`w-6 h-6 ${getOrderProgress(selectedOrder.state) >= 4 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`mt-3 text-sm font-medium ${getOrderProgress(selectedOrder.state) >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Delivered
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">#{selectedOrder.code}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedOrder.lines.reduce((sum, line) => sum + line.quantity, 0)} Products • Order Placed in{' '}
                      {new Date(selectedOrder.orderPlacedAt).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      at{' '}
                      {new Date(selectedOrder.orderPlacedAt).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {selectedOrder.customFields?.estimatedDeliveryDate && (
                      <p className="text-sm text-gray-600">
                        Order expected arrival{' '}
                        {new Date(selectedOrder.customFields.estimatedDeliveryDate).toLocaleDateString(
                          undefined,
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#2D1B69]">
                      <DynamicPrice priceWithTax={selectedOrder.totalWithTax} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Product ({selectedOrder.lines.length.toString().padStart(2, '0')})</h3>

            {/* Products Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-700">
              <div className="col-span-5">Products</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            {/* Products List */}
            <div className="space-y-4 mt-4">
              {selectedOrder.lines.map((line) => (
                <div key={line.id} className="grid grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-5 flex gap-4">
                    {line.featuredAsset && (
                      <img
                        src={line.featuredAsset.preview}
                        alt={line.productVariant.name}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                    )}
                    <div>
                      <p className="text-xs text-[#F15A27] font-medium uppercase mb-1">
                        {line.productVariant.product.slug.split('-')[0]}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {line.productVariant.name}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-sm text-gray-900">
                    <DynamicPrice priceWithTax={line.unitPriceWithTax} />
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 text-sm text-gray-900">
                    x{line.quantity}
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-3 text-right text-sm font-medium text-gray-900">
                    <DynamicPrice priceWithTax={line.linePriceWithTax} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing and Shipping Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing Address */}
            {selectedOrder.billingAddress && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                <div className="space-y-2 text-sm">
                  {selectedOrder.billingAddress.fullName && (
                    <p className="font-semibold text-gray-900">{selectedOrder.billingAddress.fullName}</p>
                  )}
                  <p className="text-gray-600">
                    {selectedOrder.billingAddress.streetLine1}
                    {selectedOrder.billingAddress.streetLine2 && `, ${selectedOrder.billingAddress.streetLine2}`}
                  </p>
                  {(selectedOrder.billingAddress.city ||
                    selectedOrder.billingAddress.province ||
                    selectedOrder.billingAddress.postalCode) && (
                      <p className="text-gray-600">
                        {[
                          selectedOrder.billingAddress.city,
                          selectedOrder.billingAddress.province,
                          selectedOrder.billingAddress.postalCode,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  {selectedOrder.billingAddress.phoneNumber && (
                    <p className="text-gray-600">Phone Number: {selectedOrder.billingAddress.phoneNumber}</p>
                  )}
                  {selectedOrder.customer?.emailAddress && (
                    <p className="text-gray-600">Email: {selectedOrder.customer.emailAddress}</p>
                  )}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {selectedOrder.shippingAddress && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-2 text-sm">
                  {selectedOrder.shippingAddress.fullName && (
                    <p className="font-semibold text-gray-900">{selectedOrder.shippingAddress.fullName}</p>
                  )}
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.streetLine1}
                    {selectedOrder.shippingAddress.streetLine2 && `, ${selectedOrder.shippingAddress.streetLine2}`}
                  </p>
                  {(selectedOrder.shippingAddress.city ||
                    selectedOrder.shippingAddress.province ||
                    selectedOrder.shippingAddress.postalCode) && (
                      <p className="text-gray-600">
                        {[
                          selectedOrder.shippingAddress.city,
                          selectedOrder.shippingAddress.province,
                          selectedOrder.shippingAddress.postalCode,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  {selectedOrder.shippingAddress.phoneNumber && (
                    <p className="text-gray-600">Phone Number: {selectedOrder.shippingAddress.phoneNumber}</p>
                  )}
                  {selectedOrder.customer?.emailAddress && (
                    <p className="text-gray-600">Email: {selectedOrder.customer.emailAddress}</p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      ) : null}
    </div>
  );
}
