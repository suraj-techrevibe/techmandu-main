import { useFetcher, useLoaderData, useOutletContext } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { getActiveCustomer } from '~/providers/customer/customer';
import { getWishlists } from '~/providers/wishlist/wishlist';
import placeholderImage from '~/assets/images/placeholder.png';
import { DynamicPrice } from '~/components/products/DynamicPrice';
import { OutletContext } from '~/types';

export async function loader({ request }: DataFunctionArgs) {
    const { activeCustomer } = await getActiveCustomer({ request })

    if (!activeCustomer) {
        return redirect("/sign-in")
    }

    const wishlists = await getWishlists({ request })


    return json({ wishlists })
}

export default function Wishlist() {
    const { wishlists } = useLoaderData<typeof loader>();

    const wishlistItems = wishlists.items.map((item) => ({
        id: item.productVariant.id,
        name: item.productVariant.name,
        category: item.productVariant.product.collections[0]?.name || 'UNCATEGORIZED',
        price: item.productVariant.priceWithTax,
        stockStatus: item.productVariant.stockLevel,
        image: item.productVariant.product?.featuredAsset?.preview || placeholderImage,
    }));

    const { activeOrderFetcher } = useOutletContext<OutletContext>();

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
    const removeFromWishList = (varientId: string) => {
        fetcher.submit(
            {
                productId: varientId,
                isFavourite: 'true',
            },
            {
                method: 'post',
                action: '/api/wishlist',
            },
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Wishlist ({wishlistItems.length})</h1>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 px-6 py-4 rounded-t-xl text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-200">
                <div className="col-span-5">Products</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Stock Status</div>
                <div className="col-span-3 text-right md:text-right">Actions</div>
            </div>

            <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200">
                {wishlistItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex flex-col md:grid md:grid-cols-12 gap-6 items-center p-6 hover:bg-gray-50 transition-colors duration-200 ${index !== wishlistItems.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                    >
                        {/* Product Info */}
                        <div className="col-span-5 flex items-center gap-5 w-full">
                            <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/200x200?text=No+Image";
                                    }}
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[#F15A27] text-xs font-bold uppercase mb-1.5 tracking-wider">
                                    {item.category}
                                </p>
                                <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 md:pr-4">
                                    {item.name}
                                </h3>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 w-full md:w-auto flex md:block justify-between items-center group">
                            <span className="md:hidden text-sm text-gray-500 font-medium">Price:</span>
                            <span className="text-gray-900 font-semibold"><DynamicPrice priceWithTax={item.price} /></span>
                        </div>

                        {/* Stock Status */}
                        <div className="col-span-2 w-full md:w-auto flex md:block justify-between items-center">
                            <span className="md:hidden text-sm text-gray-500 font-medium">Status:</span>
                            <span className={`font-bold text-xs uppercase px-2 py-1 rounded-full ${item.stockStatus === 'IN_STOCK'
                                ? 'text-green-700 bg-green-50'
                                : 'text-red-700 bg-red-50'
                                }`}>
                                {item.stockStatus}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-3 w-full md:w-auto flex items-center justify-end md:justify-end gap-3">
                            <button onClick={() => item.id && handleAddToCart(item.id)} className="flex items-center gap-2 px-4 py-2 border-2 border-[#544E93] text-[#544E93] rounded-lg text-sm font-bold hover:bg-[#544E93] hover:text-white transition-all whitespace-nowrap active:scale-95">
                                <span>Add to cart</span>
                                <ShoppingCart className="w-4 h-4 stroke-[2.5px]" />
                            </button>
                            <button onClick={() => removeFromWishList(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
