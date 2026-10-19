import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Collection {
  id: string;
  name: string;
  slug: string;
  children?: any[] | null;
}

interface MobileSidebarProps {
  collections: any;
  navLogo: string;
  trackPackageIcon: string;
  vendorRegistrationIcon: string;
  contactPhone: string;
  contactEmail: string;
}

const NavAccordionItem: React.FC<{
  collection: Collection;
  onClose: () => void;
  level?: number;
}> = ({ collection, onClose, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = collection.children && collection.children.length > 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between group">
        <Link
          to={`/collections/${collection.slug}`}
          onClick={onClose}
          className={`flex-1 block py-3 transition-all rounded-xl ${level === 0
            ? 'px-4 text-[15px] font-medium text-gray-700 hover:text-primary hover:bg-primary/5'
            : 'px-4 text-sm text-gray-600 hover:text-primary'
            }`}
        >
          {collection.name}
        </Link>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="p-3 text-gray-400 hover:text-primary transition-colors"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div
          className={`space-y-1 animate-in slide-in-from-top-2 duration-200 ${level === 0 ? 'pl-4 ml-2 border-l border-gray-100' : 'pl-4'
            }`}
        >
          {collection.children?.map((child) => (
            child.customFields?.showInNavBar && (
              <NavAccordionItem
                key={child.id}
                collection={child}
                onClose={onClose}
                level={level + 1}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  collections,
  navLogo,
  trackPackageIcon,
  vendorRegistrationIcon,
  contactPhone,
  contactEmail,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <Bars3Icon className="w-5 h-5" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] lg:hidden transition-all duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[101] lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link to="/" onClick={closeSidebar} className="flex items-center">
              <img
                src={navLogo}
                width={90}
                height={58}
                alt={t('commmon.logoAlt')}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            {/* Additional Links */}
            <div className="px-4 space-y-1">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Services
              </p>
              <div className="space-y-1">
                <Link
                  to="/track-order"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                  <img
                    src={trackPackageIcon}
                    className="w-6 h-6 opacity-70"
                    alt=""
                  />
                  <span>Track Package</span>
                </Link>
                <Link
                  to="/vendor-registration"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                  <img
                    src={vendorRegistrationIcon}
                    className="w-6 h-6 opacity-70"
                    alt=""
                  />
                  <span>Vendor Registration</span>
                </Link>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mt-8 pt-6 px-4 border-t border-gray-100 space-y-1">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              {collections?.map((collection: Collection) => (
                <NavAccordionItem
                  key={collection.id}
                  collection={collection}
                  onClose={closeSidebar}
                />
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="space-y-3">
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{contactPhone}</span>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs truncate">{contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
