import { useActiveOrder } from '~/utils/use-active-order';
import { CreateAddressInput, OrderDetailFragment } from '~/generated/graphql';

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;

export const CHECKOUT_STEPS = {
  CUSTOMER: 'customer',
  BILLING: 'billing',
  ADDRESS: 'address',
  SHIPPING: 'shipping',
} as const;

export type StepTypes = (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];

export type ActiveOrderFetcherReturnType = {
  activeOrder: OrderDetailFragment;
  errorMessage: string;
};

export interface Area {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface City {
  id: string;
  name: string;
  areas: Area[];
}

export interface Province {
  id: string;
  name: string;
  cities: City[];
}
