import { Form, Link, useLocation } from '@remix-run/react';
import {
    Heart,
    LogOut,
    MapPin,
    Menu,
    Package,
    Settings,
    ShoppingBag,
    ShoppingCart,
    X
} from 'lucide-react';
import { useState } from 'react';
import Modal from '~/components/modal/Modal';

interface SidebarMenuItem {
    icon: React.ElementType;
    text: string;
    to?: string;
    isLogout?: boolean;
}

interface AccountSidebarProps {
    userName: string;
    userEmail: string;
}

export function AccountSidebar({ userName, userEmail }: AccountSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Added from instruction
    const location = useLocation();

    const menuItems: SidebarMenuItem[] = [ // Modified from instruction diff
        { icon: Settings, text: 'Profile Settings', to: '/account' },
        { icon: ShoppingBag, text: 'Order History', to: '/account/history' },
        { icon: Package, text: 'Track Order', to: '/account/track-order' },
        { icon: ShoppingCart, text: 'Shopping Cart', to: '/account/cart' },
        { icon: Heart, text: 'Wishlist', to: '/account/wishlist' },
        { icon: MapPin, text: 'Address', to: '/account/addresses' },
        { icon: LogOut, text: 'Logout', isLogout: true },
    ];

    const isActive = (path: string) => {
        if (path === '/account') {
            return location.pathname === '/account';
        }
        return location.pathname.startsWith(path);
    };

    const SidebarContent = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
            <div className="lg:hidden flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100" // Modified from instruction diff
                >
                    <X className="w-5 h-5 text-gray-600" /> {/* Changed from <Icon> to <X> */}
                </button>
            </div>

            <div className="flex items-center gap-3 p-3 mb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                        {userName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {userName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
            </div>

            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    // const active = item.to ? isActive(item.to) : false; // Original line

                    if (item.isLogout) {
                        return (
                            <button // Changed from Form to button
                                key="logout"
                                type="button" // Changed type to button
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors group"
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsLogoutModalOpen(true); // Added to open modal
                                }}
                            >
                                <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                                <span>{item.text}</span>
                            </button>
                        );
                    }
                    const active = location.pathname === item.to; // Modified from instruction diff
                    return (
                        <Link
                            key={item.to}
                            to={item.to!}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${active
                                ? 'text-[#F15A27] bg-orange-50'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon // Changed from item.icon to Icon
                                className={`w-5 h-5 ${active ? 'text-[#F15A27]' : 'text-gray-400'}`}
                            />
                            <span>{item.text}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* Modal for Logout Confirmation */}
            <Modal isOpen={isLogoutModalOpen} close={() => setIsLogoutModalOpen(false)} size="small">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <LogOut className="w-8 h-8 text-red-600 ml-1 stroke-2" />
                    </div>

                    <h3 className="text-xl font-bold text-[#2E1065] mb-3">
                        Are you sure you want to logout?
                    </h3>

                    <p className="text-gray-600 text-sm max-w-xs mb-8 leading-relaxed">
                        You have unsaved changes. If you log out now, changes will be lost.
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Form method="post" action="/api/logout" className="w-full">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-[#2E1065] text-white font-bold text-sm hover:bg-[#1a093b] transition-colors"
                            >
                                Logout
                            </button>
                        </Form>
                        <button
                            type="button"
                            onClick={() => setIsLogoutModalOpen(false)}
                            className="w-full py-3 px-4 rounded-xl border border-[#2E1065] text-[#2E1065] font-bold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </Modal>

            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                />
            )}

            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-auto
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <SidebarContent />
            </div>
        </>
    );
}
