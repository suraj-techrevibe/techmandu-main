import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import { CreditCardIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import stripeSvg from '~/assets/svgs/payment/stripe.svg';

export const CheckoutForm = ({ orderCode }: { orderCode: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: location.origin + `/checkout/confirmation/${orderCode}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe}
                    className="group bg-white relative flex items-center justify-start w-full min-w-[280px] px-6 py-4  text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-purple-500/20"
      >
                    <div className="flex items-center justify-center w-28 h-12 bg-white rounded-lg mr-3 p-1.5 shadow-sm">
                        <img
                            src={stripeSvg}
                            alt="Khalti logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
      </button>
    </form>
  );
};
