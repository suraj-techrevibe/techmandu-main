import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import Collections from '~/components/collections/collections';
import Banners from '~/components/HomePage/Banners';
import FeaturedProducts from '~/components/HomePage/FeaturedProducts';
import Hero from '~/components/HomePage/Hero/Hero';
import NewArrivals from '~/components/HomePage/NewArrivals';
import PopularProducts from '~/components/HomePage/PopularProducts';
import ProductsOnSale from '~/components/HomePage/ProductsOnSale';
import SubContainer from '~/components/HomePage/SubContainer';
import TrackOrder from '~/components/TrackOrder/TrackOrder';
import { SearchQuery, SortOrder } from '~/generated/graphql';
import { getBanner } from '~/providers/channel/channel';
import { getFacets } from '~/providers/facets/facets';
import { getProducts, search } from '~/providers/products/products';

export async function loader({ request }: LoaderFunctionArgs) {
  const facets = await getFacets(
    {
      filter: {
        code: { contains: 'category' },
      },
    },
    { request },
  );

  const onSaleFacetId = facets?.facets?.items?.[0]?.values?.find((value) =>
    value?.code?.includes('on-sale'),
  )?.id;

  const bannersPromise = getBanner({ request });

  let productOnSalePromise: Promise<SearchQuery> = Promise.resolve({
    search: { facetValues: [], items: [], totalItems: 0 },
  });

  if (onSaleFacetId) {
    productOnSalePromise = search(
      {
        input: {
          facetValueFilters: [{ or: [onSaleFacetId] }],
        },
      },
      { request },
    );
  }

  const popularProductsPromise = getProducts(
    {
      sort: {
        popularityScore: SortOrder.Desc,
      },
      take: 8,
    },
    { request },
  );
  const newArrivalPromise = getProducts(
    {
      sort: {
        createdAt: SortOrder.Desc,
      },
      take: 8,
    },
    { request },
  );
  const featuredProductsPromise = getProducts(
    {
      take: 8,
      filter: {
        isFeatured: { eq: true },
      },
      sort: {
        popularityScore: SortOrder.Desc,
      },
    },
    { request },
  );

  const [
    banners,
    featuredProducts,
    popularProducts,
    newArrivalProducts,
    productsOnSale,
  ] = await Promise.all([
    bannersPromise,
    featuredProductsPromise,
    popularProductsPromise,
    newArrivalPromise,
    productOnSalePromise,
  ]);

  return {
    banners,
    featuredProducts: featuredProducts.products,
    popularProducts: popularProducts.products,
    newArrivalProducts: newArrivalProducts.products,
    productsOnSale: productsOnSale?.search?.items,
  };
}

export default function Index() {
  const {
    banners,
    featuredProducts,
    popularProducts,
    newArrivalProducts,
    productsOnSale,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="mx-4 lg:mx-10 my-5 lg:my-10 rounded-md">
        <Hero />
      </section>

      <section>
        <Collections />
      </section>

      <section>
        <FeaturedProducts products={featuredProducts?.items ?? []} />
      </section>

      {/* Banner Remaining */}
      <section>
        <Banners banners={banners} />
      </section>

      <section>
        <PopularProducts products={popularProducts.items} />
      </section>

      <section
        id="track-order"
        className="container my-5 md:my-10 scroll-mt-20 md:scroll-mt-60"
      >
        <TrackOrder />
      </section>

      <section>
        <NewArrivals products={newArrivalProducts.items} />
      </section>

      <section>
        <SubContainer />
      </section>

      <section className="container">
        <ProductsOnSale productsOnSale={productsOnSale} />
      </section>
    </div>
  );
}
