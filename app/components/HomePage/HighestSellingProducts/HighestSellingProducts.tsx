import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import ProductCard from '~/components/ProductCard';
import { HighestSellingProductsQuery } from '~/generated/graphql';

interface Props {
  products: NonNullable<
    HighestSellingProductsQuery['highestSellingProduct']
  >['items'];
}

const HighestSellingProducts = ({ products }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-4 sm:mb-0">
          Highest Selling Products
        </h1>
        <Link
          to="/search"
          className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm sm:text-base transition-colors group"
        >
          See All Products
          <ArrowRightCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {products?.length > 0 &&
          products?.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              slug={product.slug}
              img={product.featuredAsset?.preview}
              priceWithTax={product.variants[0]?.price}
              productId={product.id}
              productVariant={product.variants[0]}
              productVariantId={product.variants[0]?.id || ''}
              stock={product.variants[0]?.stockLevel || '0'}
            />
          ))}
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

export default HighestSellingProducts;
