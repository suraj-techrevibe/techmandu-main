import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import ProductCard from '../ProductCard';
import {
  translatePaginationFrom,
  translatePaginationTo,
} from '~/utils/pagination';
import { Pagination } from '~/components/Pagination';
import { NoResultsHint } from '~/components/products/NoResultsHint';
import { useRef } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { useTranslation } from 'react-i18next';
import CrossIcon from '~/assets/svgs/crossIcon.svg';
import { cn } from '~/lib/utils';
import { Select } from '../Select';
import { useSearchParams } from '@remix-run/react';

export function FilterableProductGrid({
  result,
  resultWithoutFacetValueFilters,
  facetValueIds,
  appliedPaginationPage,
  appliedPaginationLimit,
  allowedPaginationLimits,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: Awaited<
  ReturnType<
    ReturnType<
      typeof filteredSearchLoaderFromPagination
    >['filteredSearchLoader']
  >
> & {
  allowedPaginationLimits: Set<number>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (arg0: boolean) => void;
}) {
  const { t } = useTranslation();
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const selectedValues = facetValuesTracker.current.selectedValues();

  const [searchParams] = useSearchParams();

  const shouldShowDiscountedProducts = Boolean(
    searchParams.get('discount') === 'on',
  );

  const removeFacet = (id: string) => () => {
    const params = new URLSearchParams(window.location.search);
    const existing = params.getAll('fvid');
    const updated = existing.filter((val) => val !== id);
    params.delete('fvid');
    updated.forEach((val) => params.append('fvid', val));
    const queryString = params.toString();
    const newUrl =
      window.location.pathname + (queryString ? `?${queryString}` : '');
    window.history.replaceState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
      <FacetFilterControls
        facetFilterTracker={facetValuesTracker.current}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      {result.items.length > 0 ? (
        <div
          className={cn('sm:col-span-5 lg:col-span-4 space-y-6', {
            'lg:col-span-5':
              facetValuesTracker.current.facetsWithValues?.length === 0,
          })}
        >
          <div className="flex flex-col md:flex-row items-start md:justify-between gap-3">
            {selectedValues.length > 0 ? (
              <ul className="flex flex-wrap gap-3 w-full">
                {selectedValues.map((value) => (
                  <li key={value.id} className="list-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary text-primary bg-white shadow-sm">
                      <span className="text-sm font-medium leading-none max-w-[10rem] truncate">
                        {value.name}
                      </span>

                      <button
                        type="button"
                        onClick={removeFacet(value.id)}
                        aria-label={`Remove ${value.name}`}
                        className="ml-1 -mr-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <img src={CrossIcon} className="w-3 h-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div></div>
            )}
            <Select
              name="sortprice"
              required
              noPlaceholder
              className="w-fit text-xs"
            >
              <option value="">Sort by: Best Match</option>
              <option value="asc">Price: ascending</option>
              <option value="desc">Price: descending</option>
            </Select>
          </div>

          <div className="grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {result.items.map((item) => {
              const priceWithTax =
                item.priceWithTax.__typename === 'SinglePrice'
                  ? item.priceWithTax.value
                  : item.priceWithTax.__typename === 'PriceRange'
                  ? item.priceWithTax.min
                  : 0;

              if (
                shouldShowDiscountedProducts &&
                !item.customProductVariantMappings?.discount
              ) {
                return null;
              }

              return (
                <ProductCard
                  key={item.productId}
                  name={item.productName}
                  slug={item.slug}
                  img={item.productAsset?.preview}
                  priceWithTax={priceWithTax}
                  productId={item.productId}
                  discountPercentage={
                    item.prices[0]?.customFields?.discountPercentage
                  }
                  discountPrice={item.prices[0]?.customFields?.discountPrice}
                  productVariantId={item.productVariantId}
                />
              );
            })}
          </div>

          <div className="flex flex-row justify-between items-center gap-4">
            <span className="self-start text-gray-500 text-sm mt-2">
              {t('product.showing')}{' '}
              {translatePaginationFrom(
                appliedPaginationPage,
                appliedPaginationLimit,
              )}{' '}
              {t('product.to')}{' '}
              {translatePaginationTo(
                appliedPaginationPage,
                appliedPaginationLimit,
                result.items.length,
              )}
            </span>
            <Pagination
              appliedPaginationLimit={appliedPaginationLimit}
              allowedPaginationLimits={allowedPaginationLimits}
              totalItems={result.totalItems}
              appliedPaginationPage={appliedPaginationPage}
            />
          </div>
        </div>
      ) : (
        <NoResultsHint
          facetFilterTracker={facetValuesTracker.current}
          className={'sm:col-span-4 sm:p-4'}
        />
      )}
    </div>
  );
}
