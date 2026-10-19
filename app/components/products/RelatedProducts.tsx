import { ProductQuery, RelatedProductsQuery } from '~/generated/graphql';
import ProductCard from '../ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface Props {
  products: RelatedProductsQuery['relatedProducts']
  
  // Array<
  //   NonNullable<
  //     ProductQuery['product']
  //   >['collections'][0]['productVariants']['items'][0]['product']
  // >;
}

const RelatedProducts = ({ products }: Props) => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-4 sm:mb-0">
          Related Products
        </h1>
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
            {products.length > 0 &&
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
                      priceWithTax={product.variants[0]?.priceWithTax}
                      productId={product.id}
                      productVariantId={product.variants[0]?.id || ''}
                      stock={product.variants[0]?.stockLevel || '0'}
                      productVariant={product.variants[0]}
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
      {products.length === 0 && (
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

export default RelatedProducts;
