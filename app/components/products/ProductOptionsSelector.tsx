import { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import { useEffect, useMemo, useState } from 'react';
import { DetailedProductFragment, ProductQuery } from '~/generated/graphql';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';

export const findRelatedVariant = (
  product: Omit<DetailedProductFragment, 'optionGroups'>,
  group: DetailedProductFragment['optionGroups'][number],
  option: DetailedProductFragment['optionGroups'][number]['options'][number],
  selectedOptions: { [key: string]: string },
) => {
  return product.variants.find((v) =>
    v.options.every((vo) => {
      if (vo.groupId === group.id) return vo.id === option.id;
      return selectedOptions[vo.groupId] === vo.id;
    }),
  );
};

export function ProductOptionsSelector({
  product,
  selectedVariantId,
  selectedVariant,
  setSelectedVariantId,
}: {
  product: Jsonify<ProductQuery['product']>;
  selectedVariantId: string;
  selectedVariant: Jsonify<DetailedProductFragment['variants'][number]>;
  setSelectedVariantId(value: string): void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const optionsToBeselected = selectedVariant?.options.reduce(
      (acc, option) => {
        acc[option.groupId] = option.id;
        return acc;
      },
      {} as { [key: string]: string },
    );
    if (optionsToBeselected) setSelectedOptions(optionsToBeselected);
  }, [selectedVariant]);

  const productOptionGroups = useMemo(() => {
    return product?.optionGroups.map((group) => {
      const options = group.options
        .map((option) => {
          const relatedVariant = findRelatedVariant(
            product as DetailedProductFragment,
            group,
            option,
            selectedOptions,
          );
          return relatedVariant
            ? {
                ...option,
                stockLevel: Number(relatedVariant.stockLevel),
                isSelected: option.id === selectedOptions[group.id],
              }
            : undefined;
        })
        .filter(Boolean);

      return { ...group, options };
    });
  }, [selectedOptions, product]);

  const handleOptionClick = (groupId: string, optionId: string) => {
    let newState: { [key: string]: string };
    if (selectedOptions[groupId] === optionId) {
      return;
    } else {
      newState = { ...selectedOptions, [groupId]: optionId };
    }
    setSelectedOptions(newState);

    const newVariantId = product?.variants?.find((v) =>
      v?.options?.every((ov) => ov?.id === newState[ov.groupId]),
    )?.id;
    if (newVariantId && newVariantId !== selectedVariantId) {
      setSelectedVariantId(newVariantId);
    }
  };

  return (
    <div className="space-y-3">
      {productOptionGroups?.map((optionGroup) => {
        return optionGroup.options.length ? (
          <div
            key={optionGroup.id}
            className="border rounded-lg p-4 border-primary/50"
          >
            <div className="capitalize font-semibold text-lg text-primary mb-2">
              {optionGroup.name}
            </div>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              {optionGroup.options.map((option) => {
                if (!option?.id) return;
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    type="button"
                    onClick={() => handleOptionClick(optionGroup.id, option.id)}
                    className={cn(
                      'font-light border-primary text-wrap text-primary bg-white',
                      {
                        'border-2 border-primary bg-primary text-white pointer-events-none':
                          option.isSelected,
                      },
                    )}
                  >
                    {option?.name}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}
