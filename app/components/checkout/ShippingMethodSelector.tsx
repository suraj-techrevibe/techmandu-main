import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import {
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/generated/graphql';
import { classNames } from '~/utils/class-names';
import { DynamicPrice } from '../products/DynamicPrice';

export function ShippingMethodSelector({
  eligibleShippingMethods,
  shippingMethodId,
  onChange,
}: {
  eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
  shippingMethodId: string | undefined;
  onChange: (
    selectedMethod: EligibleShippingMethodsQuery['eligibleShippingMethods'][0],
  ) => void; // Updated type
  currencyCode?: CurrencyCode;
}) {
  const { t } = useTranslation();

  // Find the current selected method object
  const selectedMethod = eligibleShippingMethods.find(
    (method) => method.id === shippingMethodId,
  );

  return (
    <RadioGroup value={selectedMethod} onChange={onChange}>
      <RadioGroup.Label className="text-lg font-medium text-gray-900 mb-4">
        {t('checkout.deliveryMethod')}
      </RadioGroup.Label>

      <div className="flex flex-col">
        {eligibleShippingMethods.map((shippingMethod) => (
          <RadioGroup.Option
            key={shippingMethod.id}
            value={shippingMethod}
            className={({ checked }) =>
              classNames(
                'relative p-4 flex items-center cursor-pointer transition-all',
              )
            }
          >
            {({ checked }) => (
              <div className="flex items-center justify-start gap-5">
                <div className="flex items-center gap-3 flex-1 min-w-[14rem]">
                  <div
                    className={classNames(
                      'w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0',

                      checked ? 'border-primary bg-primary' : 'border-gray-300',
                    )}
                  >
                    {checked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  <RadioGroup.Label
                    as="span"
                    className="text-base font-normal text-gray-900"
                  >
                    {shippingMethod.name}
                  </RadioGroup.Label>
                </div>

                <RadioGroup.Description
                  as="span"
                  className="text-sm font-normal text-[#000000] border-[#8e8e8e80] border-[0.2px] p-[5px] rounded-[5px]"
                >
                  <DynamicPrice priceWithTax={shippingMethod.priceWithTax} />
                </RadioGroup.Description>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
