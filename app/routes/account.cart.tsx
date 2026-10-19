
import { Link, useLoaderData, useOutletContext } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CartLineItem } from '~/components/cart/CartLineItem';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { OrderDetailFragment } from '~/generated/graphql';
import { getActiveCustomerDetails } from '~/providers/customer/customer';
import { getActiveOrder } from '~/providers/orders/order';



export async function loader({ request }: DataFunctionArgs) {
    const { activeCustomer } = await getActiveCustomerDetails({ request });
    if (!activeCustomer) {
        return redirect('/sign-in');
    }

    const activeOrder = await getActiveOrder({ request });

    return json({
        activeCustomer,
        activeOrder,
    });
}

export default function AccountCart() {
    const { activeOrder: loaderActiveOrder } = useLoaderData<typeof loader>();
    const { t } = useTranslation();
    const context = useOutletContext<any>();

    // Retrieve shared state/methods from context, falling back to local loader data for SSR
    const activeOrderFetcher = context?.activeOrderFetcher;
    const activeOrder = (context?.activeOrder ?? loaderActiveOrder) as OrderDetailFragment | undefined;
    const adjustOrderLine = context?.adjustOrderLine;
    const removeItem = context?.removeItem;

    const [couponCode, setCouponCode] = useState('');



    // Local adjustOrderLine and removeItem removed in favor of context methods

    const applyCoupon = () => {
        if (couponCode.trim() && activeOrderFetcher) {
            activeOrderFetcher.submit(
                {
                    action: 'applyCouponCode',
                    couponCode: couponCode.trim(),
                },
                {
                    method: 'post',
                    action: '/api/coupon-code',
                },
            );
        }
        setCouponCode('')
    };

    const removeCoupon = (code: string) => {
        if (code.trim() && activeOrderFetcher) {
            activeOrderFetcher.submit(
                {
                    action: 'removeCouponCode',
                    couponCode: code.trim(),
                },
                {
                    method: 'post',
                    action: '/api/coupon-code',
                },
            );
        }
    };

    const isEmpty = !activeOrder || activeOrder.lines.length === 0;
    const isLoading = activeOrderFetcher?.state !== 'idle' && activeOrderFetcher?.state !== undefined;

    return (
        <div className="space-y-6">
            {/* Header account settings  */}
            <h1 className="text-xl font-semibold text-gray-900">
                Shopping Cart {!isEmpty && `(${activeOrder?.totalQuantity} Items)`}
            </h1>

            {isEmpty ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Add items to your cart to see them here
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-[#1a2654] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Return to Shop
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Cart Items - Component is used here. */}
                    <div className="space-y-4">
                        {activeOrder?.lines.map((line) => (
                            <CartLineItem
                                key={line.id}
                                line={line}
                                isLoading={isLoading}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>

                    {/* Action Buttons - Full Width */}
                    <div className="grid">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-primary text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Return to Shop
                        </Link>
                    </div>

                    {/* Bottom Section - Cart Totals & Coupon Code Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Cart Totals */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Card Totals
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sub-total</span>
                                    <span className="font-medium text-gray-900">
                                        <DynamicPrice priceWithTax={activeOrder?.subTotalWithTax} />
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-900">
                                        {activeOrder?.shippingWithTax ? (
                                            <DynamicPrice priceWithTax={activeOrder.shippingWithTax} />
                                        ) : (
                                            'Free'
                                        )}
                                    </span>
                                </div>

                                {activeOrder?.discounts && activeOrder.discounts.length > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="font-medium text-green-600">
                                            <DynamicPrice priceWithTax={Math.abs(activeOrder.discounts[0].amountWithTax)} />
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium text-gray-900">
                                        <DynamicPrice priceWithTax={activeOrder?.totalWithTax! - activeOrder?.subTotalWithTax!} />
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-semibold text-gray-900">Total</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            <DynamicPrice priceWithTax={activeOrder?.totalWithTax} />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="mt-6 block w-full py-3 px-4 bg-primary text-white text-center font-semibold rounded-xl hover:bg-[#1a2654] transition-colors"
                            >
                                Proceed to Check Out
                            </Link>
                        </div>

                        {/* Coupon Code */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Coupon Code
                            </h3>

                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter a Coupon Code"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />

                            <button
                                type="button"
                                onClick={applyCoupon}
                                className="mt-3 w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-[#1a2654] transition-colors"
                            >
                                Apply Coupon
                            </button>

                            <div>
                                {activeOrder?.couponCodes && activeOrder.couponCodes.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-md font-medium text-gray-900 mb-2">
                                            Applied Coupons:
                                        </h4>
                                        <ul className="space-y-2">
                                            {activeOrder.couponCodes.map((code) => (
                                                <li
                                                    key={code}
                                                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                                                >
                                                    <span className="text-gray-900">{code}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCoupon(code)}
                                                        className="text-sm text-red-600 hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
