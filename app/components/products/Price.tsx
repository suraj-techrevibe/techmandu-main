import { CurrencyCode } from '~/generated/graphql';
import { ProductCardProps } from './ProductCard';
import { useCurrency } from '~/contexts/currencyContext';
import { useRootLoader } from '~/utils/use-root-loader';

export function Price({
  priceWithTax,
  currencyCode,
  customPrices
}: {
  priceWithTax?: number | ProductCardProps['priceWithTax'];
  currencyCode?: ProductCardProps['currencyCode'];
  customPrices?: {
    audPrice?: number | null;
    nprPrice?: number | null;
    usdPrice?: number | null;
  } | null;
}) {

  const { currency: customCurrency } = useCurrency();
  if (customPrices) {
    if (customCurrency === CurrencyCode.Aud && customPrices.audPrice != null) {
      return <>{formatPrice(customPrices.audPrice, CurrencyCode.Aud)}</>;
    }
    if (customCurrency === 'NPR' && customPrices.nprPrice != null) {
      return <>{formatPrice(customPrices.nprPrice, CurrencyCode.Npr)}</>;
    }
    if (customCurrency === 'USD' && customPrices.usdPrice != null) {
      return <>{formatPrice(customPrices.usdPrice, CurrencyCode.Usd)}</>;
    }
  }

  if (priceWithTax == null || !currencyCode) {
    return <></>;
  }
  if (typeof priceWithTax === 'number') {
    return <>{formatPrice(priceWithTax, currencyCode)}</>;
  }
  if ('value' in priceWithTax) {
    return <>{formatPrice(priceWithTax.value, currencyCode)}</>;
  }
  if (priceWithTax.min === priceWithTax.max) {
    return <>{formatPrice(priceWithTax.min, currencyCode)}</>;
  }
  return (
    <>
      {formatPrice(priceWithTax.min, currencyCode)} -{' '}
      {formatPrice(priceWithTax.max, currencyCode)}
    </>
  );
}

export function formatPrice(value: number, currency: CurrencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value / 100);
}
