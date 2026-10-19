import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { SearchQuery } from '~/generated/graphql';
import ProductCard from '../ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface Props {
  productsOnSale: SearchQuery['search']['items'];
}

const ProductsOnSale = ({ productsOnSale }: Props) => {
  return (
    <div className="relative bg-primary flex md:items-center gap-2 md:gap-4 pt-12 pb-1 rounded-lg md:px-6 lg:px-8">
      <div className="md:hidden block absolute bottom-14 left-8">
        <Link to={`/search`} className="flex items-center gap-2 text-white">
          View <ChevronRight />
        </Link>
      </div>
      <div className="block h-full space-y-3 md:space-y-6 text-white p-2 md:p-3">
        <h2 className="text-base md:text-2xl font-medium text-nowrap">
          Products On Sale
        </h2>
        <h3 className="text-sm font-light text-center md:text-start">
          Shop Now!
        </h3>

        <Link
          to="/search"
          className="hidden md:block bg-primary2 text-white px-6 py-2 rounded-md w-full text-center"
        >
          View All
        </Link>
      </div>
      <div className="w-full overflow-hidden relative pb-12 items-center justify-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="pl-2">
            {productsOnSale && productsOnSale?.length > 0 ? (
              productsOnSale.map((item) => (
                <CarouselItem
                  key={item.productVariantId}
                  className="basis-2/3 sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 pl-1"
                >
                  <div className="h-full p-1">
                    <ProductCard
                      name={item.productName}
                      slug={item.slug}
                      img={item.productAsset?.preview}
                      priceWithTax={item.priceWithTax}
                      productId={item.productId}
                      discountPercentage={
                        item.prices[0]?.customFields?.discountPercentage
                      }
                      discountPrice={
                        item.prices[0]?.customFields?.discountPrice
                      }
                      productVariantId={item.productVariantId}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  No products found
                </div>
                <p className="text-gray-500 text-sm pl-3">
                  Check back later for new products!
                </p>
              </div>
            )}
          </CarouselContent>
          <div className="absolute z-20 right-10 -bottom-6">
            <CarouselPrevious />
          </div>
          <div className="absolute z-20 right-14 -bottom-6">
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsOnSale;
