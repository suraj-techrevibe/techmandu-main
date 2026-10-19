import { PhotoIcon } from '@heroicons/react/24/solid';
import {
  MetaFunction,
  ShouldRevalidateFunction,
  useLoaderData,
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import DetailsTabsComponent from '~/components/products/DetailsTabsComponent';
import ProductDetail from '~/components/products/ProductDetail';
import RelatedProducts from '~/components/products/RelatedProducts';
import { APP_META_TITLE } from '~/constants';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import {
  getProductBySlug,
  getRelatedProducts,
} from '~/providers/products/products';
import { getSessionStorage } from '~/sessions';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.product?.name
        ? `${data.product.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

export async function loader({ params, request }: DataFunctionArgs) {
  const productPromise = getProductBySlug(params.slug!, { request });
  const relatedProductsPromise = getRelatedProducts(params.slug!, { request });

  const [{ product }, relatedProducts] = await Promise.all([
    productPromise,
    relatedProductsPromise,
  ]);

  if (!product) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');
  return json(
    {
      product: product!,
      error,
      relatedProducts: relatedProducts.relatedProducts,
    },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductSlug() {
  const { product, relatedProducts, error } = useLoaderData<typeof loader>();
  const assets = product.assets.map((a) => a.preview);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || '',
  );

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  return (
    <div key={product.id} className="container mt-2">
      <Breadcrumbs
        items={[
          ...(product.collections[product.collections.length - 1]
            ?.breadcrumbs ?? []),
          { name: product.name, id: product.id },
        ]}
      ></Breadcrumbs>

      <section className="mt-[58px]">
        <ProductDetail
          images={assets}
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          setSelectedVariantId={setSelectedVariantId}
          selectedVariant={selectedVariant}
          product={product}
        />
      </section>

      <section>
        <DetailsTabsComponent
          description={product.description}
          specifications={selectedVariant.customFields?.specification}
          returns={selectedVariant.customFields?.return}
        />
      </section>

      <section className="my-12">
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </section>
    </div>
  );
}

export function CatchBoundary() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {t('product.notFound')}
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">{t('product.notFoundInfo')}</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
