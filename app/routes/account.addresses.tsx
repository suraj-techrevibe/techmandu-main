import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { getFixedT } from '~/i18next.server';
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from '~/providers/account/account';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await getActiveCustomerAddresses({ request });
  const activeCustomerAddresses = res.activeCustomer;
  return json({ activeCustomerAddresses });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id') as string | null;
  const _action = formData.get('_action');
  const t = await getFixedT(request);

  // Verify that id is set
  if (!id || id.length === 0) {
    return json<ErrorResult>(
      {
        errorCode: ErrorCode.IdentifierChangeTokenInvalidError, // TODO: I dont think this error is 100% appropriate - decide later
        message: t('address.idError'),
      },
      {
        status: 400, // Bad request
      },
    );
  }

  if (_action === 'setDefaultShipping') {
    updateCustomerAddress({ id, defaultShippingAddress: true }, { request });
    return null;
  }

  if (_action === 'setDefaultBilling') {
    updateCustomerAddress({ id, defaultBillingAddress: true }, { request });
    return null;
  }

  if (_action === 'deleteAddress') {
    const { success } = await deleteCustomerAddress(id, { request });
    return json(null, { status: success ? 200 : 400 });
  }

  return json<ErrorResult>(
    {
      message: t('common.unknowError'),
      errorCode: ErrorCode.UnknownError,
    },
    {
      status: 400,
    },
  );
}

export default function AccountAddresses() {
  const { activeCustomerAddresses } = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet />
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-8">
          <Link
            to="/account/addresses/new"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-[#544E93] text-[#544E93] font-semibold text-sm hover:bg-[#544E93] hover:text-white transition-colors"
          >
            Add New Address{' '}
            <span className="text-xl leading-none font-light block pb-0.5">
              +
            </span>
          </Link>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeCustomerAddresses?.addresses!.map((address) => {
            const isDefault =
              address.defaultBillingAddress || address.defaultShippingAddress;
            const title = address.defaultBillingAddress
              ? 'Billing Address'
              : address.defaultShippingAddress
              ? 'Shipping Address'
              : 'Address';

            return (
              <div
                key={address.id}
                className="bg-[#F1F3FB] rounded-xl p-6 relative flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  {address.defaultBillingAddress && (
                    <span className="px-3 py-1 bg-[#aeb3bb] text-[#544E93] text-xs font-bold rounded-md uppercase tracking-wider">
                      Default
                    </span>
                  )}
                  {address.defaultShippingAddress &&
                    !address.defaultBillingAddress && (
                      <span className="px-3 py-1 bg-[#aeb3bb] text-[#544E93] text-xs font-bold rounded-md uppercase tracking-wider">
                        Default
                      </span>
                    )}
                </div>

                <div className="flex flex-col gap-1 text-sm text-gray-800">
                  <p className="font-bold text-base mb-1">{address.fullName}</p>
                  <p className="leading-relaxed">
                    {[
                      address.streetLine1,
                      address.streetLine2,
                      address.city,
                      address.province,
                      address.country?.name,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                  {address.phoneNumber && (
                    <p className="mt-1">Phone Number: {address.phoneNumber}</p>
                  )}
                  {/* Email is not strictly on address object usually, but image shows it. 
                           Order has customer email. Address might not. 
                           We'll check if we have it, otherwise omit or use a placeholder if required? 
                           The type Address usually doesn't have email. 
                           However, image shows 'Jimmy.smith1996@gmail.com'. 
                           If unavailable, we hide it. */}
                </div>

                <div className="mt-auto pt-4">
                  <Link
                    to={`/account/addresses/${address.id}`}
                    className="inline-block px-8 py-2.5 rounded-lg border-2 border-[#544E93] text-[#544E93] font-medium text-sm hover:bg-[#544E93] hover:text-white transition-colors"
                  >
                    Edit Address
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
