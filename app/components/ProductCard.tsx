import { Link, useFetcher, useOutletContext } from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import placeholderImage from '~/assets/images/placeholder.png';
import filledHeartIcon from '~/assets/svgs/filledHeart.svg';
import heartIcon from '~/assets/svgs/heart.svg';
import {
  PriceRange,
  ProductsQuery,
  SearchQuery,
  SinglePrice,
} from '~/generated/graphql';
import { OutletContext } from '~/types';
import { CartIcon } from './products/CartIcon';
import PriceWithDiscount from './products/PriceWithDiscount';

export interface ProductCardProps {
  name: string;
  slug: string;
  img?: string | null;
  priceWithTax?: number | PriceRange | SinglePrice;
  productId: string;
  productVariantId: string;
  productVariant?: ProductsQuery['products']['items'][number]['variants'][number];
  discountPercentage?: number | null;
  discountPrice?: number | null;
  stock?: string;
  shouldShowStock?: boolean;
  shouldShowWishlistButton?: boolean;
}

const ProductCard = ({
  name,
  slug,
  img,
  priceWithTax,
  productVariantId,
  productVariant,
  discountPercentage,
  discountPrice,
  stock,
  shouldShowStock = true,
  shouldShowWishlistButton = true,
}: ProductCardProps) => {
  const { activeOrderFetcher } = useOutletContext<OutletContext>();
  const isBeingAddedToCart =
    activeOrderFetcher.formData?.get('variantId') === productVariantId &&
    activeOrderFetcher.state !== 'idle';

  const handleAddToCart = (variantId: string) => {
    activeOrderFetcher.submit(
      {
        action: 'addItemToOrder',
        variantId: variantId,
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };

  const fetcher = useFetcher();
  const isBeingWishListed =
    fetcher.formData?.get('productId') === productVariantId &&
    fetcher.state !== 'idle';
  const handleWishList = (varientId: string, isFavourite: boolean) => {
    fetcher.submit(
      {
        productId: varientId,
        isFavourite: isFavourite ? 'true' : 'false',
      },
      {
        method: 'post',
        action: '/api/wishlist',
      },
    );
  };

  const discountPercent = discountPercentage
    ? discountPercentage
    : productVariant?.prices[0].customFields?.discountPercentage;
  return (
    <article className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* image / media */}
      <Link to={`/products/${slug}`} prefetch="intent" className="group">
        <div className="relative">
          {discountPercent ? (
            <span className="absolute top-3 left-0 z-10 inline-flex items-center px-3 py-1 rounded-r-md text-sm font-light bg-[#FDE6DF] text-[#F15A27]">
              -{discountPercent}%
            </span>
          ) : null}

          <div className="m-2 md:m-3 flex items-center justify-center aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={(img ?? placeholderImage) + '?w=680&h=520&format=webp'}
              alt={name}
              className="size-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </Link>

      <div className="h-[2px] bg-gradient-to-r from-primary/10 via-primary/80 to-primary/10 mx-auto w-[90%] rounded-full my-2"></div>

      {/* body */}
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/products/${slug}`} prefetch="intent" className="group">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 line-clamp-2 min-h-10 md:min-h-12">
            {name}
          </h3>

          {shouldShowStock ? (
            <div className="mb-2">
              {stock === 'OUT_OF_STOCK' ? (
                <span className="text-sm text-gray-500">N/A</span>
              ) : (
                <span className="text-sm text-primary2">In Stock</span>
              )}
            </div>
          ) : null}

          {/* Price */}
          <div className="font-semibold text-gray-900 mb-3 text-base">
            <PriceWithDiscount
              discountPercentage={discountPercent ?? undefined}
              priceWithTax={priceWithTax}
              discountPrice={
                discountPrice
                  ? discountPrice
                  : productVariant?.prices[0].customFields?.discountPrice ??
                    undefined
              }
            />
          </div>
        </Link>

        {/* actions */}
        <div className="hidden mt-auto md:flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              productVariantId && handleAddToCart(productVariantId)
            }
            disabled={
              isBeingAddedToCart ||
              stock === 'OUT_OF_STOCK' ||
              !productVariantId
            }
            className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-lg font-medium transition-all duration-150
              ${
                stock === 'OUT_OF_STOCK' || !productVariantId
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-primary border-2 border-primary hover:shadow-sm'
              }
              disabled:opacity-60 disabled:cursor-not-allowed`}
            aria-disabled={
              isBeingAddedToCart ||
              stock === 'OUT_OF_STOCK' ||
              !productVariantId
            }
          >
            {isBeingAddedToCart ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <>
                <span className="text-primary font-semibold flex items-center gap-1 lg:gap-2">
                  {stock === 'OUT_OF_STOCK'
                    ? 'Out of stock'
                    : !productVariantId
                    ? 'Unavailable'
                    : 'Add to cart'}
                  <CartIcon />
                </span>
              </>
            )}
          </button>

          {shouldShowWishlistButton ? (
            <button
              type="button"
              onClick={() =>
                handleWishList(
                  productVariantId,
                  productVariant?.isInWishlist || false,
                )
              } // TODO : make this isFavourate dynamic when extended by backend
              className="w-12 h-12 rounded-lg bg-red-50 border border-gray-100 flex items-center justify-center hover:shadow-sm transition"
              aria-label="Add to wishlist"
            >
              {productVariant?.isInWishlist ? (
                <img
                  src={filledHeartIcon}
                  alt="wishlist"
                  className="w-full h-full"
                />
              ) : isBeingWishListed ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <img src={heartIcon} alt="wishlist" className="w-5 h-5" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
