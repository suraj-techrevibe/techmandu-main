import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '@remix-run/react';
import clsx from 'clsx';
import { ComponentProps } from 'react';

export type OrderPaginationProps = {
    appliedPaginationLimit: number;
    totalItems: number;
    appliedPaginationPage: number;
    maxVisiblePages?: number;
};

export function OrderPagination({
    appliedPaginationLimit,
    totalItems,
    appliedPaginationPage,
    maxVisiblePages = 6,
    ...props
}: OrderPaginationProps & ComponentProps<'div'>) {
    const navigation = useNavigation();
    const totalPages = Math.ceil(totalItems / appliedPaginationLimit);

    const getPageNumbers = () => {
        const pages: number[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(1, appliedPaginationPage - halfVisible);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const isLoading = navigation.state !== 'idle';

    return (
        <div
            {...props}
            className={clsx(
                'flex items-center justify-center gap-3',
                props.className,
            )}
        >
            {/* Previous Button */}
            <button
                name="page"
                type="submit"
                value={appliedPaginationPage - 1}
                disabled={appliedPaginationPage <= 1 || isLoading}
                className={clsx(
                    'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all',
                    appliedPaginationPage <= 1 || isLoading
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-[#2D1B69] text-[#2D1B69] hover:bg-[#2D1B69] hover:text-white'
                )}
                aria-label="Previous page"
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((pageNum) => (
                    <button
                        key={pageNum}
                        name="page"
                        type="submit"
                        value={pageNum}
                        disabled={isLoading}
                        className={clsx(
                            'w-12 h-12 rounded-full font-medium transition-all',
                            pageNum === appliedPaginationPage
                                ? 'bg-[#2D1B69] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            isLoading && 'cursor-not-allowed opacity-50'
                        )}
                        aria-label={`Page ${pageNum}`}
                        aria-current={pageNum === appliedPaginationPage ? 'page' : undefined}
                    >
                        {String(pageNum).padStart(2, '0')}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                name="page"
                type="submit"
                value={appliedPaginationPage + 1}
                disabled={appliedPaginationPage >= totalPages || isLoading}
                className={clsx(
                    'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all',
                    appliedPaginationPage >= totalPages || isLoading
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-[#2D1B69] text-[#2D1B69] hover:bg-[#2D1B69] hover:text-white'
                )}
                aria-label="Next page"
            >
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
    );
}
