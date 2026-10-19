import gql from 'graphql-tag';
import { OrderListOptions } from '~/generated/graphql';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function getActiveCustomer(options: QueryOptions) {
  return sdk.activeCustomer(undefined, options);
}

export function getActiveCustomerDetails(options: QueryOptions) {
  return sdk.activeCustomerDetails(undefined, options);
}

export function getActiveCustomerAddresses(options: QueryOptions) {
  return sdk.activeCustomerAddresses(undefined, options);
}

export function getActiveCustomerOrderList(
  orderListOptions: OrderListOptions,
  options: QueryOptions,
) {
  return sdk.activeCustomerOrderList({ orderListOptions }, options);
}

gql`
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      availableLoyaltyPoints
      emailAddress
      customFields {
        avatarUrl {
          preview
        }
      }
    }
  }
`;

gql`
  query activeCustomerDetails {
    activeCustomer {
      id
      title
      firstName
      lastName
      phoneNumber
      emailAddress
      customFields {
        avatarUrl {
          preview
        }
      }
    }
  }
`;

gql`
  query activeCustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        company
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          id
          code
          name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
      }
    }
  }
`;

gql`
  query activeCustomerOrderList($orderListOptions: OrderListOptions) {
    activeCustomer {
      orders(options: $orderListOptions) {
        totalItems
        items {
          code
          state
          orderPlacedAt
          currencyCode
          subTotal
          subTotalWithTax
          total
          totalWithTax
          shippingWithTax
          shippingLines {
            priceWithTax
          }
          taxSummary {
            taxBase
            taxTotal
          }
          discounts {
            amountWithTax
          }
          fulfillments {
            trackingCode
          }
          lines {
            id
            unitPriceWithTax
            linePriceWithTax
            quantity
            discountedLinePriceWithTax
            discountedUnitPriceWithTax
            fulfillmentLines {
              quantity
              fulfillment {
                state
                updatedAt
              }
            }
            featuredAsset {
              name
              source
              preview
            }
            productVariant {
              name
              sku
              currencyCode
              priceWithTax
              product {
                slug
              }
            }
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
          customer {
            id
            firstName
            lastName
            emailAddress
          }
          customFields {
            estimatedDeliveryDate
          }
        }
      }
    }
  }
`;
