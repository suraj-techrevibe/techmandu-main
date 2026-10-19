import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function getExchangeRate(options: QueryOptions) {
  return sdk
    .GetExchangeRates({}, options)
    .then((res) => res.currencyExchangeRate)
    .catch(() => ({}));
}

gql`
  query GetExchangeRates {
    currencyExchangeRate {
      usd
      npr
      aud
    }
  }
`;
