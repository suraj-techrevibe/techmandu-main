import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  Link,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSearchParams,
} from '@remix-run/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/server-runtime';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { CheckoutStepWrapper } from '~/components/checkout/CheckoutStepsWrapper';
import { CustomerForBillingForm } from '~/components/checkout/CustomerForBillingForm';
import { CustomerForOrderForm } from '~/components/checkout/CustomerForOrderForm';
import { ShippingAddressForm } from '~/components/checkout/ShippingAddressForm';
import { ShippingMethodSelector } from '~/components/checkout/ShippingMethodSelector';
import { DateTimeSelector } from '~/components/DateTimeSelector';
import { Button } from '~/components/ui/button';
import {
  EligibleShippingMethodsQuery,
  OrderDetailFragment,
} from '~/generated/graphql';
import {
  getAvailableCountries,
  getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import {
  getActiveOrder,
  getDeliveryAreas,
  setPickUpDateTime,
} from '~/providers/orders/order';
import { CHECKOUT_STEPS, OutletContext, StepTypes } from '~/types';
import { REQUIRED_SHIPPING_ADDRESS_FIELDS } from '~/utils/validation';

export async function loader({ request }: LoaderFunctionArgs) {
  const availableCountriesPromise = getAvailableCountries({ request });
  const eligibleShippingMethodsPromise = getEligibleShippingMethods({
    request,
  });
  const activeCustomerPromise = getActiveCustomerAddresses({ request });

  const activeOrderPromise = getActiveOrder({ request });

  const deliveryAreasPromise = getDeliveryAreas();

  const [
    activeOrder,
    { availableCountries },
    { eligibleShippingMethods },
    { activeCustomer },
    deliveryAreas,
  ] = await Promise.all([
    activeOrderPromise,
    availableCountriesPromise,
    eligibleShippingMethodsPromise,
    activeCustomerPromise,
    deliveryAreasPromise,
  ]);

  if (!activeOrder) {
    return redirect('/');
  }

  return {
    availableCountries,
    eligibleShippingMethods,
    activeCustomer,
    activeOrder,
    deliveryAreas,
  };
}

export default function CheckoutShipping() {
  const {
    availableCountries,
    eligibleShippingMethods,
    activeOrder,
    activeCustomer,
    deliveryAreas,
  } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const shippingAddress = activeOrder?.shippingAddress;
  const billingAddress = activeOrder?.billingAddress;
  const isSignedIn = Boolean(activeCustomer?.id);

  useEffect(() => {
    if (activeOrder.customFields?.pickupTime) {
      setDate(new Date(activeOrder.customFields?.pickupTime));
    }
  }, [activeOrder.customFields?.pickupTime]);

  function getCurrentStep() {
    const step = searchParams.get('step') as StepTypes;
    if (step) {
      return step;
    }
    if (isSignedIn) {
      return CHECKOUT_STEPS.BILLING;
    }
    return CHECKOUT_STEPS.CUSTOMER;
  }
  const currentStep: StepTypes = getCurrentStep();

  const { activeOrderFetcher } = useOutletContext<OutletContext>();

  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';

  const isCustomerFormComplete = Boolean(activeOrder?.customer);

  const isShippingAddressFormComplete = (() => {
    if (!shippingAddress) {
      return false;
    }

    for (const field of REQUIRED_SHIPPING_ADDRESS_FIELDS) {
      if (!shippingAddress[field]) {
        return false;
      }
    }
    return true;
  })();

  const isBillingAddressFormComplete = (() => {
    if (!billingAddress) {
      return false;
    }

    // REQUIRED_SHIPPING_ADDRESS_FIELDS can be reused as billing address has same fields as shipping address
    for (const field of REQUIRED_SHIPPING_ADDRESS_FIELDS) {
      if (!billingAddress[field]) {
        return false;
      }
    }
    return true;
  })();

  const selectedShippingMethod = activeOrder?.shippingLines[0]?.shippingMethod;

  const isPickupSelected = selectedShippingMethod?.name
    ?.toLocaleLowerCase()
    .includes('pickup');

  const customerInfoSummary = (() => {
    if (activeOrder?.customer) {
      return `${activeOrder?.customer?.firstName} ${activeOrder?.customer?.lastName}`;
    }
    return null;
  })();

  const shippingAddressSummary = (() => {
    const summaryArray: string[] = [];
    if (shippingAddress?.streetLine1) {
      summaryArray.push(shippingAddress?.streetLine1);
    }
    if (shippingAddress?.city) {
      summaryArray.push(shippingAddress?.city);
    }
    if (shippingAddress?.province) {
      summaryArray.push(shippingAddress?.province);
    }
    if (shippingAddress?.countryCode) {
      summaryArray.push(shippingAddress?.countryCode);
    }

    return summaryArray.join(', ');
  })();

  const billingAddressSummary = (() => {
    const summaryArray: string[] = [];
    if (billingAddress?.streetLine1) {
      summaryArray.push(billingAddress?.streetLine1);
    }
    if (billingAddress?.city) {
      summaryArray.push(billingAddress?.city);
    }
    if (billingAddress?.province) {
      summaryArray.push(billingAddress?.province);
    }
    if (billingAddress?.countryCode) {
      summaryArray.push(billingAddress?.countryCode);
    }

    return summaryArray.join(', ');
  })();

  const shippingMethodSummary = (() => {
    if (activeOrder?.shippingLines[0]?.shippingMethod) {
      return activeOrder?.shippingLines[0]?.shippingMethod?.name;
    }
  })();

  const goBackToSpecificStep = (step: StepTypes) => {
    window.location.href = `/checkout?step=${step}`;
  };

  const submitSelectedShippingMethod = (
    shippingMethod: EligibleShippingMethodsQuery['eligibleShippingMethods'][0],
    action?: string,
  ) => {
    activeOrderFetcher.submit(
      {
        action: action || 'setShippingMethod',
        shippingMethodId: shippingMethod?.id,
        pickUpDateTime: date?.toString() ?? '',
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };

  if (activeOrder?.lines.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-3">
      <CheckoutStepWrapper
        index={1}
        title="Customer Information"
        subtitle={customerInfoSummary || ''}
        onClick={() => {
          if (currentStep !== CHECKOUT_STEPS.CUSTOMER && !isSignedIn) {
            goBackToSpecificStep(CHECKOUT_STEPS.CUSTOMER);
          }
        }}
        complete={isCustomerFormComplete}
        disabled={isSignedIn || currentStep === CHECKOUT_STEPS.CUSTOMER}
      >
        {currentStep === CHECKOUT_STEPS.CUSTOMER && !isSignedIn && (
          <CustomerForOrderForm
            activeOrder={activeOrder as OrderDetailFragment}
            activeCustomer={activeCustomer}
          />
        )}
        {isSignedIn && (
          <span className="absolute right-2 bottom-2 px-2 py-1 bg-primary-100 text-primary-500 rounded-lg text-sm border border-primary-300">
            Signed In
          </span>
        )}
      </CheckoutStepWrapper>

      <CheckoutStepWrapper
        index={2}
        title="Billing Address"
        subtitle={billingAddressSummary || ''}
        onClick={() => {
          if (currentStep !== CHECKOUT_STEPS.BILLING) {
            setSearchParams({ step: CHECKOUT_STEPS.BILLING });
          }
        }}
        complete={isBillingAddressFormComplete}
        disabled={
          !isCustomerFormComplete || currentStep === CHECKOUT_STEPS.BILLING
        }
      >
        {currentStep === CHECKOUT_STEPS.BILLING && (
          <CustomerForBillingForm
            activeOrder={activeOrder as OrderDetailFragment}
            availableCountries={availableCountries}
            addresses={activeCustomer?.addresses}
            deliveryAreas={deliveryAreas}
          />
        )}
      </CheckoutStepWrapper>

      <CheckoutStepWrapper
        index={3}
        title="Delivery Method"
        subtitle={shippingMethodSummary || ''}
        onClick={() => {
          if (currentStep !== CHECKOUT_STEPS.SHIPPING) {
            setSearchParams({ step: CHECKOUT_STEPS.SHIPPING });
          }
        }}
        complete={Boolean(selectedShippingMethod)}
        disabled={
          !isBillingAddressFormComplete ||
          currentStep === CHECKOUT_STEPS.SHIPPING
        }
      >
        {currentStep === CHECKOUT_STEPS.SHIPPING && (
          <>
            <ShippingMethodSelector
              eligibleShippingMethods={eligibleShippingMethods}
              currencyCode={activeOrder?.currencyCode}
              shippingMethodId={
                activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''
              }
              onChange={submitSelectedShippingMethod}
            />

            {isPickupSelected && (
              <DateTimeSelector date={date} setDate={setDate} />
            )}

            <Button
              className="mt-3 w-full"
              disabled={!selectedShippingMethod}
              onClick={() => {
                if (!Boolean(selectedShippingMethod)) {
                  return;
                }
                if (isPickupSelected && selectedShippingMethod) {
                  submitSelectedShippingMethod(
                    selectedShippingMethod as EligibleShippingMethodsQuery['eligibleShippingMethods'][0],
                    'setShippingMethodAndCheckout',
                  );
                } else {
                  setSearchParams(
                    { step: CHECKOUT_STEPS.ADDRESS },
                    { preventScrollReset: true },
                  );
                }
              }}
            >
              Proceed
              {isNavigating && (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              )}
            </Button>
          </>
        )}
      </CheckoutStepWrapper>

      <CheckoutStepWrapper
        index={4}
        title="Shipping Address"
        subtitle={shippingAddressSummary || ''}
        onClick={() => {
          if (currentStep !== CHECKOUT_STEPS.ADDRESS) {
            goBackToSpecificStep(CHECKOUT_STEPS.ADDRESS);
          }
        }}
        complete={isShippingAddressFormComplete}
        disabled={
          !Boolean(selectedShippingMethod) ||
          currentStep === CHECKOUT_STEPS.ADDRESS
        }
        hidden={isPickupSelected}
      >
        {currentStep === CHECKOUT_STEPS.ADDRESS && (
          <ShippingAddressForm
            activeOrder={activeOrder as OrderDetailFragment}
            availableCountries={availableCountries}
            addresses={activeCustomer?.addresses}
            deliveryAreas={deliveryAreas}
          />
        )}
      </CheckoutStepWrapper>
    </div>
  );
}
