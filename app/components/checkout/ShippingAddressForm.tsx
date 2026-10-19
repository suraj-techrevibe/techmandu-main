import {
  ArrowLeftIcon,
  ArrowPathIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useFetcher, useNavigate } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useMemo, useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import {
  ActiveCustomerAddressesQuery,
  AvailableCountriesQuery,
  OrderDetailFragment,
} from '~/generated/graphql';
import { ActiveOrderFetcherReturnType, Province } from '~/types';
import {
  REQUIRED_SHIPPING_ADDRESS_FIELDS,
  ShippingAdressFormSchema,
} from '~/utils/validation';
import { FieldsetInput } from '../account/FieldsetInput';
import { FieldsetSelect } from '../account/FieldSetSelect';
import { Button } from '../ui/button';
import { ShippingAddressSelector } from './ShippingAddressSelector';

interface Props {
  addresses: NonNullable<
    ActiveCustomerAddressesQuery['activeCustomer']
  >['addresses'];
  availableCountries: AvailableCountriesQuery['availableCountries'];
  activeOrder?: OrderDetailFragment;
  deliveryAreas: Province[];
}
export function ShippingAddressForm({
  addresses,
  availableCountries,
  activeOrder,
  deliveryAreas,
}: Props) {
  const shippingAddress = activeOrder?.shippingAddress;

  const billingAddress = activeOrder?.billingAddress;

  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(() => {
    if (shippingAddress && addresses) {
      const matchedIndex = addresses.findIndex(
        (a) =>
          a.fullName === shippingAddress.fullName &&
          a.country.code === shippingAddress.countryCode &&
          a.city === shippingAddress.city &&
          a.streetLine1 &&
          shippingAddress.streetLine1,
      );
      return Math.max(matchedIndex, 0);
    }
    return 0;
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [willAddSeparateShippingAddress, setWillAddSeparateShippingAddress] =
    useState(false);

  const [province, setProvince] = useState<string | undefined>(
    shippingAddress?.province ?? '',
  );
  const [city, setCity] = useState<string | undefined>(
    shippingAddress?.city ?? '',
  );
  const [area, setArea] = useState<string | undefined>(
    shippingAddress?.streetLine1 ?? '',
  );

  const cities = useMemo(() => {
    if (!province) return [];
    const selectedProvince = deliveryAreas.find(
      (area) => area.name === province,
    );
    return selectedProvince?.cities;
  }, [province]);

  const areas = useMemo(() => {
    if (!city || !cities) return [];
    const selectedCityObject = cities.find((c) => c.name === city);
    return selectedCityObject?.areas ?? [];
  }, [city]);

  useEffect(() => {
    if (shippingAddress?.province) {
      setProvince(shippingAddress?.province ?? '');
    }
    if (shippingAddress?.city) {
      setCity(shippingAddress?.city ?? '');
    }
    if (shippingAddress?.streetLine1) {
      setArea(shippingAddress?.streetLine1 ?? '');
    }
  }, [shippingAddress]);

  const fetcher = useFetcher<ActiveOrderFetcherReturnType>();
  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.errorMessage) {
      navigate('/checkout/payment');
    }
  }, [fetcher.data]);

  const handleSubmitSelectedAddress = () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses?.[selectedAddressIndex];
      if (selectedAddress) {
        const formData = new FormData();
        formData.append('action', 'setCheckoutShipping');
        formData.append('countryCode', selectedAddress.country.code);
        Object.keys(selectedAddress).forEach((key) => {
          formData.append(key, (selectedAddress as any)[key]);
        });

        fetcher.submit(formData, {
          method: 'post',
          action: '/api/active-order',
        });
      }
    }
  };

  const submitSameShippingAsBilling = () => {
    if (!billingAddress) return;
    const formData = new FormData();
    formData.append('action', 'setCheckoutShipping');
    Object.keys(billingAddress).forEach((key) => {
      formData.append(key, (billingAddress as any)[key]);
    });

    fetcher.submit(formData, {
      method: 'post',
      action: '/api/active-order',
    });
  };

  const shouldShowAdressSelector =
    addresses && addresses?.length > 0 && !willAddSeparateShippingAddress;

  const SelectorUi = (
    <div className="relative">
      <ShippingAddressSelector
        addresses={addresses!}
        onChange={setSelectedAddressIndex}
        selectedAddressIndex={selectedAddressIndex}
      />
      <Button
        className="my-3 col-span-2 w-5/6"
        disabled={isSubmitting}
        onClick={handleSubmitSelectedAddress}
      >
        Proceed To Payment
        {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
      </Button>
      <Button
        className="absolute right-0 bottom-2.5 !rounded-full aspect-square w-fit !p-0"
        title="Enter address manually"
        onClick={() => setWillAddSeparateShippingAddress(true)}
      >
        <PencilIcon className="size-4" />
      </Button>
    </div>
  );

  const ShippingForm = (
    <ValidatedForm
      validator={withZod(ShippingAdressFormSchema)}
      className="relative sm:grid sm:grid-cols-2 gap-3"
      fetcher={fetcher}
      method="post"
      action="/api/active-order"
    >
      {addresses && addresses?.length > 0 ? (
        <Button
          className="col-span-2 w-fit bg-primary border border-primary-500 hover:!bg-primary-100"
          onClick={() => setWillAddSeparateShippingAddress(false)}
        >
          <ArrowLeftIcon className="size-4 text-primary-500" />
        </Button>
      ) : null}
      <input type="hidden" name="action" value="setCheckoutShipping" />
      <FieldsetInput
        className="bg-transparent"
        name="fullName"
        label="Full Name"
        autoComplete="shipping name"
        defaultValue={
          shippingAddress?.fullName ||
          `${activeOrder?.customer?.firstName} ${activeOrder?.customer?.lastName}` ||
          ''
        }
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('fullName')}
      />

      <FieldsetInput
        className="bg-transparent"
        name="company"
        label="Company"
        defaultValue={shippingAddress?.company ?? ''}
        autoComplete="organization"
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('company')}
      />

      <FieldsetSelect
        name="countryCode"
        label="Country"
        defaultValue={
          shippingAddress?.countryCode ?? availableCountries[0].code
        }
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('countryCode')}
      >
        {availableCountries?.map((c) => (
          <option value={c.code} key={c.id}>
            {c.name}
          </option>
        ))}
      </FieldsetSelect>

      <FieldsetSelect
        name="province"
        label="Province"
        value={province}
        onChange={(e) => {
          setProvince(e.target.value);
          setCity(undefined);
          setArea(undefined);
        }}
        placeholder="Select Province"
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('province')}
      >
        {deliveryAreas?.map((province) => (
          <option key={province.id} value={province.name}>
            {province.name}
          </option>
        ))}
      </FieldsetSelect>

      <FieldsetSelect
        name="city"
        label="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setArea(undefined);
        }}
        placeholder="Select City"
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('city')}
      >
        {cities?.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </FieldsetSelect>

      <FieldsetSelect
        name="streetLine1"
        label="Address/Area"
        placeholder="Select Your Area"
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('streetLine1')}
        value={area}
        onChange={(e) => {
          setArea(e.target.value);
        }}
      >
        {areas?.map((area) => (
          <option value={area.id} key={area.id}>
            {area.name}
          </option>
        ))}
      </FieldsetSelect>

      <FieldsetInput
        className="bg-transparent"
        name="phoneNumber"
        label="Phone Number"
        autoComplete="tel"
        defaultValue={shippingAddress?.phoneNumber ?? ''}
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('phoneNumber')}
      />

      {fetcher?.data?.errorMessage ? (
        <p className="italic text-red-500">{fetcher?.data?.errorMessage}</p>
      ) : null}

      <Button className="my-3 col-span-2" disabled={isSubmitting}>
        Proceed To Payment
        {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
      </Button>
    </ValidatedForm>
  );

  const uiForSameAsBilling = (
    <Button
      className="my-3 col-span-2 w-full"
      disabled={isSubmitting}
      type="button"
      onClick={submitSameShippingAsBilling}
    >
      Proceed To Payment
      {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
    </Button>
  );

  const finalUiToDisplay = sameAsBilling
    ? uiForSameAsBilling
    : shouldShowAdressSelector
    ? SelectorUi
    : ShippingForm;

  return (
    <div>
      <div className="flex items-center gap-3 p-3 rounded-lg border border-primary hover:bg-primary/5 mb-3">
        <input
          id="sameAsBilling"
          type="checkbox"
          checked={sameAsBilling}
          onChange={(e) => setSameAsBilling(e.target.checked)}
          className="rounded-full accent-primar text-primary"
        />
        <label
          htmlFor="sameAsBilling"
          className="w-full cursor-pointer text-primary"
        >
          Same as billing address
        </label>
      </div>
      {finalUiToDisplay}
    </div>
  );
}
