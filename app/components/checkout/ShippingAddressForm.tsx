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
  buildStreetLine2,
  isValleyCity,
  RingRoad,
  splitStreetLine2,
  validateRecipient,
} from '~/utils/nepal-checkout';
import {
  REQUIRED_SHIPPING_ADDRESS_FIELDS,
  RecipientShippingFormSchema,
} from '~/utils/validation';
import { FieldsetInput } from '../account/FieldsetInput';
import { FieldsetSelect } from '../account/FieldSetSelect';
import { Button } from '../ui/button';
import { RecipientDetails, RecipientDetailsInForm } from './RecipientDetails';
import { ShippingAddressSelector } from './ShippingAddressSelector';

interface Props {
  addresses: NonNullable<
    ActiveCustomerAddressesQuery['activeCustomer']
  >['addresses'];
  availableCountries: AvailableCountriesQuery['availableCountries'];
  activeOrder?: OrderDetailFragment;
  deliveryAreas: Province[];
}
/** Pickup orders store the text 'default' in the address. It is not a real name or phone number. */
const realValue = (value: string | null | undefined) =>
  value && value !== 'default' ? value : '';

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

  const initialStreetLine2 = splitStreetLine2(
    realValue(shippingAddress?.streetLine2),
  );
  const [ringRoad, setRingRoad] = useState<RingRoad | undefined>(
    initialStreetLine2.ringRoad,
  );
  const [landmark, setLandmark] = useState(initialStreetLine2.landmark);
  const [note, setNote] = useState('');
  const [localErrors, setLocalErrors] = useState<{
    ringRoad?: string;
    recipient?: string;
  }>({});

  // The first saved address is selected without a click, so load its Ring Road answer once.
  useEffect(() => {
    const first = splitStreetLine2(addresses?.[selectedAddressIndex]?.streetLine2);
    if (addresses && addresses.length > 0) {
      setRingRoad(first.ringRoad);
      setLandmark(first.landmark);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  /** Sends one address to the server, with the Ring Road, landmark and gift note chosen above. */
  const submitRecipientAddress = (address: {
    fullName?: string | null;
    company?: string | null;
    streetLine1?: string | null;
    city?: string | null;
    province?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    phoneNumber?: string | null;
  }) => {
    const problems = validateRecipient({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      city: address.city,
      ringRoad,
    });
    if (problems.fullName || problems.phoneNumber) {
      setLocalErrors({
        recipient:
          "This address needs the recipient's name and a Nepal phone number. Enter the address manually to fix it.",
      });
      return;
    }
    if (problems.ringRoad) {
      setLocalErrors({ ringRoad: problems.ringRoad });
      return;
    }
    setLocalErrors({});

    const formData = new FormData();
    formData.append('action', 'setCheckoutShipping');
    formData.append('fullName', address.fullName ?? '');
    formData.append('company', address.company ?? '');
    formData.append('streetLine1', address.streetLine1 ?? '');
    formData.append('city', address.city ?? '');
    formData.append('province', address.province ?? '');
    formData.append('postalCode', address.postalCode ?? '');
    formData.append('countryCode', address.countryCode ?? '');
    formData.append('phoneNumber', address.phoneNumber ?? '');
    formData.append('ringRoad', isValleyCity(address.city) ? ringRoad ?? '' : '');
    formData.append('landmark', landmark);
    formData.append('recipientNote', note);

    fetcher.submit(formData, {
      method: 'post',
      action: '/api/active-order',
    });
  };

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index);
    const picked = splitStreetLine2(addresses?.[index]?.streetLine2);
    setRingRoad(picked.ringRoad);
    setLandmark(picked.landmark);
    setLocalErrors({});
  };

  const handleSubmitSelectedAddress = () => {
    const selectedAddress = addresses?.[selectedAddressIndex];
    if (!selectedAddress) return;
    submitRecipientAddress({
      ...selectedAddress,
      countryCode: selectedAddress.country.code,
    });
  };

  const submitSameShippingAsBilling = () => {
    if (!billingAddress) return;
    submitRecipientAddress(billingAddress);
  };

  const shouldShowAdressSelector =
    addresses && addresses?.length > 0 && !willAddSeparateShippingAddress;

  const SelectorUi = (
    <div className="relative">
      <ShippingAddressSelector
        addresses={addresses!}
        onChange={handleSelectAddress}
        selectedAddressIndex={selectedAddressIndex}
      />
      <div className="mt-4">
        <RecipientDetails
          isValley={isValleyCity(addresses?.[selectedAddressIndex]?.city)}
          ringRoad={ringRoad}
          onRingRoadChange={setRingRoad}
          landmark={landmark}
          onLandmarkChange={setLandmark}
          note={note}
          onNoteChange={setNote}
          errors={{ ringRoad: localErrors.ringRoad }}
        />
      </div>
      {localErrors.recipient || fetcher.data?.errorMessage ? (
        <p className="mt-3 italic text-red-500">
          {localErrors.recipient ?? fetcher.data?.errorMessage}
        </p>
      ) : null}
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
      validator={withZod(RecipientShippingFormSchema)}
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
        label="Recipient's full name"
        autoComplete="shipping name"
        defaultValue={realValue(shippingAddress?.fullName)}
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('fullName')}
      />

      <FieldsetInput
        className="bg-transparent"
        name="company"
        label="Company"
        defaultValue={realValue(shippingAddress?.company)}
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
        label="Recipient's phone in Nepal"
        type="tel"
        placeholder="98XXXXXXXX"
        autoComplete="tel"
        defaultValue={realValue(shippingAddress?.phoneNumber)}
        required={REQUIRED_SHIPPING_ADDRESS_FIELDS.includes('phoneNumber')}
      />

      <RecipientDetailsInForm
        isValley={isValleyCity(city)}
        ringRoad={ringRoad}
        onRingRoadChange={setRingRoad}
        landmark={landmark}
        onLandmarkChange={setLandmark}
        note={note}
        onNoteChange={setNote}
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
    <div className="space-y-3">
      <RecipientDetails
        isValley={isValleyCity(billingAddress?.city)}
        ringRoad={ringRoad}
        onRingRoadChange={setRingRoad}
        landmark={landmark}
        onLandmarkChange={setLandmark}
        note={note}
        onNoteChange={setNote}
        errors={{ ringRoad: localErrors.ringRoad }}
      />
      {localErrors.recipient || fetcher.data?.errorMessage ? (
        <p className="italic text-red-500">
          {localErrors.recipient ?? fetcher.data?.errorMessage}
        </p>
      ) : null}
      <Button
        className="my-3 col-span-2 w-full"
        disabled={isSubmitting}
        type="button"
        onClick={submitSameShippingAsBilling}
      >
        Proceed To Payment
        {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
      </Button>
    </div>
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
          The recipient is the billing contact (I am in Nepal)
        </label>
      </div>
      {finalUiToDisplay}
    </div>
  );
}
