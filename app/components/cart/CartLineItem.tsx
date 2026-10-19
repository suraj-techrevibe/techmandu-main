import { Link, useOutletContext } from '@remix-run/react';
import { ShieldCheck, Trash2, Truck } from 'lucide-react';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { OrderDetailFragment } from '~/generated/graphql';
import { QuantityControl } from './QuantityControl';
import { PLACEHOLDER_IMAGE } from '~/constants';

interface CartLineItemProps {
    line: OrderDetailFragment['lines'][0];
    isLoading?: boolean;
    removeItem: (lineId: string) => void;
}

export function CartLineItem({
    line,
    isLoading = false,
    removeItem,
}: CartLineItemProps) {
    const context = useOutletContext<any>();
    const adjustOrderLine = context?.adjustOrderLine;

    return (
        <div
            className="shadow-md bg-[#fdfdfdb0] rounded-lg p-4"
            style={{
                opacity: isLoading ? 0.5 : 1,
                transition: 'opacity 0.2s ease-in-out',
                pointerEvents: isLoading ? 'none' : 'auto',
            }}
        >
            <div className="flex gap-4 items-center">
                {/* Product Image */}
                <div className="flex-shrink-0 bg-white rounded-lg p-2">
                    <img
                        src={line.featuredAsset?.preview ? line.featuredAsset?.preview + '?preset=thumb' : PLACEHOLDER_IMAGE}
                        alt={line.productVariant.name}
                        className="w-[104px] h-[104px] object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <Link
                            to={`/products/${line.productVariant.product.slug}`}
                            className="text-base font-medium text-gray-900 hover:text-[#F15A27] mb-2 block"
                        >
                            {line.productVariant.name}
                        </Link>
                    </div>

                    {/* Price */}
                    <div className="text-base font-semibold text-gray-900 mt-2">
                        <DynamicPrice priceWithTax={line.linePriceWithTax} />
                    </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-end justify-between self-stretch gap-1">
                    <button
                        onClick={() => removeItem(line.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-6 h-6" />
                    </button>

                    <QuantityControl
                        quantity={line.quantity}
                        onAdjust={(newQty) => adjustOrderLine?.(line.id, newQty)}
                        min={1}
                    />
                </div>
            </div>
        </div>
    );
}
