import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ActiveOrderQuery, CurrencyCode } from '~/generated/graphql';
import { DynamicPrice } from '../products/DynamicPrice';
import { QuantityControl } from './QuantityControl';
import { Trash2 } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from '~/constants';

export function CartContents({
  orderLines,
  editable = true,
  adjustOrderLine,
  removeItem,
}: {
  orderLines: NonNullable<ActiveOrderQuery['activeOrder']>['lines'];
  currencyCode: CurrencyCode;
  editable: boolean;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const { t } = useTranslation();
  const isEditable = editable !== false;

  return (
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {(orderLines ?? []).map((line) => (
          <li key={line.id} className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
              <img
                src={
                  line.featuredAsset?.preview
                    ? line.featuredAsset?.preview + '?preset=thumb'
                    : PLACEHOLDER_IMAGE
                }
                alt={line.productVariant.name}
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div className="ml-4 flex-1 flex flex-col gap-1">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={`/products/${line.productVariant.product.slug}`}>
                      {line.productVariant.name}
                    </Link>
                  </h3>
                </div>
              </div>
              <div>
                x{line.quantity}
              </div>
              <div className="flex-1 flex items-center text-sm gap-2">
                <p className="font-semibold text-md">
                  <DynamicPrice priceWithTax={line.linePriceWithTax} />
                </p>
                <div className="flex">
                  {isEditable && (
                    <button
                      type="button"
                      name="removeItem"
                      value={line.id}
                      className="font-medium text-primary-600 hover:text-primary-500"
                      onClick={() => removeItem && removeItem(line.id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  )}
                </div>
                {isEditable ? (
                  <div className="flex items-center space-x-3">
                    <label htmlFor={`quantity-${line.id}`} className="sr-only">
                      {t('common.quantity')}
                    </label>

                    <QuantityControl
                      quantity={line.quantity}
                      onAdjust={(newQty) =>
                        adjustOrderLine && adjustOrderLine(line.id, newQty)
                      }
                      min={1}
                    />
                  </div>
                ) : (
                  <div className="text-gray-800">
                    <span className="mr-1">{t('common.quantity')}</span>
                    <span className="font-medium">{line.quantity}</span>
                  </div>
                )}

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
