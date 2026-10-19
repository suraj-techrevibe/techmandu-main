import { Link, useLocation } from '@remix-run/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRootLoader } from '~/utils/use-root-loader';

const SecondNav = () => {
  const data = useRootLoader();
  const location = useLocation();
  const [openCollectionId, setOpenCollectionId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Show first 8 collections in navbar
  const visibleCollections = data.topLevelCollections.slice(0, 8);

  // Close dropdown when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenCollectionId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenCollectionId(null);
  }, [location.pathname]);

  const toggleDropdown = (id: string) => {
    setOpenCollectionId(openCollectionId === id ? null : id);
  };

  const activeCollection = data.topLevelCollections.find(
    (c) => c.id === openCollectionId,
  );

  return (
    <div
      ref={navRef}
      onMouseLeave={() => setOpenCollectionId(null)} // close when leaving whole nav area (including dropdown)
      className="relative hidden lg:block bg-white border-b border-gray-200 z-30"
    >
      <div className="container">
        <div className="flex items-center justify-between h-14">
          <nav className="w-full flex items-center justify-evenly">
            {visibleCollections.map((collection) => {
              const hasChildren =
                collection.children && collection.children.length > 0;
              const isOpen = openCollectionId === collection.id;

              return (
                <div
                  key={collection.id}
                  onMouseEnter={() => setOpenCollectionId(collection.id)} // open on hover
                  className="flex items-center text-gray-700 group h-full"
                >
                  <Link
                    to={`/collections/${collection.slug}`}
                    className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap hover:bg-gray-50 rounded-md ${isOpen ? 'text-black bg-gray-50' : 'hover:text-black'
                      }`}
                  >
                    {collection.name}
                  </Link>

                  {hasChildren && (
                    <button
                      onClick={() => toggleDropdown(collection.id)}
                      className={`p-2 hover:bg-gray-50 rounded-md transition-colors focus:outline-none ml-0.5 ${isOpen
                        ? 'text-primary bg-gray-50'
                        : 'text-gray-400 hover:text-primary'
                        }`}
                      aria-label={`Toggle ${collection.name} dropdown`}
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* IT Solutions Link */}
          <Link
            to="/itsolutions"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap rounded-md hover:bg-gray-50"
          >
            IT Solutions
          </Link>
        </div>
      </div>

      {/* Floating Mega Menu Dropdown */}
      {activeCollection &&
        activeCollection.children &&
        activeCollection.children.length > 0 && (
          <div className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 w-[calc(100vw-48px)] max-w-7xl z-50">
            <div className="bg-white border border-gray-200 shadow-2xl animate-in fade-in duration-300 rounded-2xl overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 overflow-y-auto min-h-[400px] h-[calc(100vh-250px)] small-scrollbar">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-12">
                  {activeCollection.children.map((child) => (
                    child.customFields?.showInNavBar && (
                      <div key={child.id} className="break-inside-avoid mb-10">
                        <div className="flex flex-col space-y-4">
                          {/* Level 2 Header */}
                          <Link
                            to={`/collections/${child.slug}`}
                            className="text-[15px] font-medium text-black transition-colors tracking-tight"
                          >
                            {child.name}
                          </Link>

                          {/* Level 3 Items */}
                          {child.children && child.children.length > 0 && (
                            <div className="flex flex-col space-y-2.5">
                              {child.children.map((subChild) => (
                                subChild.customFields?.showInNavBar && (
                                  <Link
                                    key={subChild.id}
                                    to={`/collections/${subChild.slug}`}
                                    className="text-[14px] text-gray-500 hover:text-primary hover:translate-x-1 transition-all duration-200"
                                  >
                                    {subChild.name}
                                  </Link>
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SecondNav;
