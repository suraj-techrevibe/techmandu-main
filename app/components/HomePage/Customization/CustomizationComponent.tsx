import { Link } from '@remix-run/react';
import React from 'react'
import customDesktop from '~/assets/images/customDesktop.png';
import { CustomProductQuery } from '~/generated/graphql';

interface Props {
  products: CustomProductQuery['products']
}

const CustomizationComponent = ({ products }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-8 sm:mb-12 text-center lg:text-left">
        Light On The Wallet, Heavy On Customization
      </h1>

      {/* Products Grid */}
      <div className="space-y-12 lg:space-y-16">
        {products.items.map((product, index) => (
          <div
            key={product.id}
            className={`flex flex-col gap-8 lg:gap-12 ${index % 2 === 0
              ? 'lg:flex-row'
              : 'lg:flex-row-reverse'
              }`}
          >
            {/* Product Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="rounded-lg p-6 sm:p-8 lg:p-12 w-full max-w-md lg:max-w-lg">
                <img
                  src={product.assets[0]?.preview || customDesktop}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 gap-4 flex flex-col justify-center">
              <div>
                <span className="text-primary2 text-sm font-medium uppercase tracking-wide">Custom Product</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                  {product.name}
                </h2>
              </div>

              <div
                className="text-gray-600 leading-relaxed prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
              />

              {/* View Product Button */}
              <Link
                to={`/products/${product.slug}`}
                className="bg-primary hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors w-fit"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomizationComponent