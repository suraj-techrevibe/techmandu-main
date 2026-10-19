import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useLoaderData, useOutletContext, Link } from '@remix-run/react';
import { getProductBySlug } from '~/providers/products/products';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { StarIcon, Trash2Icon } from 'lucide-react';
import PriceWithDiscount from '~/components/products/PriceWithDiscount';
import { PLACEHOLDER_IMAGE } from '~/constants';
import { useCompare } from '~/utils/use-compare';
import ProductCard from '~/components/ProductCard';
import { ProductVariantPrice } from '~/generated/graphql';

const MAX_COMPARE_ITEMS = 3;

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const compareItems: { slug: string; variantId: string }[] = [];
  for (let i = 1; i <= MAX_COMPARE_ITEMS; i++) {
    const slug = searchParams.get(`slug${i}`);
    const variantId = searchParams.get(`vid${i}`);
    if (typeof slug === 'string' && typeof variantId === 'string') {
      compareItems.push({ slug, variantId });
    }
  }

  if (compareItems.length < 2) {
    throw redirect('/?error=Please select at least 2 products to compare');
  }

  const productData = await Promise.all(
    compareItems.map(async (item) => {
      const { product } = await getProductBySlug(item.slug, { request });
      if (!product) return null;

      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) return null;

      const brand = product.facetValues.find((fv) => fv.facet.name === 'brand')?.name || '-';

      return {
        product,
        variant: {
          ...variant,
          productId: product.id,
          price: variant.priceWithTax,
          prices: variant.prices?.map((price) => {
            if (!price || typeof price !== 'object') {
              return null;
            }
            
            const typedPrice = price as ProductVariantPrice;
            return {
              __typename: typedPrice.__typename,
              currencyCode: typedPrice.currencyCode,
              currencyCodeName: typedPrice.currencyCodeName,
              customFields: typedPrice.customFields,
              discountPrice: typedPrice.discountPrice,
              isDefault: typedPrice.isDefault,
              price: typedPrice.price || variant.priceWithTax,
            };
          }).filter((price): price is NonNullable<typeof price> => price !== null) || [],
        },
        brand,
      };
    })
  );

  const filteredData = productData.filter((d): d is NonNullable<typeof d> => d !== null);

  return json({
    comparisons: filteredData,
  });
}

