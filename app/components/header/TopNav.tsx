import { Link } from '@remix-run/react';
import { ChevronDown } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import navLogo from '~/assets/images/navLogo.png';
import ShoppingCartIcon from '~/assets/svgs/Navbar/cart.svg';
import TrackPackage from '~/assets/svgs/Navbar/trachPackage.svg';
import VendorRegsitration from '~/assets/svgs/Navbar/vendorRegistration.svg';
import { COMPANY_EMAIL, COMPANY_PHONE } from '~/constants';
import { useCurrency } from '~/contexts/currencyContext';
import { CurrencyCode } from '~/generated/graphql';
import { useRootLoader } from '~/utils/use-root-loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import MobileSidebar from './MobileSidebar';
import Profile from './Profile';
import { SearchBar } from './SearchBar';

interface TopNavProps {
  onCartIconClick: () => void;
  cartQuantity: number;
  isSignedIn: boolean;
}

const TopNav = ({ onCartIconClick, cartQuantity, isSignedIn }: TopNavProps) => {
  const data = useRootLoader();
  const { t } = useTranslation();
  const { currency, updateCurrency } = useCurrency();

  const handleCurrencyChange = useCallback(
    (currencyCode: CurrencyCode) => {
      updateCurrency(currencyCode);
    },
    [updateCurrency],
  );

  return (
    <div className="sticky top-0 z-40">
      {/* Top Orange Info Bar */}
      <div className="bg-primary2 text-white">
        <div className="container h-10 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <a href="/contact"> Need Support ?</a>
          </div>

          {/* Currency Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger value={currency} asChild>
              <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-transparent hover:bg-primary/5 transition-colors">
                <span>{currency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[120px]">
              <DropdownMenuItem
                onClick={() => handleCurrencyChange(CurrencyCode.Usd)}
              >
                USD
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCurrencyChange(CurrencyCode.Aud)}
              >
                AUD
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCurrencyChange(CurrencyCode.Npr)}
              >
                NPR
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container py-3">
          {/* Top Row: Logo and Actions */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={navLogo}
                width={90}
                height={58}
                alt={t('commmon.logoAlt')}
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 mx-6 lg:mx-8">
              <SearchBar />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Cart */}
              <button
                className="relative flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                onClick={onCartIconClick}
                aria-label={`Open cart with ${cartQuantity} items`}
              >
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={ShoppingCartIcon} className="w-8 h-8" alt="" />
                </div>
                <span className="hidden md:block text-xs mt-1 text-gray-700">
                  Cart
                </span>
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                    {cartQuantity > 99 ? '99+' : cartQuantity}
                  </span>
                )}
              </button>

              {/* Track Package */}
              <Link
                to="/track-order"
                className="hidden sm:flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                aria-label="Track your package"
              >
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={TrackPackage} className="w-8 h-8" alt="" />
                </div>
                <span className="hidden md:block text-xs mt-1 text-gray-700">
                  Track Package
                </span>
              </Link>

              {/* Vendor Registration */}
              <Link
                to="/vendor-registration"
                className="hidden sm:flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                aria-label="Register as a vendor"
              >
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={VendorRegsitration} className="w-8 h-8" alt="" />
                </div>
                <span className="hidden md:block text-xs mt-1 text-gray-700">
                  Vendor Registration
                </span>
              </Link>

              {/* Tech Coins */}
              <Link
                to="/tech-coins"
                className="flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center relative">
                  {/* Two overlapping coins svg style */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-gray-700"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="9" cy="9" r="6" />
                    <path d="M9 6v6" />
                    <circle cx="15" cy="15" r="6" className="fill-gray-100" />
                    <path d="M15 12v6" />
                  </svg>
                </div>
                <span className="hidden md:block text-xs mt-1 text-gray-700">
                  Tech Coins
                </span>
              </Link>

              <Profile />

              {/* Mobile Sidebar Component (includes toggle button) */}
              <MobileSidebar
                collections={data.topLevelCollections}
                navLogo={navLogo}
                trackPackageIcon={TrackPackage}
                vendorRegistrationIcon={VendorRegsitration}
                contactPhone={COMPANY_PHONE}
                contactEmail={COMPANY_EMAIL}
              />
            </div>
          </div>

          {/* Mobile Search Bar - Always Visible on Small Screens */}
          <div className="lg:hidden mt-2 pt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
