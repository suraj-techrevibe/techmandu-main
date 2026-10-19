import {
  ArrowLeftIcon,
  ArrowPathIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useFetcher, useNavigate, useSearchParams } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useMemo, useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import {
  ActiveCustomerAddressesQuery,
  AvailableCountriesQuery,
  OrderDetailFragment,
} from '~/generated/graphql';
import {
  ActiveOrderFetcherReturnType,
  CHECKOUT_STEPS,
  Province,
} from '~/types';
import {
  REQUIRED_SHIPPING_ADDRESS_FIELDS,
  ShippingAdressFormSchema,
} from '~/utils/validation';
import { ValidatedInput as Input } from '../Input';
import { Select } from '../Select';
import { ShippingAddressSelector } from './ShippingAddressSelector';
import { Button } from '../ui/button';
import { FieldsetInput } from '../account/FieldsetInput';
import { FieldsetSelect } from '../account/FieldSetSelect';

interface Props {
  addresses: NonNullable<
    ActiveCustomerAddressesQuery['activeCustomer']
  >['addresses'];
  availableCountries: AvailableCountriesQuery['availableCountries'];
  activeOrder?: OrderDetailFragment;
  deliveryAreas: Province[];
}
export function CustomerForBillingForm({
  addresses,
  availableCountries,
  activeOrder,
  deliveryAreas,
}: Props) {
  const address = activeOrder?.billingAddress;

  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(() => {
    if (address && addresses) {
      const matchedIndex = addresses.findIndex(
        (a) =>
          a.fullName === address.fullName &&
          a.country.code === address.countryCode &&
          a.city === address.city &&
          a.streetLine1 &&
          address.streetLine1,
      );
      return Math.max(matchedIndex, 0);
    }
    return 0;
  });

  const [willAddSeparateShippingAddress, setWillAddSeparateShippingAddress] =
    useState(false);

  const [province, setProvince] = useState<string | undefined>(
    address?.province ?? '',
  );
  const [city, setCity] = useState<string | undefined>(address?.city ?? '');
  const [area, setArea] = useState<string | undefined>(
    address?.streetLine1 ?? '',
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
    if (address?.province) {
      setProvince(address?.province ?? '');
    }
    if (address?.city) {
      setCity(address?.city ?? '');
    }
    if (address?.streetLine1) {
      setArea(address?.streetLine1 ?? '');
    }
  }, [address]);

  const [_, setSearchParams] = useSearchParams();

  const fetcher = useFetcher<ActiveOrderFetcherReturnType>();
  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.errorMessage) {
      setSearchParams(
        { step: CHECKOUT_STEPS.SHIPPING },
        { preventScrollReset: true },
      );
    }
  }, [fetcher.data]);

  const handleSubmitSelectedAddress = () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses?.[selectedAddressIndex];
      if (selectedAddress) {
        const formData = new FormData();
        formData.append('action', 'setOrderBillingAddress');
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

  if (addresses && addresses?.length > 0 && !willAddSeparateShippingAddress) {
    return (
      <div className="relative">
        <ShippingAddressSelector
          addresses={addresses}
          onChange={setSelectedAddressIndex}
          selectedAddressIndex={selectedAddressIndex}
        />
        <Button
          className="my-3 col-span-2 w-5/6"
          disabled={isSubmitting}
          onClick={handleSubmitSelectedAddress}
        >
          Proceed To Delivary Method
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
  }

  return (
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
      <input type="hidden" name="action" value="setOrderBillingAddress" />
      <FieldsetInput
        className="bg-transparent"
        name="fullName"
        label="Full Name"
        autoComplete="shipping name"
        defaultValue={
          address?.fullName ||
          `${activeOrder?.customer?.firstName} ${activeOrder?.customer?.lastName}` ||
          ''
        }
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('fullName')}
      />

      <FieldsetInput
        className="bg-transparent"
        name="company"
        label="Company"
        defaultValue={address?.company ?? ''}
        autoComplete="organization"
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('company')}
      />

      <FieldsetSelect
        name="countryCode"
        label="Country"
        defaultValue={address?.countryCode ?? availableCountries[0].code}
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
        defaultValue={address?.phoneNumber ?? ''}
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('phoneNumber')}
      />

      {fetcher?.data?.errorMessage ? (
        <p className="italic text-red-500">{fetcher?.data?.errorMessage}</p>
      ) : null}

      <Button className="my-3 col-span-2" disabled={isSubmitting}>
        Proceed To Delivary Method
        {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
      </Button>
    </ValidatedForm>
  );
}
