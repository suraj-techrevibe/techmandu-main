import { Link } from '@remix-run/react';
import { Menu } from 'lucide-react';
import { CollectionsQuery } from '~/generated/graphql';

interface Props {
  collections: CollectionsQuery['collections']['items'];
}
export function CollectionDropdown({ collections }: Props) {
  return (
    <section className="hidden bg-primary2 rounded-md lg:flex cursor-pointer items-center space-x-2  px-2 py-2 group relative">
      <div>
        <Menu className="w-6 h-6 text-white" />
      </div>
      <div
        className="mr-1 text-sm font-medium text-white"
      >
        Categories
      </div>

      <div className="absolute top-full z-50 group-hover:block hidden w-52 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <ul className="p-1 max-h-[300px] overflow-y-auto">
          {collections?.map((collection) => (
            <li
              key={collection.id}
              className="relative rounded-md text-sm hover:bg-primary-50/20"
              onClick={(e) => {
                const parent = e.currentTarget?.parentElement?.parentElement;
                parent?.classList.remove('group-hover:block');
                setTimeout(() => {
                  parent?.classList.add('group-hover:block');
                }, 100);
              }}
            >
              <div>
                <Link
                  to={'/collections/' + collection.slug}
                  prefetch="intent"
                  key={collection.id}
                  className="font-semibold text-gray-900 block hover:bg-gray-200 px-2 py-2"
                >
                  {collection.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
