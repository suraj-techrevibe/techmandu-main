import { CurrencyCode, GetExchangeRatesQuery } from '~/generated/graphql';

export function convertCurrency(
  value: number,
  targetCurrency: CurrencyCode,
  rates: GetExchangeRatesQuery['currencyExchangeRate'],
) {
  if (!rates) {
    return value;
  }

  const currencyCodeToRates = {
    [CurrencyCode.Aud]: Number(rates.aud || 1),
    [CurrencyCode.Usd]: Number(rates.usd || 1),
    [CurrencyCode.Npr]: Number(rates.npr || 1),
  };

  if (
    targetCurrency === CurrencyCode.Aud ||
    targetCurrency === CurrencyCode.Usd ||
    targetCurrency === CurrencyCode.Npr
  ) {
    return value / currencyCodeToRates[targetCurrency];
  }

  return value;
}
