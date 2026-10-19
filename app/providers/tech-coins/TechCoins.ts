import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export async function getTechcoinTrasnsactions(
  customerId: string,
  options: QueryOptions,
) {
  return sdk
    .TechcoinTrasnsactions({ customerId }, options)
    .then((res) => res.techcoinTrasnsactions)
    .catch(() => ({}));
}

export async function reedemTechCoins(
  orderId: string,
  coins: number,
  options: QueryOptions,
) {
  return sdk.ReedemTechCoins({ orderId, coins }, options);
}

export async function revertTechCoinRedemption(
  orderId: string,
  options: QueryOptions,
) {
  return sdk.RevertTechCoinRedemption({ orderId }, options);
}

gql`
  query TechcoinTrasnsactions($customerId: ID!) {
    techcoinTrasnsactions(customerId: $customerId) {
      id
      description
      points
      loyaltyPointsType
      type
      order {
        id
        code
        createdAt
        updatedAt
      }
    }
  }
`;

gql`
  mutation ReedemTechCoins($orderId: ID!, $coins: Int!) {
    reedemTechCoins(orderId: $orderId, coins: $coins) {
      ... on TechCoinsReedemResponse {
        success
        message
      }
      ... on InsufficientLoyaltyPointsError {
        message
        errorCode
      }
    }
  }
`;

gql`
  mutation RevertTechCoinRedemption($orderId: ID!) {
    revertTechCoinRedemption(orderId: $orderId) {
      success
      message
    }
  }
`;
