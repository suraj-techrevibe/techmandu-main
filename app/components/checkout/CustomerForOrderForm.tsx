import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useFetcher, useSearchParams } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import {
  ActiveCustomerAddressesQuery,
  OrderDetailFragment,
} from '~/generated/graphql';
import { ActiveOrderFetcherReturnType, CHECKOUT_STEPS } from '~/types';
import { CustomerForOrderSchema } from '~/utils/validation';
import { ValidatedInput as Input } from '../Input';
import { Button } from '../ui/button';
import { FieldsetInput } from '../account/FieldsetInput';

interface Props {
  activeOrder: OrderDetailFragment;
  activeCustomer: ActiveCustomerAddressesQuery['activeCustomer'];
}

export function CustomerForOrderForm({ activeOrder }: Props) {
  const [_, setSearchParams] = useSearchParams();
  const fetcher = useFetcher<ActiveOrderFetcherReturnType>();

  const customer = activeOrder?.customer;
  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.errorMessage) {
      setSearchParams(
        { step: CHECKOUT_STEPS.BILLING },
        { preventScrollReset: true },
      );
    }
  }, [fetcher.data]);

  return (
    <ValidatedForm
      validator={withZod(CustomerForOrderSchema)}
      method="post"
      action="/api/active-order"
      fetcher={fetcher}
    >
      <input type="hidden" name="action" value="setOrderCustomer" />
      <div className="sm:grid sm:grid-cols-2 gap-3">
        <div className="col-span-2">
          <FieldsetInput
            name="emailAddress"
            label="Email Address"
            autoComplete="email"
            type="email"
            defaultValue={customer?.emailAddress}
            className="bg-transparent"
          />
        </div>

        <FieldsetInput
          name="firstName"
          label="First Name"
          autoComplete="given-name"
          defaultValue={customer?.firstName}
          required
          className="bg-transparent"
        />

        <FieldsetInput
          name="lastName"
          label="Last Name"
          autoComplete="family-name"
          defaultValue={customer?.lastName}
          required
          className="bg-transparent"
        />
      </div>
      {fetcher.data?.errorMessage && (
        <p className="italic text-red-500">{fetcher?.data?.errorMessage}</p>
      )}
      <Button className="my-3 w-full text-center" disabled={isSubmitting}>
        Next
        {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
      </Button>
    </ValidatedForm>
  );
}
