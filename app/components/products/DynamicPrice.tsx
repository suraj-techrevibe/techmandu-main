import { CurrencyCode } from '~/generated/graphql';
import { useCurrency } from '~/contexts/currencyContext';
import { useRootLoader } from '~/utils/use-root-loader';
import { ProductCardProps } from '../ProductCard';
import { convertCurrency } from '~/utils/converted-currency';

export function DynamicPrice({
  priceWithTax,
}: {
  priceWithTax?: number | ProductCardProps['priceWithTax'];
}) {
  const rootData = useRootLoader();
  const rates = rootData.rates;

  const { currency: activeCurrency } = useCurrency();

  if (priceWithTax == null || !activeCurrency) {
    return <></>;
  }

  // Handle different price types
  if (typeof priceWithTax === 'number') {
    const convertedPrice = convertCurrency(priceWithTax, activeCurrency, rates);
    return <>{formatPrice(convertedPrice, activeCurrency)}</>;
  }

  if (
    priceWithTax &&
    typeof priceWithTax === 'object' &&
    'value' in priceWithTax
  ) {
    const convertedPrice = convertCurrency(
      priceWithTax.value,
      activeCurrency,
      rates,
    );
    return <>{formatPrice(convertedPrice, activeCurrency)}</>;
  }

  if (
    priceWithTax &&
    typeof priceWithTax === 'object' &&
    'min' in priceWithTax &&
    'max' in priceWithTax
  ) {
    const convertedMin = convertCurrency(
      priceWithTax.min,
      activeCurrency,
      rates,
    );
    const convertedMax = convertCurrency(
      priceWithTax.max,
      activeCurrency,
      rates,
    );

    if (convertedMin === convertedMax) {
      return <>{formatPrice(convertedMin, activeCurrency)}</>;
    }

    return (
      <>
        {formatPrice(convertedMin, activeCurrency)} -{' '}
        {formatPrice(convertedMax, activeCurrency)}
      </>
    );
  }

  return <></>;
}

export function formatPrice(value: number, currency: CurrencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value / 100);
}
