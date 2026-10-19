import { Dialog, Transition } from '@headlessui/react';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigation } from '@remix-run/react';
import { Fragment } from 'react';
import { Price } from '~/components/products/Price';
import { CurrencyCode } from '~/generated/graphql';
import { CartLoaderData } from '~/routes/api.active-order';
import { Button } from '../ui/button';
import { CartContents } from './CartContents';
import { DynamicPrice } from '../products/DynamicPrice';
import CrossIcon from '~/assets/svgs/Navbar/crossIcon.svg'
import { ChevronRightIcon } from 'lucide-react';

export function CartTray({
  open,
  onClose,
  activeOrder,
  adjustOrderLine,
  removeItem,
}: {
  open: boolean;
  onClose: (closed: boolean) => void;
  activeOrder: CartLoaderData['activeOrder'];
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const currencyCode = activeOrder?.currencyCode || CurrencyCode.Usd;
  const location = useLocation();
  const editable = !location.pathname.startsWith('/checkout');
  const navigation = useNavigation();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Cart ({activeOrder?.lines?.length ?? 0} items)
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => onClose(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <img src={CrossIcon} alt="X" className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-4 sm:px-6 overflow-y-scroll overflow-x-hidden">
                    {activeOrder?.totalQuantity ? (
                      <CartContents
                        orderLines={activeOrder?.lines ?? []}
                        currencyCode={currencyCode!}
                        editable={editable}
                        removeItem={removeItem}
                        adjustOrderLine={adjustOrderLine}
                      ></CartContents>
                    ) : (
                      <div className="flex items-center justify-center h-48 text-xl text-gray-400">
                        Your cart is empty
                      </div>
                    )}
                  </div>

                  {activeOrder?.totalQuantity && editable && (
                    <div className="border-t border-gray-200 py-6 px-3 sm:px-2">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                        {/* Left: total label + amount */}
                        <div className="text-left">
                          <div className="text-sm text-black">Grand total</div>
                          <div className="mt-1 text-sm sm:text-sm text-black">
                            {currencyCode && (
                              <DynamicPrice
                                priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                              />
                            )}
                          </div>
                        </div>

                        {/* Right: action buttons (native/link buttons styled with tailwind) */}
                        <div className="w-full h-full sm:w-auto flex items-center justify-center gap-2 mx-auto">
                          <Link
                            to="/checkout"
                            onClick={() => onClose(false)}
                            className="inline-flex items-center justify-center px-3 py-4 bg-primary text-white text-xs sm:text-sm font-medium rounded-md shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition whitespace-nowrap"
                          >
                            Proceed to Checkout
                            <ChevronRightIcon className="ml-2 h-4 w-4" />
                          </Link>
                          <Link
                            to="/cart"
                            onClick={() => onClose(false)}
                            className="inline-flex items-center justify-center px-3 py-4 text-primary text-xs sm:text-sm font-medium rounded-md border-2 border-primary shadow focus:outline-none focus:ring-2 focus:ring-primary transition whitespace-nowrap"
                          >
                            view Cart
                            <ChevronRightIcon className="ml-2 h-4 w-4" />
                          </Link>

                        </div>
                      </div>

                      {/* Loading indicator */}
                      {navigation.state !== 'idle' && (
                        <div className="mt-4 flex justify-center">
                          <ArrowPathIcon className="animate-spin h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
