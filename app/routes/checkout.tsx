import {
  Outlet,
  ShouldRevalidateFunction,
  useLocation,
  useOutletContext,
  useLoaderData,
  useFetcher,
} from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { CircleAlert, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CheckOutCartSelectedIcon from '~/assets/icons/Checkout/CheckOutCartSelectedIcon';
import CheckOutPaymentDisabled from '~/assets/icons/Checkout/CheckOutPaymentDisabled';
import CheckOutPaymentSelectedIcon from '~/assets/icons/Checkout/CheckOutPaymentSelectedIcon';
import CheckOutTruckNotSelectedIcon from '~/assets/icons/Checkout/CheckOutTruckNotSelectedIcon';
import CheckOutTruckSelectedIcon from '~/assets/icons/Checkout/CheckOutTruckSelectedIcon';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { OrderDetailFragment } from '~/generated/graphql';
import { getActiveCustomer } from '~/providers/customer/customer';
import { getLoaylityCouponCodes } from '~/providers/orders/order';
import { getTechcoinTrasnsactions } from '~/providers/tech-coins/TechCoins';
import { OutletContext } from '~/types';
import { classNames } from '~/utils/class-names';
import type { RedeemTechCoinsResponse } from './api.redeem-tech-coins';
const steps = ['shipping', 'payment', 'confirmation'];

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl,
}) => {
  if (
    currentUrl.pathname === '/checkout' &&
    nextUrl.pathname === '/checkout/payment'
  ) {
    return true;
  }
  return false;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { activeCustomer } = await getActiveCustomer({ request });
  let loyaltyCouponCodes: string[] = [];
  if (activeCustomer) {
    try {
      const couponCodes = await getLoaylityCouponCodes({ request });
      loyaltyCouponCodes = (couponCodes || []).filter(
        (code): code is string => typeof code === 'string',
      );
    } catch (error) {
      console.error('Loader error (loyalty coupons):', error);
    }
  }

  return json({
    loyaltyCouponCodes,
    activeCustomer,
  });
}