export default function ComparePage() {
  const { comparisons } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { removeItem: globalRemoveItem, clearCompare } = useCompare();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: any;
  }>();

  const handleRemove = (idx: number, variantId: string) => {
    // 1. Update local storage state
    globalRemoveItem(variantId);

    // 2. Redirect to updated URL to refresh data
    const params = new URLSearchParams(window.location.search);
    const slug = params.get(`slug${idx + 1}`);
    const vid = params.get(`vid${idx + 1}`);
    
    // Create new list of items excluding the one at idx
    const items: {slug: string, vid: string}[] = [];
    for (let i = 1; i <= 3; i++) {
       const s = params.get(`slug${i}`);
       const v = params.get(`vid${i}`);
       if (s && v && i !== idx + 1) {
         items.push({slug: s, vid: v});
       }
    }

    // Rebuild URL
    const newParams = new URLSearchParams();
    items.forEach((item, i) => {
      newParams.set(`slug${i+1}`, item.slug);
      newParams.set(`vid${i+1}`, item.vid);
    });
    
    window.location.href = `/compare?${newParams.toString()}`;
  };

  const handleClearAll = () => {
    clearCompare();
    window.location.href = '/';
  };

  if (comparisons.length < 2) {
    return (
      <div className="container py-12 text-center text-gray-500">
        <p>Please select at least 2 products to compare.</p>
      </div>
    );
  }

  // Extract all unique specification keys
  const allSpecKeys = new Set<string>();
  comparisons.forEach((item) => {
    item.variant.customFields?.specification?.forEach((spec) => {
      if (typeof spec.key === 'string') {
        allSpecKeys.add(spec.key);
      }
    });
  });

  const specKeys = Array.from(allSpecKeys);

  return (
    <div className="container mt-8 mb-20">
      <Breadcrumbs
        items={[
          { name: 'Home', id: '/' },
          { name: 'Compare', id: '/compare' },
        ]}
      />

      <div className="mt-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Products</h1>
          <p className="text-gray-500">Compare specifications and find the best fit for you.</p>
        </div>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors px-4 py-2 border border-red-100 rounded-lg hover:bg-red-50"
        >
          <Trash2Icon className="w-5 h-5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-xl">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 bg-gray-50/50 w-64 font-semibold text-gray-900 align-middle">Features</th>
              {comparisons.map((item, index) => (
                <th key={index} className="p-0 min-w-[230px] border-r border-gray-200 bg-white align-top">
                  <div className="flex flex-col h-full relative">
                    {/* Close Button - top center */}
                    <button
                      onClick={() => handleRemove(index, item.variant.id)}
                      className="absolute top-2 left-1/2 transform -translate-x-1/2 text-[#929FA5] hover:text-red-500 transition-all z-10"
                      aria-label="Remove from compare"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Product Card */}
                    <div className="p-3">
                      <ProductCard
                        name={item.variant.name}
                        slug={item.product.slug}
                        img={item.variant.featuredAsset?.preview || item.product.featuredAsset?.preview || PLACEHOLDER_IMAGE}
                        priceWithTax={item.variant.priceWithTax}
                        productId={item.variant.id}
                        productVariantId={item.variant.id}
                        productVariant={item.variant}
                        discountPercentage={item.variant.prices?.[0]?.customFields?.discountPercentage ?? 0}
                        discountPrice={item.variant.prices?.[0]?.customFields?.discountPrice ?? item.variant.priceWithTax}
                        stock={item.variant.stockLevel}
                        shouldShowStock={false}
                        shouldShowWishlistButton={true}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
{/* Customer feedback Row - commented out until data is available */}
            {/* <tr className="bg-[#F2F4F5] transition-colors">
              <td className="p-4 font-medium text-[#475156] border-r border-gray-300 align-middle">Customer feedback:</td>
              {comparisons.map((item, index) => (
                <td key={index} className="p-4 border-r border-gray-300 align-middle">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-[#FA8232] text-[#FA8232]" />
                    ))}
                    <span className="text-sm text-[#253574] ml-1">(0)</span>
                  </div>
                </td>
              ))}
            </tr> */}

            {/* Price Row */}
            <tr className="bg-white transition-colors">
              <td className="p-4 font-medium text-[#475156] border-r border-gray-200 align-middle">Price:</td>
              {comparisons.map((item, index) => (
                <td key={index} className="p-4 border-r border-gray-200 align-middle">
                  <div className="text-xl font-normal text-[#253574]">
                    <PriceWithDiscount
                      priceWithTax={item.variant.priceWithTax}
                      discountPrice={item.variant.prices?.[0]?.customFields?.discountPrice ?? item.variant.priceWithTax}
                      discountPercentage={item.variant.prices?.[0]?.customFields?.discountPercentage ?? 0}
                    />
                  </div>
                </td>
              ))}
            </tr>

            {/* Brand Row */}
            <tr className="bg-[#F2F4F5] transition-colors">
              <td className="p-4 font-medium text-[#475156] border-r border-gray-200 align-middle">Brand:</td>
              {comparisons.map((item, index) => (
                <td key={index} className="p-4 text-[#253574] font-semibold border-r border-gray-200 align-middle">
                  {item.brand}
                </td>
              ))}
            </tr>

            {/* Stock Status Row */}
            <tr className="bg-white transition-colors">
              <td className="p-4 font-medium text-[#475156] border-r border-gray-200 align-middle">Stock Status:</td>
              {comparisons.map((item, index) => (
                <td key={index} className="p-4 border-r border-gray-200 align-middle">
                  <span className={`font-bold text-[14px] ${item.variant.stockLevel === 'OUT_OF_STOCK' ? 'text-[#FF383C]' : 'text-[#10B981]'}`}>
                    {item.variant.stockLevel === 'OUT_OF_STOCK'
                      ? 'Out of Stock'
                      : item.variant.stockLevel === 'LOW_STOCK'
                        ? 'Low Stock'
                        : 'In Stock'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Dynamic Specification Rows */}
            {specKeys.map((key, rowIndex) => {
              const isEven = rowIndex % 2 === 0;
              return (
                <tr key={key} className={`${isEven ? 'bg-[#F2F4F5]' : 'bg-white'} transition-colors`}>
                  <td className="p-4 font-medium text-[#475156] align-middle capitalize border-r border-gray-200">{key}:</td>
                  {comparisons.map((item, index) => {
                    const spec = item.variant.customFields?.specification?.find((s) => s.key === key);
                    return (
                      <td key={index} className="p-4 text-[#253574] align-middle border-r border-gray-200">
                        {spec?.value || '-'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
