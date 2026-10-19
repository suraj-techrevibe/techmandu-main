import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { ProductsQuery } from '~/generated/graphql';
import ProductCard from '../ProductCard';

type NormalProducts = ProductsQuery['products']['items'];

interface Props {
  products: NormalProducts;
}

export default function ProductsGrid({ products }: Props) {
  const displayProducts = products?.slice(0, 8) || [];

  if (!displayProducts.length) {
    return (
      <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
        <div className="text-gray-400 text-lg mb-2">No products found</div>
        <p className="text-gray-500 text-sm">
          Check back later for new products!
        </p>
      </div>
    );
  }

  // Chunk products into groups of 4 for the carousel slides (2x2 grid)
  const slides = [];
  for (let i = 0; i < displayProducts.length; i += 4) {
    slides.push(displayProducts.slice(i, i + 4));
  }

  const renderProductCard = (product: NormalProducts[number]) => (
    <div key={product.id} className="h-full">
      <ProductCard
        name={product.name!}
        slug={product.slug!}
        img={product.featuredAsset?.preview}
        priceWithTax={product?.variants?.[0]?.priceWithTax}
        productId={product.id!}
        productVariant={product?.variants?.[0]}
        productVariantId={product?.variants?.[0]?.id || ''}
        stock={product?.variants?.[0]?.stockLevel || '0'}
      />
    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop Grid: 2 rows of 4 columns (8 products) - Visible on XL screens */}
      {/* Note: lg: is typically 1024px, xl: is 1280px. 
          Standard grid-cols-4 fits well on lg+ screens. */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
        {displayProducts.map(renderProductCard)}
      </div>

      {/* Mobile/Tablet Carousel: Slides containing 2x2 grids - Visible below LG */}
      <div className="block lg:hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {slides.map((slideProducts, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                <div className="grid grid-cols-2 gap-2 md:gap-4 items-stretch">
                  {slideProducts.map(renderProductCard)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-6">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-2 hover:bg-black hover:text-white transition-colors" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-2 hover:bg-black hover:text-white transition-colors" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
