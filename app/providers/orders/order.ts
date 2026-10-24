import gql from 'graphql-tag';
import { DELIVERY_ADDRESSES_ENDPOINT } from '~/constants';
import { CreateAddressInput, CreateCustomerInput } from '~/generated/graphql';
import { Province } from '~/types';
import { QueryOptions, sdk } from '../../graphqlWrapper';

export function getActiveOrder(options: QueryOptions) {
  return sdk
    .activeOrder(undefined, options)
    .then(({ activeOrder }) => activeOrder);
}

export async function getDeliveryAreas(): Promise<Province[]> {
  return fetch(DELIVERY_ADDRESSES_ENDPOINT).then((res) => res.json());
}

export function getOrderByCode(code: string, options: QueryOptions) {
  return sdk
    .orderByCode({ code }, options)
    .then(({ orderByCode }) => orderByCode);
}

export function addItemToOrder(
  productVariantId: string,
  quantity: number,
  options: QueryOptions,
) {
  return sdk.addItemToOrder(
    {
      productVariantId,
      quantity,
    },
    options,
  );
}

export function removeOrderLine(lineId: string, options: QueryOptions) {
  return sdk.removeOrderLine({ orderLineId: lineId }, options);
}

export function adjustOrderLine(
  lineId: string,
  quantity: number,
  options: QueryOptions,
) {
  return sdk.adjustOrderLine({ orderLineId: lineId, quantity }, options);
}

export function setCustomerForOrder(
  input: CreateCustomerInput,
  options: QueryOptions,
) {
  return sdk.setCustomerForOrder({ input }, options);
}

export function setOrderShippingAddress(
  input: CreateAddressInput,
  options: QueryOptions,
) {
  return sdk.setOrderShippingAddress({ input }, options);
}

export function setOrderShippingMethod(
  shippingMethodId: string,
  options: QueryOptions,
) {
  return sdk.setOrderShippingMethod({ shippingMethodId }, options);
}

export function setOrderBillingAddress(
  input: CreateAddressInput,
  options: QueryOptions,
) {
  return sdk.setOrderBillingAddress({ input }, options);
}

export function applyCouponCode(couponCode: string, options: QueryOptions) {
  return sdk.ApplyCoupon({ couponCode }, options);
}

export function removeCouponCode(couponCode: string, options: QueryOptions) {
  return sdk.removeCouponCode({ couponCode }, options);
}

export function getLoaylityCouponCodes(options: QueryOptions) {
  try {
    return sdk
      .GetLoaylityCouponCodes(undefined, options)
      .then((res) => res.loyaltyCouponCodes);
  } catch {
    return [];
  }
}

export function getTrackMyOrder(
  orderCode: string,
  email: string,
  options: QueryOptions,
) {
  return sdk.TrackMyOrder({ orderCode, email }, options);
}

/**
 * Saves the "who is this gift for" note on the order (custom field orderNotes).
 * Reuses the setPickUpDateTime mutation, which is a plain setOrderCustomFields call, so no codegen is needed.
 */
export function setOrderNotes(note: string, options: QueryOptions) {
  return sdk.setPickUpDateTime(
    { input: { customFields: { orderNotes: note } } },
    options,
  );
}

export function setPickUpDateTime(input: string, options: QueryOptions) {
  return sdk.setPickUpDateTime(
    {
      input: {
        customFields: {
          pickupTime: input,
        },
      },
    },
    options,
  );
}

gql`
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
gql`
  mutation setOrderShippingMethod($shippingMethodId: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation setOrderBillingAddress($input: CreateAddressInput!) {
    setOrderBillingAddress(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation addPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation removeOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  fragment OrderDetail on Order {
    __typename
    id
    code
    active
    createdAt
    state
    currencyCode
    totalQuantity
    subTotal
    subTotalWithTax
    couponCodes
    discounts {
      description
      amountWithTax
    }
    surcharges {
      id
      description
      priceWithTax
    }
    taxSummary {
      description
      taxRate
      taxTotal
    }
    shippingWithTax
    totalWithTax
    customer {
      id
      firstName
      lastName
      emailAddress
    }
    shippingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    shippingLines {
      shippingMethod {
        id
        name
      }
      priceWithTax
    }
    lines {
      id
      unitPriceWithTax
      linePriceWithTax
      quantity
      featuredAsset {
        id
        preview
      }
      productVariant {
        id
        name
        price
        customFields {
          audPrice
          nprPrice
          usdPrice
        }
        product {
          id
          slug
        }
      }
    }
    payments {
      id
      state
      method
      amount
      metadata
    }

    billingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    customFields {
      estimatedDeliveryDate
      pickupTime
    }
  }
`;

gql`
  query activeOrder {
    activeOrder {
      ...OrderDetail
    }
  }
`;

gql`
  query orderByCode($code: String!) {
    orderByCode(code: $code) {
      ...OrderDetail
      orderPlacedAt
    }
  }
`;

gql`
  mutation ApplyCoupon($couponCode: String!) {
    applyCouponCode(couponCode: $couponCode) {
      ... on Order {
        id
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation removeCouponCode($couponCode: String!) {
    removeCouponCode(couponCode: $couponCode) {
      ...OrderDetail
    }
  }
`;

gql`
  query GetLoaylityCouponCodes {
    loyaltyCouponCodes
  }
`;

gql`
  query TrackMyOrder($orderCode: String!, $email: String!) {
    trackOrder(orderCode: $orderCode, email: $email) {
      id
      state
      code
      orderPlacedAt
      currencyCode
      totalWithTax
      lines {
        id
        featuredAsset {
          preview
        }
        productVariant {
          name
          priceWithTax
          product {
            slug
          }
        }
        quantity
        unitPriceWithTax
        linePriceWithTax
      }
      subTotal
      customFields {
        estimatedDeliveryDate
      }
    }
  }
`;

gql`
  mutation setPickUpDateTime($input: UpdateOrderInput!) {
    setOrderCustomFields(input: $input) {
      __typename
      ... on Order {
        ...OrderDetail
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
