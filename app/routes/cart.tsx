import { Link, useOutletContext } from '@remix-run/react'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import CheckOutCartDisabledIcon from '~/assets/icons/Checkout/CheckOutCartDisabled'
import CheckOutPaymentDisabled from '~/assets/icons/Checkout/CheckOutPaymentDisabled'
import CheckOutTruckDisabled from '~/assets/icons/Checkout/CheckOutTruckDisabled'
import { CartLineItem } from '~/components/cart/CartLineItem'
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb'
import { DynamicPrice } from '~/components/products/DynamicPrice'
import { OutletContext } from '~/types'
import { classNames } from '~/utils/class-names'

const cart = () => {
    const outletContext = useOutletContext<OutletContext>();
    const { activeOrderFetcher, activeOrder, } = outletContext;
    const isEmpty = !activeOrder || activeOrder.lines.length === 0;
    const isLoading = activeOrderFetcher?.state !== 'idle' && activeOrderFetcher?.state !== undefined;
    let state = 'cart'

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

    return (
        <div className="container mx-auto px-4 mt-2">
            <CustomBreadCrumb items={[{ name: 'My Cart', href: '/cart' }]} />

            {/* Top indicator component */}
            <div className="flex items-center justify-center py-[58px] w-full">
                <div className="flex flex-col gap-2 items-center">
                    {/* {state === 'cart' ? ( */}
                    <CheckOutCartDisabledIcon />
                    <p
                        className={classNames(
                            'text-[12px]',
                            state === 'cart' ? 'text-[#253574]' : 'text-[#8596D8]',
                        )}
                    >
                        Cart
                    </p>
                    {/* <CheckOutCartDisabledIcon />
                    <p className="text-[#8596D8] text-[12px]">Cart</p> */}
                </div>
                <div className="w-[112px] border border-[#8596D8] self-start mt-9" />
                <div className="flex flex-col gap-2 items-center">

                    <CheckOutTruckDisabled />

                    <p
                        className={classNames(
                            'text-[12px]',
                            state === 'checkout' ? 'text-[#253574]' : 'text-[#8596D8]',
                        )}
                    >
                        Checkout
                    </p>
                </div>
                <div
                    className={classNames(
                        'w-[112px] border self-start mt-9',
                        state === 'payment' ? 'border-[#8596D8]' : 'border-[#9E9E9E]',
                    )}
                />
                <div className="flex flex-col gap-2 items-center">
                    <CheckOutPaymentDisabled />
                    <p
                        className={classNames(
                            'text-[12px]',
                            state === 'payment' ? 'text-[#253574]' : 'text-[#9E9E9E]',
                        )}
                    >
                        Payment
                    </p>
                </div>
            </div>

            {/* bottom information component  */}
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
                <div className='flex items-start relative justify-center gap-6 flex-col md:flex-row mb-10'>
                    {/* cart Items and buttons */}
                    <div>
                        <div className="space-y-6">
                            {/* Cart Items - Component is used here. */}
                            <div className="space-y-4">
                                {activeOrder?.lines.map((line) => (
                                    <CartLineItem
                                        key={line.id}
                                        line={line}
                                        isLoading={isLoading}
                                        removeItem={outletContext.removeItem}
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
                        </div>
                    </div>

                    {/* price information and coupon code section  */}
                    <div className="grid grid-cols-1 gap-6">
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
            )
            }

        </div>
    )
}

export default cart