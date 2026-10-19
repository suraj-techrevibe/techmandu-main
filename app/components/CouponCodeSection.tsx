import {
  CheckCircleIcon,
  TagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useOutletContext } from '@remix-run/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GetLoaylityCouponCodesQuery } from '~/generated/graphql';
import { OutletContext } from '~/types';

interface CouponCodeSectionProps {
  loyaltyCouponCodes: GetLoaylityCouponCodesQuery['loyaltyCouponCodes'];
}

export const CouponCodeSection: React.FC<CouponCodeSectionProps> = ({
  loyaltyCouponCodes,
}) => {
  const outletContext = useOutletContext<OutletContext>();
  const { activeOrderFetcher } = outletContext;
  const { t } = useTranslation();
  const appliedCoupons = outletContext.activeOrder?.couponCodes || [];

  const handleCouponAction = (
    couponCode: string,
    action: 'applyCouponCode' | 'removeCouponCode',
  ) => {
    activeOrderFetcher.submit(
      { action, couponCode },
      { method: 'POST', action: '/api/coupon-code' },
    );
  };

  const isCouponApplied = (couponCode: string) =>
    appliedCoupons.includes(couponCode);
  const isLoading = activeOrderFetcher.state === 'submitting';

  if (!loyaltyCouponCodes?.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center mb-4">
        <TagIcon className="w-5 h-5 text-primary mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('checkout.coupons', 'Coupon Codes')}
        </h3>
      </div>

      {/* Loyalty Coupon Codes */}

      <div>
        {appliedCoupons.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Applied Loyalty Coupons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() =>
                  handleCouponAction(appliedCoupons[0], 'removeCouponCode')
                }
                disabled={isLoading}
                className={`
                    relative flex items-center justify-between p-3 rounded-lg border transition-all
                                            bg-green-50 border-green-200 text-green-800
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
              >
                <div className="flex items-center">
                  <span className="font-mono text-sm font-medium">
                    {appliedCoupons[0]}
                  </span>

                  <CheckCircleIcon className="w-4 h-4 text-green-600 ml-2" />
                </div>
                <XMarkIcon className="w-4 h-4 text-green-600" />
                {isLoading && (
                  <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Available Loyalty Coupons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {loyaltyCouponCodes?.map((couponCode) => {
                if (!couponCode) return null;
                const isApplied = isCouponApplied(couponCode);
                return (
                  <button
                    key={couponCode}
                    onClick={() =>
                      handleCouponAction(
                        couponCode,
                        isApplied ? 'removeCouponCode' : 'applyCouponCode',
                      )
                    }
                    disabled={isLoading}
                    className={`
                    relative flex items-center justify-between p-3 rounded-lg border transition-all
                    ${
                      isApplied
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  >
                    <div className="flex items-center">
                      <span className="font-mono text-sm font-medium">
                        {couponCode}
                      </span>
                      {isApplied && (
                        <CheckCircleIcon className="w-4 h-4 text-green-600 ml-2" />
                      )}
                    </div>

                    {isApplied && (
                      <XMarkIcon className="w-4 h-4 text-green-600" />
                    )}

                    {isLoading && (
                      <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
