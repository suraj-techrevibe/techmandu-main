import { PriceRange, SinglePrice } from '~/generated/graphql';
import { DynamicPrice } from './DynamicPrice';

interface Props {
  priceWithTax?: number | SinglePrice | PriceRange;
  discountPrice?: number;
  discountPercentage?: number;
}

export default function PriceWithDiscount({
  priceWithTax,
  discountPrice,
  discountPercentage,
}: Props) {
  if (!priceWithTax) {
    return null;
  }

  const isPriceInRange = (() => {
    if (typeof priceWithTax === 'number') {
      return false;
    }

    if (typeof priceWithTax === 'object' && 'value' in priceWithTax) {
      return false;
    }

    if (
      typeof priceWithTax === 'object' &&
      'min' in priceWithTax &&
      'max' in priceWithTax
    ) {
      return true;
    }

    return false;
  })();

  // Early return if the price is in range
  if (isPriceInRange) {
    return <DynamicPrice priceWithTax={priceWithTax} />;
  }

  const priceWithTaxValue = (() => {
    if (typeof priceWithTax === 'number') {
      return priceWithTax;
    }

    if (typeof priceWithTax === 'object' && 'value' in priceWithTax) {
      return priceWithTax.value;
    }

    return priceWithTax.min;
  })();

  const resultPrice = (() => {
    if (discountPrice) {
      return priceWithTaxValue - discountPrice;
    }
    if (discountPercentage) {
      return priceWithTaxValue - (discountPercentage / 100) * priceWithTaxValue;
    }
    return priceWithTaxValue;
  })();

  const isDiscountApplied = resultPrice < priceWithTaxValue;

  if (isDiscountApplied) {
    return (
      <div className="flex items-center gap-2 md:gap-3 text-base leading-6 flex-wrap">
        <DynamicPrice priceWithTax={resultPrice} />
        <span className="text-gray-400 font-medium text-base leading-6 line-through">
          <DynamicPrice priceWithTax={priceWithTaxValue} />
        </span>
      </div>
    );
  }

  return <DynamicPrice priceWithTax={resultPrice} />;
}
