import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Breadcrumbs({
  items,
}: {
  items: { name: string; slug?: string; id: string; url?: string }[];
}) {
  const { t } = useTranslation();
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 md:space-x-3 text-[12px] md:text-sm">
        <li>
          <Link to="/" className="text-[#6F6F6F] hover:text-primary transition-colors flex items-center">
            <span>Home</span>
          </Link>
        </li>
        {items
          .filter((item) => item.name !== '__root_collection__' && item.name !== 'Home')
          .map((item, index, filteredItems) => (
            <li key={item.id} className="flex items-center space-x-2 md:space-x-3">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#6F6F6F] flex-shrink-0" aria-hidden="true" strokeWidth={1} />
              {index === filteredItems.length - 1 ? (
                <span className="text-primary font-semibold truncate max-w-[150px] sm:max-w-none border-b-2 border-primary pb-0.5 leading-tight">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url || ('/collections/' + item.slug)}
                  className="text-[#6F6F6F] hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
}
