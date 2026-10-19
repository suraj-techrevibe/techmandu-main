import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { RefObject, useEffect, useState, useMemo } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { Address, AvailableCountriesQuery } from '~/generated/graphql';
import { Select } from '~/components/Select';
import { useTranslation } from 'react-i18next';
import { Province } from '~/types';
import { classNames } from '~/utils/class-names';
import { FieldsetInput } from './FieldsetInput';
import { FieldsetSelect } from './FieldSetSelect';

export const validator = withZod(
  z.object({
    fullName: z.string().min(1, { message: 'Name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    countryCode: z.string().min(1, { message: 'Country is required' }),
    postalCode: z.string().optional(),
    province: z.string().min(1, { message: 'Province is required' }),
    streetLine1: z.string().min(1, { message: 'Area is required' }),
    streetLine2: z.string().optional(),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    company: z.string().optional(),
    vat: z.string().optional(),
  }),
);

export default function CustomerAddressForm({
  address,
  formRef,
  submit,
  availableCountries,
  deliveryAreas,
}: {
  address?: Address;
  formRef: RefObject<HTMLFormElement>;
  submit: () => void;
  availableCountries: AvailableCountriesQuery['availableCountries'];
  deliveryAreas: Province[];
}) {
  const { t } = useTranslation();

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
  }, [province, deliveryAreas]);

  const areas = useMemo(() => {
    if (!city || !cities) return [];
    const selectedCityObject = cities.find((c) => c.name === city);
    return selectedCityObject?.areas ?? [];
  }, [city, cities]);

  useEffect(() => {
    if (address?.province) {
      setProvince(address.province);
    }
    if (address?.city) {
      setCity(address.city);
    }
    if (address?.streetLine1) {
      setArea(address.streetLine1);
    }
  }, [address]);

  if (!deliveryAreas) {
    return <p>Delivery areas are not available</p>;
  }

  return (
    <ValidatedForm
      id="editAddressForm"
      validator={validator}
      formRef={formRef}
      method="post"
      onSubmit={submit}
      defaultValues={{
        fullName: address?.fullName || undefined,
        city: address?.city || undefined,
        streetLine1: address?.streetLine1 || undefined,
        streetLine2: address?.streetLine2 || undefined,
        countryCode: address?.country?.code || undefined,
        postalCode: address?.postalCode || undefined,
        phone: address?.phoneNumber || undefined,
        company: address?.company || undefined,
        province: address?.province || undefined,
        vat: address?.customFields?.vat || undefined,
      }}
    >
      <input type="hidden" name="intent" value="updateAddress" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 my-8">
        <div className="md:col-span-2">
          <FieldsetInput
            label={t('account.fullName')}
            name="fullName"
            required
            autoComplete="full-name"
            defaultValue={address?.fullName || ''}
          />
        </div>

        <FieldsetSelect
          name="countryCode"
          autoComplete="country"
          placeholder={t('address.selectCountry')}
          required
          label="Country"
        >
          {availableCountries?.map((country) => (
            <option key={country.id} value={country.code}>
              {country.name}
            </option>
          ))}
        </FieldsetSelect>

        <FieldsetSelect
          label="Province"
          name="province"
          id="province"
          onChange={(e) => {
            setProvince(e.target.value);
            setCity(undefined);
            setArea(undefined);
          }}
          value={province}
          placeholder="Select Province"
          required
        >
          <option value="">Select Province</option>
          {deliveryAreas.map((province) => (
            <option
              key={`province-${province.id}`}
              value={province.name}
              className="bg-primary/10 active:bg-primary"
            >
              {province.name}
            </option>
          ))}
        </FieldsetSelect>

        <FieldsetSelect
          label="City"
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
            setArea(undefined);
          }}
          value={city}
          placeholder="Select City"
          required
        >
          {cities?.map((city) => (
            <option
              key={`city-${city.id}`}
              value={city.name}
              className="bg-primary/10 active:bg-primary"
            >
              {city.name}
            </option>
          ))}
        </FieldsetSelect>

        <FieldsetSelect
          label="Area"
          name="streetLine1"
          id="streetLine1"
          onChange={(e) => setArea(e.target.value)}
          value={area}
          placeholder="Select Area"
          required
        >
          {areas?.map((area) => (
            <option
              key={`area-${area.id}`}
              value={area.name}
              className="bg-primary/10 active:bg-primary"
            >
              {area.name}
            </option>
          ))}
        </FieldsetSelect>

        <FieldsetInput
          label={t('address.postalCode')}
          name="postalCode"
          autoComplete="postal-code"
          defaultValue={address?.postalCode || ''}
        />

        <FieldsetInput
          label={t('address.phoneNumber')}
          name="phone"
          required
          autoComplete="phone"
          defaultValue={address?.phoneNumber || ''}
        />
        <input type="submit" hidden />
      </div>
    </ValidatedForm>
  );
}
