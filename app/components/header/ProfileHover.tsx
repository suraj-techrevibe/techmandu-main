import { Form, Link } from '@remix-run/react';
import React, { useEffect, useRef } from 'react';
import Cart from '~/assets/svgs/Navbar/cart.svg';
import Address from '~/assets/svgs/Navbar/profileHover/address.svg';
import Logout from '~/assets/svgs/Navbar/profileHover/logout.svg';
import OrderHistory from '~/assets/svgs/Navbar/profileHover/orderHistory.svg';
import Settings from '~/assets/svgs/Navbar/profileHover/settings.svg';
import TrackOrder from '~/assets/svgs/Navbar/profileHover/trackOrder.svg';
import WishList from '~/assets/svgs/Navbar/profileHover/wishlist.svg';
import { useRootLoader } from '~/utils/use-root-loader';

interface ProfileHoverProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileHover = ({ setIsMenuOpen }: ProfileHoverProps) => {
  const data = useRootLoader();
  const user = data?.activeCustomer?.activeCustomer;
  const userEmail = user?.emailAddress || '';
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const avatarUrl = data?.activeCustomer?.activeCustomer?.customFields?.avatarUrl;

  const items: {
    icon?: string;
    label: string;
    link?: string;
  }[] = [
      { icon: Settings, label: 'Profile Settings', link: '/account' },
      { icon: OrderHistory, label: 'Order History', link: '/account/history' },
      { icon: TrackOrder, label: 'Track Order', link: '/track-order' },
      { icon: Cart, label: 'Shopping Cart', link: '/checkout' },
      { icon: WishList, label: 'Wishlist', link: '/account/wishlist' },
      { icon: Address, label: 'Address', link: '/account/addresses' },
      { icon: Logout, label: 'Logout' },
    ];

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  });

  return (
    <div
      ref={wrapperRef}
      className="md:block w-72 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 overflow-hidden text-sm"
    >
      {/* user header */}
      <div className="p-3 flex items-center gap-3 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">
          {avatarUrl ?
            <img
              src={avatarUrl.preview as string}
              alt={user?.firstName || 'User'}
              className="w-full h-full object-cover rounded-full"
            />
            :
            user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'G'
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-primary font-semibold truncate">{fullName}</div>
          <div className="text-xs text-gray-500 truncate">
            {userEmail || ''}
          </div>
        </div>
      </div>

      {/* items list */}
      <nav className="flex flex-col divide-y divide-gray-100">
        {items.map(({ icon, label, link }) => (
          <div key={label} className="px-2">
            {link ? (
              <Link
                onClick={() => setIsMenuOpen((prev) => !prev)}
                to={link}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="w-6 h-6 flex items-center justify-center text-gray-600">
                  <img src={icon as string} alt={label} className="w-5 h-5" />
                </span>
                <span className="truncate">{label}</span>
              </Link>
            ) : (
              <Form
                method="post"
                action="/api/logout"
                className="w-full"
                onSubmit={() => setIsMenuOpen(false)}
              >
                <button
                  type="submit"
                  className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  <span className="w-6 h-6 flex items-center justify-center text-gray-600">
                    <img src={icon as string} alt={label} className="w-5 h-5" />
                  </span>
                  <span className="truncate">{label}</span>
                </button>
              </Form>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ProfileHover;