export default function Checkout() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const outletContext = useOutletContext<OutletContext>();
  const { activeOrderFetcher, activeOrder, adjustOrderLine, removeItem } =
    outletContext;
  const techCoinsFetcher = useFetcher<RedeemTechCoinsResponse>();
  const location = useLocation();
  const { t } = useTranslation();
  const [couponCode, setCouponCode] = useState('');
  const [techCoinsInput, setTechCoinsInput] = useState('');
  const [techCoinsError, setTechCoinsError] = useState<string | null>(null);
  const [isLoyaltyApplied, setIsLoyaltyApplied] = useState(false);

  const hasCouponApplied =
    (activeOrder?.couponCodes && activeOrder.couponCodes.length > 0) || false;

  const hasLoyaltySurcharge = (activeOrder?.surcharges || []).some((s) =>
    (s.description || '').toLowerCase().includes('loyalty'),
  );

  useEffect(() => {
    setIsLoyaltyApplied(hasLoyaltySurcharge);
  }, [hasLoyaltySurcharge, activeOrderFetcher, techCoinsFetcher]);

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
    setCouponCode('');
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

  useEffect(() => {
    const data = techCoinsFetcher.data as
      | { errorMessage?: string | null }
      | undefined;

    if (data?.errorMessage) {
      setTechCoinsError(data.errorMessage);
      const timeout = setTimeout(() => {
        setTechCoinsError(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [techCoinsFetcher.data]);

  const redeemTechCoins = () => {
    setTechCoinsError(null);

    if (!activeCustomer) {
      setTechCoinsError('You must be logged in to use TechCoins.');
      return;
    }

    if (!activeOrder) {
      setTechCoinsError('No active order found.');
      return;
    }

    if (hasCouponApplied) {
      setTechCoinsError('Remove applied coupons before using TechCoins.');
      return;
    }

    const value = Number(techCoinsInput);
    if (!Number.isFinite(value) || value <= 0) {
      setTechCoinsError('Enter a valid number of TechCoins.');
      return;
    }
    if (value % 50 !== 0) {
      setTechCoinsError('You can only use TechCoins in multiples of 50.');
      return;
    }

    techCoinsFetcher.submit(
      {
        action: 'redeemTechCoins',
        coins: value.toString(),
        orderId: activeOrder.id,
      },
      {
        method: 'post',
        action: '/api/redeem-tech-coins',
      },
    );
  };

  const removeTechCoins = () => {
    setTechCoinsError(null);
    if (!activeOrder) {
      setTechCoinsError('No active order found.');
      return;
    }
    techCoinsFetcher.submit(
      {
        action: 'revertTechCoinRedemption',
        orderId: activeOrder.id,
      },
      {
        method: 'post',
        action: '/api/redeem-tech-coins',
      },
    );
  };

  let state = 'shipping';
  if (location.pathname === '/checkout/payment') {
    state = 'payment';
  } else if (location.pathname.startsWith('/checkout/confirmation')) {
    state = 'confirmation';
  }
  let isConfirmationPage = state === 'confirmation';

  return (
    <>
      <div className="bg-white">
        <div className={classNames('container pb-4')}>
          <div className="mt-4">
            <CustomBreadCrumb
              items={
                state === 'shipping'
                  ? [{ name: 'Checkout', href: '/checkout' }]
                  : state === 'payment'
                  ? [
                      { name: 'Checkout', href: '/checkout' },
                      { name: 'Payment', href: '/checkout/payment' },
                    ]
                  : [
                      { name: 'Checkout', href: '/checkout' },
                      { name: 'Payment', href: '/checkout/payment' },
                      { name: 'Confirmation', href: '#' },
                    ]
              }
            />
          </div>
          <h2 className="sr-only">{t('cart.checkout')}</h2>
          {isConfirmationPage ? null : (
            <div className="flex items-center justify-center py-[58px] w-full">
              <div className="flex flex-col gap-2 items-center">
                <CheckOutCartSelectedIcon />
                <p className="text-[#8596D8] text-[12px]">Cart</p>
              </div>
              <div className="w-[112px] border border-[#8596D8] self-start mt-9" />
              <div className="flex flex-col gap-2 items-center">
                {state === 'payment' ? (
                  <CheckOutTruckSelectedIcon />
                ) : (
                  <CheckOutTruckNotSelectedIcon />
                )}
                <p
                  className={classNames(
                    'text-[12px]',
                    state === 'payment' ? 'text-[#253574]' : 'text-[#8596D8]',
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
                {state === 'payment' ? (
                  <CheckOutPaymentSelectedIcon />
                ) : (
                  <CheckOutPaymentDisabled />
                )}
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
          )}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            {/* Left side: Forms */}
            <div className={isConfirmationPage ? 'lg:col-span-2' : ''}>
              <Outlet context={outletContext} />
            </div>

            {/* Right side: Order summary + Coupons */}
            {!isConfirmationPage && (
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {t('order.summary')}
                </h2>

                <CartContents
                  orderLines={activeOrder?.lines ?? []}
                  currencyCode={activeOrder?.currencyCode!}
                  editable={state === 'shipping'}
                  removeItem={removeItem}
                  adjustOrderLine={adjustOrderLine}
                />

                <CartTotals order={activeOrder as OrderDetailFragment} />

                {state === 'payment' && (
                  <>
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
                        disabled={isLoyaltyApplied}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />

                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={isLoyaltyApplied}
                        className="mt-3 w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-[#1a2654] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Apply Coupon
                      </button>

                      <div>
                        {activeOrder?.couponCodes &&
                          activeOrder.couponCodes.length > 0 && (
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
                                    <span className="text-gray-900">
                                      {code}
                                    </span>
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

                    {/* TechCoins */}
                    <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-primary" />
                        Tech Coins
                      </h3>

                      {!activeCustomer ? (
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                          <CircleAlert className="w-4 h-4 mt-0.5 text-amber-500" />
                          <p>
                            You need to sign in to use Tech Coins.{' '}
                            <a
                              href="/sign-in"
                              className="text-primary underline underline-offset-2"
                            >
                              Log in
                            </a>{' '}
                            to earn and redeem rewards.
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-gray-700 mb-3">
                            You have{' '}
                            <span className="font-semibold">
                              {activeCustomer.availableLoyaltyPoints}
                            </span>{' '}
                            Tech Coins available. You can redeem them in
                            multiples of 50.
                          </p>

                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={0}
                              step={50}
                              value={techCoinsInput}
                              onChange={(e) =>
                                setTechCoinsInput(e.target.value)
                              }
                              placeholder="Enter Tech Coins to use"
                              disabled={hasCouponApplied || isLoyaltyApplied}
                              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                              type="button"
                              onClick={redeemTechCoins}
                              disabled={hasCouponApplied || isLoyaltyApplied}
                              className="py-2.5 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-[#1a2654] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              Apply Tech Coins
                            </button>
                          </div>

                          {hasCouponApplied && (
                            <p className="mt-2 text-xs text-amber-600">
                              Tech Coins are disabled because a coupon code is
                              applied. Remove the coupon to use Tech Coins.
                            </p>
                          )}

                          {isLoyaltyApplied && !hasCouponApplied && (
                            <p className="mt-2 text-xs text-emerald-700">
                              Tech Coins have been applied to this order. To add
                              or remove Items please remove the Tech Coins.
                            </p>
                          )}

                          {techCoinsError && (
                            <p className="mt-2 text-xs text-red-600">
                              {techCoinsError}
                            </p>
                          )}

                          {isLoyaltyApplied && (
                            <button
                              type="button"
                              onClick={removeTechCoins}
                              className="mt-3 inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <span className="mr-1">×</span>
                              Remove Tech Coins
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
