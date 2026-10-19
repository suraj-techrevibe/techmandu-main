import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import {
  FetcherWithComponents,
  useFetcher,
  useOutletContext,
} from '@remix-run/react';
import { StarIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import CustomShoppingCartIcon from '~/assets/svgs/CustomShoppingCartIcon';
import filledHeartIcon from '~/assets/svgs/filledHeart.svg';
import heartIcon from '~/assets/svgs/heart.svg';
import { PLACEHOLDER_IMAGE } from '~/constants';
import { ProductQuery } from '~/generated/graphql';
import { CartLoaderData } from '~/routes/api.active-order';
import { Button } from '../Button';
import { QuantityAdjuster } from '../cart/QuantityAdjuster';
import PriceWithDiscount from './PriceWithDiscount';
import { ProductOptionsSelector } from './ProductOptionsSelector';
import { useCompare } from '~/utils/use-compare';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface ProductDetailProps {
  images: string[];
  variants: NonNullable<ProductQuery['product']>['variants'];
  selectedVariantId: string;
  setSelectedVariantId: (id: string) => void;
  selectedVariant: NonNullable<ProductQuery['product']>['variants'][number];
  product: ProductQuery['product'];
}

const ProductDetail = ({
  images,
  variants,
  selectedVariantId,
  setSelectedVariantId,
  selectedVariant,
  product,
}: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, removeItem, isInCompare } = useCompare();

  const isCurrentInCompare = isInCompare(selectedVariantId);

  const toggleCompare = () => {
    if (isCurrentInCompare) {
      removeItem(selectedVariantId);
    } else {
      addItem({
        productSlug: product?.slug || '',
        productVariantId: selectedVariantId,
      });
    }
  };

  // Get discount percent from backend
  const discountPercent =
    selectedVariant?.prices?.[0]?.customFields?.discountPercentage ?? 0;

  const PinnedSpecs = selectedVariant?.customFields?.specification?.filter(spec => spec.isPinned);

  // Prices
  const originalPrice = selectedVariant?.priceWithTax || 0;
  const discountedPrice =
    selectedVariant?.prices?.[0]?.customFields?.discountPrice ?? originalPrice;

  // Current page URL for sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this amazing product`;

  // Get images from product variants if images are available
  const variantImages =
    selectedVariant?.assets?.map((asset) => asset.preview) || [];
  if (variantImages.length > 0) {
    images = variantImages;
  }

  const brand = product?.facetValues.find((fv) => fv.facet.name === 'brand')
    ?.name as string;

  const handleSocialShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'Facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}&quote=This%20Product%20is%20amazing!`;
        break;
      case 'Instagram':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Link copied to clipboard! You can now paste it on Instagram.');
        return;
      case 'Twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText,
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<
      CartLoaderData & { shouldRedirect: boolean }
    >;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};

  const currentProductVariantLineId = useMemo(() => {
    const lineVariant = activeOrder?.lines?.find(
      (line) => line.productVariant.id === selectedVariantId,
    );
    return lineVariant?.id;
  }, [activeOrder?.lines, selectedVariantId]);

  const orderLine = activeOrder?.lines.find(
    (l) => l.productVariant.id === selectedVariantId,
  );
  const qtyInCart = orderLine?.quantity ?? 0;

  useEffect(() => {
    if (activeOrderFetcher.data?.shouldRedirect) {
      window.location.href = '/checkout';
    }
  }, [activeOrderFetcher.data]);

  useEffect(() => {
    setQty(qtyInCart || 1);
  }, [qtyInCart]);

  const fetcher = useFetcher();
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

  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance images every 4 seconds
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  // Reset auto-advance when user manually selects image
  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    // Brief pause in auto-advance after manual selection
    setIsHovered(true);
    setTimeout(() => setIsHovered(false), 8000);
  };

  const socialIcons = [
    { name: 'Facebook', icon: FaFacebookF },
    { name: 'Instagram', icon: FaInstagram },
    { name: 'Twitter', icon: FaTwitter },
  ] as const;
  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
        {/* Left - Images */}
        <div className="flex flex-col gap-4 w-full max-w-[496px]">
          {/* Main Image */}
          <div
            className="flex-1 rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full sm:h-[500px] aspect-auto overflow-hidden">
              <img
                key={selectedImage}
                src={images[selectedImage] || images[0] || PLACEHOLDER_IMAGE}
                alt={product?.name}
                className="w-full h-full object-contain animate-in slide-in-from-right-8 duration-700 ease-in-out"
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 overflow-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
              >
                <img
                  src={image || PLACEHOLDER_IMAGE}
                  alt={`view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="space-y-6 w-full">
          {/* Product Name */}
          <h1 className="text-[24px] leading-[24px] py-3 border-b border-[#81818140] font-medium text-gray-900">
            {product?.name}
          </h1>
          {/* Price */}
          <div className="flex items-center gap-3 text-[24px] font-medium text-gray-900">
            <PriceWithDiscount
              priceWithTax={originalPrice}
              discountPrice={discountedPrice}
              discountPercentage={discountPercent}
            />
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div className="inline-block bg-[#EFD33D] text-[#191C1F] px-[10px] py-[5px] rounded-[2px] text-sm font-semibold">
                {discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Description */}
          <div className="my-6 space-y-[7px]">
            <div className="flex items-center gap-[30px]">
              <p className="font-medium text-[12px] leading-4 max-w-[50px] w-full">
                Availability
              </p>
              <p className="font-bold text-primary text-[12px] leading-4">
                {selectedVariant?.stockLevel === 'OUT_OF_STOCK'
                  ? 'Out of Stock'
                  : selectedVariant?.stockLevel === 'LOW_STOCK'
                    ? 'Low Stock'
                    : 'In Stock'}
              </p>
            </div>

            {brand && brand != '' && (
              <div className="flex items-center gap-[30px]">
                <p className="font-medium text-[12px] leading-4 max-w-[50px] w-full">
                  Brand
                </p>
                <p className="font-bold text-[#818181] text-[12px] leading-4">
                  {brand}
                </p>
              </div>
            )}

            {
              PinnedSpecs && PinnedSpecs.length > 0 &&
              PinnedSpecs.map((spec) => (
                <div className="flex items-center gap-[30px]">
                  <p className="font-medium text-[12px] leading-4 max-w-[50px] w-full">
                    {spec.key}
                  </p>
                  <p className="font-bold text-[#818181] text-[12px] leading-4">
                    {spec.value}
                  </p>
                </div>
              ))
            }

          </div>

          <div>
            <activeOrderFetcher.Form
              method="post"
              action="/api/active-order"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="action"
                value={
                  currentProductVariantLineId ? 'adjustItem' : 'addItemToOrder'
                }
              />
              <input
                type="hidden"
                name="lineId"
                value={currentProductVariantLineId}
              />
              <input type="hidden" name="variantId" value={selectedVariantId} />
              <input type="hidden" name="quantity" value={qty} />

              <ProductOptionsSelector
                product={product!}
                selectedVariant={selectedVariant}
                selectedVariantId={selectedVariantId}
                setSelectedVariantId={setSelectedVariantId}
              />

              <div className="flex lg:flex-row flex-col lg:items-center gap-8">
                {/* Quantity Adjuster */}

                <QuantityAdjuster quantity={qty} setQty={setQty} />

                {/* Add to Cart */}
                <Button
                  type="submit"
                  className={`w-full py-4 px-6 text-base font-semibold rounded-lg transition-all duration-200 shadow-sm ${activeOrderFetcher.state !== 'idle' ||
                    selectedVariant?.stockLevel === 'OUT_OF_STOCK'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : qtyInCart > 0
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg'
                    }`}
                  disabled={
                    activeOrderFetcher.state !== 'idle' ||
                    selectedVariant?.stockLevel === 'OUT_OF_STOCK'
                  }
                >
                  {qtyInCart ? (
                    <span className="flex items-center justify-center gap-2 text-center">
                      <CheckIcon className="w-5 h-5" />
                      <span>{qtyInCart} in cart</span>
                    </span>
                  ) : activeOrderFetcher.state === 'submitting' ? (
                    <span className="flex items-center justify-center gap-3">
                      <span>Adding to cart</span>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    </span>
                  ) : selectedVariant?.stockLevel === 'OUT_OF_STOCK' ? (
                    'Out of Stock'
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <CustomShoppingCartIcon />
                      <span>Add to Cart</span>
                    </div>
                  )}
                </Button>
              </div>
            </activeOrderFetcher.Form>
          </div>

          <div className="mt-6 flex lg:flex-row flex-col lg:items-center gap-6 justify-between">
            <div className="flex items-center gap-6">
              {/* TODO : make this isFavourate dynamic when extended by backend */}
              <button
                onClick={() =>
                  handleWishList(
                    selectedVariantId,
                    selectedVariant.isInWishlist || false,
                  )
                }
                className="flex items-center gap-[6px] text-[14px] leading-5 text-[#475156]"
              >
                {selectedVariant.isInWishlist ? (
                  <span className="flex gap-2">
                    <img
                      src={filledHeartIcon}
                      alt="wishlist"
                      className="w-5 h-5"
                    />
                    In WishList
                  </span>
                ) : (
                  <span className="flex gap-2">
                    <img src={heartIcon} alt="wishlist" className="w-5 h-5" />
                    Add to Wishlist
                  </span>
                )}
              </button>

              <button
                onClick={toggleCompare}
                className="flex items-center gap-[6px] text-[14px] leading-5 text-[#475156]"
              >
                <ArrowsRightLeftIcon className="w-5 h-5" />
                <span>
                  {isCurrentInCompare ? 'Remove from Compare' : 'Add to Compare'}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3 text-[14px] leading-5 text-[#475156]">
              Share product:
              <div className="flex gap-2">
                {socialIcons.map(({ name, icon }) => {
                  const IconComponent = icon as any;
                  return (
                    <button
                      key={name}
                      aria-label={name}
                      onClick={() => handleSocialShare(name)}
                      title={`Share on ${name}`}
                    >
                      <IconComponent className="size-[16px] text-[#5F6C72] hover:text-primary transition-colors duration-200 ease-in-out" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
