import { useLoaderData, useSubmit } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { FiltersButton } from '~/components/FiltersButton';
import { FilterableProductGrid } from '~/components/products/FilterableProductGrid';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { paginationValidationSchema } from '~/utils/pagination';

const paginationLimitMinimumDefault = 25;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  50,
  100,
]);
const validator = withZod(paginationValidationSchema(allowedPaginationLimits));

export const { filteredSearchLoader: loader } =
  filteredSearchLoaderFromPagination(
    allowedPaginationLimits,
    paginationLimitMinimumDefault,
  );

export default function Search() {
  const loaderData = useLoaderData<Awaited<typeof loader>>();
  const { result, resultWithoutFacetValueFilters, term, facetValueIds } =
    loaderData;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const submit = useSubmit();
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <CustomBreadCrumb
        items={[{ name: 'Search', href: '/search' }]}
        className="mt-3"
      />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {term
            ? `${t('common.resultsFor')} "${term}"`
            : t('common.allResults')}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <ValidatedForm
        validator={validator}
        method="get"
        onChange={(e) => {
          const ignoreForm = (e.target as HTMLElement)?.dataset?.ignoreForm;
          if (!ignoreForm) {
            submit(e.currentTarget, { preventScrollReset: true });
          }
        }}
      >
        <FilterableProductGrid
          allowedPaginationLimits={allowedPaginationLimits}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          {...loaderData}
        />
      </ValidatedForm>
    </div>
  );
}
