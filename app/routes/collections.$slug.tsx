import { MetaFunction, useLoaderData, useSubmit } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import NewCollectionCard from '~/components/collections/NewCollectionCard';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { FiltersButton } from '~/components/FiltersButton';
import { FilterableProductGrid } from '~/components/products/FilterableProductGrid';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { APP_META_TITLE } from '~/constants';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { sdk } from '../graphqlWrapper';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.collection
        ? `${data.collection?.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

const paginationLimitMinimumDefault = 25;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  50,
  100,
]);
const { validator, filteredSearchLoader } = filteredSearchLoaderFromPagination(
  allowedPaginationLimits,
  paginationLimitMinimumDefault,
);

export async function loader({ params, request, context }: DataFunctionArgs) {
  const {
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    appliedPaginationLimit,
    appliedPaginationPage,
    term,
  } = await filteredSearchLoader({
    params,
    request,
    context,
  });
  const collection = (await sdk.collection({ slug: params.slug })).collection;
  if (!collection?.id || !collection?.name) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    term,
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    appliedPaginationLimit,
    appliedPaginationPage,
  };
}

export default function CollectionSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const { collection, result, resultWithoutFacetValueFilters, facetValueIds } =
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {collection.name}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <CustomBreadCrumb
        items={collection.breadcrumbs
          ?.filter((c) => c.name !== '__root_collection__')
          .map((b) => ({
            name: b.name,
            href: '/collections/' + b.slug,
          }))}
      />
      {collection.children?.length ? (
        <div className="max-w-2xl mx-auto py-16 sm:py-16 lg:max-w-none border-b">
          <h2 className="text-2xl font-light text-gray-900 my-5">
            {t('product.collections')}
          </h2>
          <div className="container flex justify-center mx-auto">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent className="flex gap-3">
                {
                  collection.children.map((collection) => (
                    <CarouselItem
                      key={collection.id}
                      className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                    >
                      <div className="h-full p-1">
                        <NewCollectionCard
                          slug={collection.slug}
                          title={collection.name}
                          imageURL={collection.featuredAsset?.preview as string}
                        />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      ) : (
        ''
      )}

      <ValidatedForm
        validator={withZod(validator)}
        method="get"
        onChange={(e) => submit(e.currentTarget, { preventScrollReset: true })}
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

export function CatchBoundary() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {t('product.collectionNotFound')}
      </h2>
      <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
        <div className="space-y-6">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
