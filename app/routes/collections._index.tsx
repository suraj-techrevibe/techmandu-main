import { DataFunctionArgs } from '@remix-run/server-runtime';
import React, { useState } from 'react'
import NewCollectionCard from '~/components/collections/NewCollectionCard';
import { PaginationUi } from '~/components/Pagination/Pagination';
import { useRootLoader } from '~/utils/use-root-loader';

const ITEMS_PER_PAGE = 24;

export default function Collections() {
    const data = useRootLoader();
    const collections = data?.collections ?? [];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((collections.length || 0) / ITEMS_PER_PAGE);

    return (
        <div className="container mx-auto px-4 py-6">
            {collections.length > 0 ? (
                <ul
                    role="list"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-start justify-items-center"
                >
                    {collections.map((collection) => (
                        <li
                            key={collection.id ?? collection.name}
                            className="w-28 sm:w-32 md:w-36 lg:w-40 flex items-center justify-center"
                        >
                            <NewCollectionCard
                                title={collection.name}
                                imageURL={collection.featuredAsset?.preview as string}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 py-8">No collections available.</p>
            )}

            <div>
                <PaginationUi
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}