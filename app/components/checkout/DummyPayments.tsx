import { CreditCardIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Form } from '@remix-run/react';
import { EligiblePaymentMethodsQuery } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export function DummyPayments({
  paymentMethod,
  paymentError,
}: {
  paymentMethod: EligiblePaymentMethodsQuery['eligiblePaymentMethods'][number];
  paymentError?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {paymentError && (
        <div className="rounded-md bg-red-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {t('checkout.paymentErrorMessage')}
              </h3>
              <div className="mt-2 text-sm text-red-700">{paymentError}</div>
            </div>
          </div>
        </div>
      )}
      <Form method="post">
        <input
          type="hidden"
          name="paymentMethodCode"
          value={paymentMethod.code}
        />
        <button
          type="submit"
          className="group relative bg-white flex items-center justify-start w-full min-w-[280px] px-6 py-4  text-primary font-semibold shadow-lg transition-all duration-300 transform border border-purple-500/20"
        >


          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mr-3 p-1.5 shadow-sm">
            <CreditCardIcon  className="w-full h-full object-contain"></CreditCardIcon>
          </div>

          {/* Payment Text */}
          <span className="text-2xl font-medium transition-colors">
            {paymentMethod.name}
          </span>
        </button>
      </Form>
    </div>
  );
}
