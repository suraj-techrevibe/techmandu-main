import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '~/lib/utils';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface CustomBreadCrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const CustomBreadCrumb: React.FC<CustomBreadCrumbProps> = ({
  items,
  className,
}) => {
  return (
    <nav className={cn('flex mb-6', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 md:space-x-3 text-[12px] md:text-sm">
        <li>
          <Link
            to="/"
            className="text-[#6F6F6F] hover:text-primary transition-colors flex items-center"
          >
            <span>Home</span>
          </Link>
        </li>
        {items
          .filter((item) => item.name !== 'Home')
          .map((item, index, filteredItems) => (
            <li
              key={index}
              className="flex items-center space-x-2 md:space-x-3"
            >
              <ChevronRight
                className="w-4 h-4 md:w-5 md:h-5 text-[#6F6F6F] flex-shrink-0"
                strokeWidth={1}
              />
              {index === filteredItems.length - 1 ? (
                <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none border-b-2 border-primary pb-0.5 leading-tight">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.href}
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
};

export default CustomBreadCrumb;
