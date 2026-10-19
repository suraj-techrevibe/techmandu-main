import { Link } from '@remix-run/react';
import { ArrowRightCircleIcon } from 'lucide-react';
import ProductCard from '~/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { OurProductsQuery } from '~/generated/graphql';

interface Props {
  products: OurProductsQuery['products']['items'];
}

const OurProducts = ({ products }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-4 sm:mb-0">
          Our Products
        </h1>
        <Link
          to="/search"
          className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm sm:text-base transition-colors group"
        >
          Check All Products
          <ArrowRightCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 4,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-3">
            {products?.length > 0 &&
              products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-1 sm:pl-2 md:pl-3 basis-1/2 md:basis-1/4"
                >
                  <div className="h-full">
                    <ProductCard
                      name={product.name}
                      slug={product.slug}
                      img={product.featuredAsset?.preview}
                      priceWithTax={product.variants[0]?.price}
                      productId={product.id}
                      productVariant={product.variants[0]}
                      productVariantId={product.variants[0]?.id || ''}
                      stock={product.variants[0]?.stockLevel || '0'}
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
        </Carousel>
      </div>

      {/* Empty State */}
      {products?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No products found</div>
          <p className="text-gray-500 text-sm">
            Check back later for new products!
          </p>
        </div>
      )}
    </div>
  );
};

export default OurProducts;
