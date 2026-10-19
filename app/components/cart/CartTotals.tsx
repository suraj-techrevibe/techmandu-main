import { Price } from '~/components/products/Price';
import { OrderDetailFragment } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';
import { DynamicPrice } from '../products/DynamicPrice';

export function CartTotals({ order }: { order?: OrderDetailFragment | null }) {
  const { t } = useTranslation();

  return (
    <dl className="border-t mt-6 border-gray-200 py-6 space-y-6">
      {order?.discounts?.length && order.discounts.length > 0
        ?
        (<div className="flex items-center justify-between">
          <dt className="text-sm">Coupon Discount</dt>
          <dd className="text-sm font-medium text-gray-900">
            <DynamicPrice
              priceWithTax={Math.abs(order?.discounts[0]?.amountWithTax) ?? 0}
            ></DynamicPrice>
          </dd>
        </div>)
        : null
      }
      <div className="flex items-center justify-between">
        <dt className="text-sm">{t('common.subtotal')}</dt>
        <dd className="text-sm font-medium text-gray-900">
          <DynamicPrice
            priceWithTax={order?.subTotalWithTax}
          ></DynamicPrice>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm">{t('common.shipping')}</dt>
        <dd className="text-sm font-medium text-gray-900">
          <DynamicPrice
            priceWithTax={order?.shippingWithTax ?? 0}
          ></DynamicPrice>
        </dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base font-medium">{t('common.total')}</dt>
        <dd className="text-base font-medium text-gray-900">
          <DynamicPrice
            priceWithTax={order?.totalWithTax}
          ></DynamicPrice>
        </dd>
      </div>
    </dl>
  );
}
