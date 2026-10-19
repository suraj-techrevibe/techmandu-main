import { search, searchFacetValues } from '~/providers/products/products';
import { redirect } from '@remix-run/server-runtime';

import { paginationValidationSchema } from '~/utils/pagination';
import { LoaderFunctionArgs } from '@remix-run/router';
import { SortOrder } from '~/generated/graphql';

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export function filteredSearchLoaderFromPagination(
  allowedPaginationLimits: Set<number>,
  paginationLimitMinimumDefault: number,
) {
  const searchPaginationSchema = paginationValidationSchema(
    allowedPaginationLimits,
  );

  return {
    validator: searchPaginationSchema,
    filteredSearchLoader: async ({ params, request }: LoaderFunctionArgs) => {
      const url = new URL(request.url);
      const term = url.searchParams.get('q');
      const facetValueIds = url.searchParams.getAll('fvid');
      const limit =
        url.searchParams.get('limit') ?? paginationLimitMinimumDefault;
      const page = url.searchParams.get('page') ?? 1;

      const sortPrice = url.searchParams.get('sortprice');

      const sortOrder = sortPrice === 'asc' ? SortOrder.Asc : SortOrder.Desc;

      const minPrice = url.searchParams.get('minPrice');
      const maxPrice = url.searchParams.get('maxPrice');

      const zodResult = searchPaginationSchema.safeParse({ limit, page });
      if (!zodResult.success) {
        url.search = '';
        throw redirect(url.href);
      }

      let resultPromises: [
        ReturnType<typeof search>,
        ReturnType<typeof searchFacetValues>,
      ];
      const searchResultPromise = search(
        {
          input: {
            groupByProduct: true,
            term,
            facetValueFilters: [{ or: facetValueIds }],
            collectionSlug: params.slug,
            take: zodResult.data.limit,
            skip: (zodResult.data.page - 1) * zodResult.data.limit,
            ...(sortPrice ? { sort: { price: sortOrder } } : {}),
            ...(minPrice && maxPrice
              ? {
                  priceRangeWithTax: {
                    min: Number(minPrice) * 100,
                    max: Number(maxPrice) * 100,
                  },
                }
              : {}),
          },
        },
        { request },
      );

      resultPromises = [
        searchResultPromise,
        searchFacetValues(
          {
            input: {
              groupByProduct: true,
              term,
              collectionSlug: params.slug,
            },
          },
          { request },
        ),
      ];

      const [result, resultWithoutFacetValueFilters] = await Promise.all(
        resultPromises,
      );
      return {
        term,
        facetValueIds,
        result: result.search,
        resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
        appliedPaginationLimit: zodResult.data.limit,
        appliedPaginationPage: zodResult.data.page,
      };
    },
  };
}
