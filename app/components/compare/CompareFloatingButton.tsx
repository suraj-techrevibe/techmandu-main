import { Link } from '@remix-run/react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useCompare } from '~/utils/use-compare';

export function CompareFloatingButton() {
  const { items } = useCompare();

  const validItems = items.filter(
    (item) => item && item.productSlug && item.productVariantId,
  );

  if (validItems.length < 2) return null;

  const compareUrl =
    '/compare?' +
    validItems
      .map(
        (item, index) =>
          `slug${index + 1}=${item.productSlug}&vid${index + 1}=${item.productVariantId}`,
      )
      .join('&');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to={compareUrl}
        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
      >
        <ArrowsRightLeftIcon className="w-5 h-5" />
        <span>View Compared List</span>
        <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {validItems.length}
        </span>
      </Link>
    </div>
  );
}
