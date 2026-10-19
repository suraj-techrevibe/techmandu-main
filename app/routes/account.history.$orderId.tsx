import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
    CheckCircleIcon,
    DocumentTextIcon,
    HandRaisedIcon,
    TruckIcon
} from '@heroicons/react/24/solid';
import { Link, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { PackageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { OrderAddress } from '~/generated/graphql';
import { getOrderByCode } from '~/providers/orders/order';

export async function loader({ request, params }: DataFunctionArgs) {
    const { orderId } = params;

    if (!orderId) {
        return redirect('/account/history');
    }

    try {
        const order = await getOrderByCode(orderId, { request });

        if (!order) {
            return redirect('/account/history');
        }

        return json({ order });
    } catch (error) {
        return redirect('/account/history');
    }
}

export default function OrderDetails() {
    const { order: _order } = useLoaderData<typeof loader>();
    const order = _order as typeof _order & { billingAddress?: OrderAddress | null };
    const { t } = useTranslation();

    const getOrderProgress = (state: string) => {
        const stages = ['PaymentAuthorized', 'PaymentSettled', 'Shipped', 'Delivered'];
        const currentIndex = stages.indexOf(state);
        return currentIndex >= 0 ? currentIndex + 1 : 0;
    };

    const progress = getOrderProgress(order.state);
    const totalProducts = order.lines.reduce((sum: number, line) => sum + line.quantity, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    <Link
                        to="/account/history"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                    </Link>
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
                            style={{ width: `${(progress / 4) * 100}%` }}
                        ></div>

                        {/* Steps */}
                        <div className="relative flex justify-between">
                            {/* Order Placed */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${progress >= 1 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                                    {progress >= 1 ? (
                                        <CheckCircleIcon className="w-6 h-6 text-white" />
                                    ) : (
                                        <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <span className={`mt-3 text-sm font-medium ${progress >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    Order Placed
                                </span>
                            </div>

                            {/* Packaging */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${progress >= 2 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                                    <PackageIcon className={`w-6 h-6 ${progress >= 2 ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-medium ${progress >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    Packaging
                                </span>
                            </div>

                            {/* On The Road */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${progress >= 3 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                                    <TruckIcon className={`w-6 h-6 ${progress >= 3 ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-medium ${progress >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    On The Road
                                </span>
                            </div>

                            {/* Delivered */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${progress >= 4 ? 'bg-[#2D1B69]' : 'bg-gray-200'}`}>
                                    <HandRaisedIcon className={`w-6 h-6 ${progress >= 4 ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-medium ${progress >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">#{order.code}</h2>
                                <p className="text-sm text-gray-600 mb-1">
                                    {totalProducts} Products • Order Placed in{' '}
                                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}{' '}
                                    at{' '}
                                    {new Date(order.createdAt).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                                {order.customFields?.estimatedDeliveryDate && (
                                    <p className="text-sm text-gray-600">
                                        Order expected arrival{' '}
                                        {new Date(order.customFields.estimatedDeliveryDate).toLocaleDateString(
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
                                    <DynamicPrice priceWithTax={order.totalWithTax} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Products Table Header */}
                <div className="bg-gray-100 rounded-lg p-4 grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 mb-4">
                    <div className="col-span-6">Products</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Products List */}
                <div className="space-y-6">
                    {order.lines.map((line) => (
                        <div key={line.id}>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                {/* Product Info */}
                                <div className="col-span-6 flex gap-4">
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
                                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                            {line.productVariant.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="col-span-2 text-sm text-gray-900 text-center font-medium">
                                    <DynamicPrice priceWithTax={line.unitPriceWithTax} />
                                </div>

                                {/* Quantity */}
                                <div className="col-span-2 text-sm text-[#2D1B69] font-bold text-center">
                                    x{line.quantity}
                                </div>

                                {/* Subtotal */}
                                <div className="col-span-2 text-right text-sm font-bold text-gray-900">
                                    <DynamicPrice priceWithTax={line.linePriceWithTax} />
                                </div>
                            </div>
                            <div className="border-b border-gray-100 mt-6"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing and Shipping Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Billing Address */}
                {/* Billing Address */}
                {order.billingAddress && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                        <div className="space-y-2 text-sm">
                            {order.billingAddress.fullName && (
                                <p className="font-semibold text-gray-900">{order.billingAddress.fullName}</p>
                            )}
                            <p className="text-gray-600">
                                {order.billingAddress.streetLine1}
                                {order.billingAddress.streetLine2 && `, ${order.billingAddress.streetLine2}`}
                            </p>
                            {(order.billingAddress.city ||
                                order.billingAddress.province ||
                                order.billingAddress.postalCode) && (
                                    <p className="text-gray-600">
                                        {[
                                            order.billingAddress.city,
                                            order.billingAddress.province,
                                            order.billingAddress.postalCode,
                                        ]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                )}
                            {order.billingAddress.phoneNumber && (
                                <p className="text-gray-600">Phone Number: {order.billingAddress.phoneNumber}</p>
                            )}
                            {order.customer?.emailAddress && (
                                <p className="text-gray-600">Email: {order.customer.emailAddress}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Shipping Address */}
                {order.shippingAddress && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                        <div className="space-y-2 text-sm">
                            {order.shippingAddress.fullName && (
                                <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                            )}
                            <p className="text-gray-600">
                                {order.shippingAddress.streetLine1}
                                {order.shippingAddress.streetLine2 && `, ${order.shippingAddress.streetLine2}`}
                            </p>
                            {(order.shippingAddress.city ||
                                order.shippingAddress.province ||
                                order.shippingAddress.postalCode) && (
                                    <p className="text-gray-600">
                                        {[
                                            order.shippingAddress.city,
                                            order.shippingAddress.province,
                                            order.shippingAddress.postalCode,
                                        ]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                )}
                            {order.shippingAddress.phoneNumber && (
                                <p className="text-gray-600">Phone Number: {order.shippingAddress.phoneNumber}</p>
                            )}
                            {order.customer?.emailAddress && (
                                <p className="text-gray-600">Email: {order.customer.emailAddress}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
