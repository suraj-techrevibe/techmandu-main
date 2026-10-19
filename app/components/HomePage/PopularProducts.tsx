import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { ProductsQuery } from '~/generated/graphql';
import ProductsGrid from '../products/ProductsGrid';

interface Props {
  products: ProductsQuery['products']['items'];
}

const PopularProducts = ({ products }: Props) => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold  text-black">Popular Products</h2>
        <Link
          to="/search"
          className="inline-flex p-3 rounded-lg border-2 items-center gap-2 text-black hover:text-primary-dark font-medium"
        >
          <span>View All</span> <ChevronRight />
        </Link>
      </div>

      <ProductsGrid products={products} />
    </div>
  );
};

export default PopularProducts;
