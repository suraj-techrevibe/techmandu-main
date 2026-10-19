import { Outlet, useLoaderData, useLocation, useOutletContext } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import { AccountSidebar } from '~/components/account/AccountSidebar';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { getActiveCustomerDetails } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName, emailAddress } = activeCustomer!;
  const fullName = `${firstName} ${lastName}`;
  const { t } = useTranslation();
  const location = useLocation();

  // Determine breadcrumb items based on sub-route
  const getBreadcrumbItems = () => {
    const items = [{ name: 'Profile', href: '/account' }];
    const pathname = location.pathname;

    if (pathname.includes('/history')) {
      items.push({ name: 'Order History', href: '/account/history' });
    } else if (pathname.includes('/addresses')) {
      items.push({ name: 'Addresses', href: '/account/addresses' });
    } else if (pathname.includes('/password')) {
      items.push({ name: 'Change Password', href: '/account/password' });
    } else if (pathname.includes('/wishlist')) {
      items.push({ name: 'Wishlist', href: '/account/wishlist' });
    } else if (pathname.includes('/track-order')) {
      items.push({ name: 'Track Order', href: '/account/track-order' });
    } else if (pathname === '/account' || pathname === '/account/') {
      items[0].name = 'Profile Settings'; // Current page is profile
    }
    else if (pathname.includes('/cart')) {
      items.push({ name: 'Cart', href: '/account/cart' });
    }
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CustomBreadCrumb items={getBreadcrumbItems()} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AccountSidebar userName={fullName} userEmail={emailAddress} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <Outlet context={useOutletContext()} />
          </div>
        </div>
      </div>
    </div>
  );
}
