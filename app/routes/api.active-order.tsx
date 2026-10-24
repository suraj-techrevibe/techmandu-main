import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  CreateAddressInput,
  CreateCustomerInput,
  ErrorCode,
  ErrorResult,
  OrderDetailFragment,
} from '~/generated/graphql';
import { getAvailableCountries } from '~/providers/checkout/checkout';
import {
  addItemToOrder,
  adjustOrderLine,
  getActiveOrder,
  removeOrderLine,
  setCustomerForOrder,
  setOrderBillingAddress,
  setOrderShippingAddress,
  setOrderNotes,
  setOrderShippingMethod,
  setPickUpDateTime,
} from '~/providers/orders/order';
import { getSessionStorage } from '~/sessions';
import {
  buildStreetLine2,
  normaliseNepalPhone,
  splitStreetLine2,
  validateRecipient,
} from '~/utils/nepal-checkout';
import { shippingFormDataIsValid } from '~/utils/validation';

export type CartLoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({ request }: DataFunctionArgs) {
  return {
    activeOrder: await getActiveOrder({ request }),
  };
}

export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();
  let shouldRedirect = false;
  const formAction = body.get('action');
  let addedProductInfo: any = undefined;
  let activeOrder: OrderDetailFragment | undefined = undefined;
  let error: ErrorResult | undefined = undefined;
  switch (formAction) {
    case 'setCheckoutShipping':
      if (shippingFormDataIsValid(body)) {
        const shippingFormData = Object.fromEntries<any>(
          body.entries(),
        ) as CreateAddressInput;

        // The browser checks these too, but the server must not trust the browser.
        // A form that sends ringRoad / landmark builds streetLine2 from them. An older caller that
        // does not send them keeps its own streetLine2, and any Ring Road typed there still counts.
        const sendsRingRoad = body.has('ringRoad');
        const ringRoadFromForm = String(body.get('ringRoad') ?? '');
        const ringRoad = sendsRingRoad
          ? ringRoadFromForm
          : splitStreetLine2(shippingFormData.streetLine2).ringRoad;
        const recipientProblems = validateRecipient({
          fullName: shippingFormData.fullName,
          phoneNumber: shippingFormData.phoneNumber,
          city: shippingFormData.city,
          ringRoad,
        });
        if (Object.keys(recipientProblems).length > 0) {
          error = {
            errorCode: ErrorCode.UnknownError,
            message: Object.values(recipientProblems).join('. '),
          };
          break;
        }
        const streetLine2 = sendsRingRoad
          ? buildStreetLine2(
              ringRoadFromForm === 'inside' || ringRoadFromForm === 'outside'
                ? ringRoadFromForm
                : undefined,
              String(body.get('landmark') ?? ''),
            )
          : shippingFormData.streetLine2;

        const result = await setOrderShippingAddress(
          {
            city: shippingFormData.city,
            company: shippingFormData.company,
            countryCode: shippingFormData.countryCode,
            customFields: shippingFormData.customFields,
            fullName: shippingFormData.fullName?.trim(),
            // Stored as plain local digits, the same form the courier booking uses.
            phoneNumber: normaliseNepalPhone(shippingFormData.phoneNumber),
            postalCode: shippingFormData.postalCode,
            province: shippingFormData.province,
            streetLine1: shippingFormData.streetLine1,
            streetLine2,
          },
          { request },
        );
        if (result.setOrderShippingAddress.__typename === 'Order') {
          activeOrder = result.setOrderShippingAddress;
          if (body.has('recipientNote')) {
            // The note is nice to have: a failure here must not block checkout.
            try {
              await setOrderNotes(
                String(body.get('recipientNote') ?? '').trim().slice(0, 500),
                { request },
              );
            } catch (e) {
              console.error('Could not save the recipient note', e);
            }
          }
        } else {
          error = result.setOrderShippingAddress;
        }
      }
      break;
    case 'setOrderBillingAddress':
      if (shippingFormDataIsValid(body)) {
        const billingFormData = Object.fromEntries<any>(
          body.entries(),
        ) as CreateAddressInput;
        const result = await setOrderBillingAddress(
          {
            city: billingFormData.city,
            company: billingFormData.company,
            countryCode: billingFormData.countryCode,
            customFields: billingFormData.customFields,
            fullName: billingFormData.fullName,
            phoneNumber: billingFormData.phoneNumber,
            postalCode: billingFormData.postalCode,
            province: billingFormData.province,
            streetLine1: billingFormData.streetLine1,
            streetLine2: billingFormData.streetLine2,
          },
          { request },
        );
        if (result.setOrderBillingAddress.__typename === 'Order') {
          activeOrder = result.setOrderBillingAddress;
        } else {
          error = result.setOrderBillingAddress;
        }
      }
      break;
    case 'setOrderCustomer': {
      const customerData = Object.fromEntries<any>(
        body.entries(),
      ) as CreateCustomerInput;
      const result = await setCustomerForOrder(
        {
          emailAddress: customerData.emailAddress,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
        },
        { request },
      );
      if (result.setCustomerForOrder.__typename === 'Order') {
        activeOrder = result.setCustomerForOrder;
      } else {
        error = result.setCustomerForOrder;
      }
      break;
    }
    case 'setShippingMethod': {
      const shippingMethodId = body.get('shippingMethodId');
      if (typeof shippingMethodId === 'string') {
        const result = await setOrderShippingMethod(shippingMethodId, {
          request,
        });
        if (result.setOrderShippingMethod.__typename === 'Order') {
          activeOrder = result.setOrderShippingMethod;
        } else {
          error = result.setOrderShippingMethod;
        }
      }
      break;
    }
    case 'removeItem': {
      const lineId = body.get('lineId');
      const result = await removeOrderLine(lineId?.toString() ?? '', {
        request,
      });
      if (result.removeOrderLine.__typename === 'Order') {
        activeOrder = result.removeOrderLine;
      } else {
        error = result.removeOrderLine;
      }
      break;
    }
    case 'adjustItem': {
      const lineId = body.get('lineId');
      const quantity = body.get('quantity');
      if (lineId && quantity != null) {
        const result = await adjustOrderLine(lineId?.toString(), +quantity, {
          request,
        });
        if (result.adjustOrderLine.__typename === 'Order') {
          activeOrder = result.adjustOrderLine;
        } else {
          error = result.adjustOrderLine;
        }
      }
      break;
    }
    case 'addItemToOrder': {
      const variantId = body.get('variantId')?.toString();
      const quantity = Number(body.get('quantity')?.toString() ?? 1);

      if (!variantId || !(quantity > 0)) {
        throw new Error(
          `Invalid input: variantId ${variantId}, quantity ${quantity}`,
        );
      }
      const result = await addItemToOrder(variantId, quantity, {
        request,
      });

      if (result.addItemToOrder.__typename === 'Order') {
        activeOrder = result.addItemToOrder;

        const addedLine = activeOrder.lines.find(
          (line) => line.productVariant.id === variantId,
        );

        if (addedLine) {
          addedProductInfo = {
            name: addedLine.productVariant.name,
            image: addedLine.featuredAsset?.preview || '',
            quantity: addedLine.quantity,
          };
        }
      } else {
        error = result.addItemToOrder;
      }
      break;
    }
    case 'addItemToOrderAndCheckout': {
      const variantId = body.get('variantId')?.toString();
      const quantity = 1;
      if (!variantId || !(quantity > 0)) {
        throw new Error(
          `Invalid input: variantId ${variantId}, quantity ${quantity}`,
        );
      }
      const result = await addItemToOrder(variantId, quantity, {
        request,
      });
      if (result.addItemToOrder.__typename === 'Order') {
        shouldRedirect = true;
        activeOrder = result.addItemToOrder;
        return redirect('/checkout');
      } else {
        error = result.addItemToOrder;
      }
      break;
    }
    case 'addPaymentToOrder': {
    }
    case 'setShippingMethodAndCheckout': {
      const shippingMethodId = body.get('shippingMethodId');
      if (typeof shippingMethodId === 'string') {
        const shippingMethodResult = await setOrderShippingMethod(
          shippingMethodId,
          {
            request,
          },
        );
        if (
          shippingMethodResult.setOrderShippingMethod.__typename === 'Order'
        ) {
          activeOrder = shippingMethodResult.setOrderShippingMethod;
        } else {
          error = shippingMethodResult.setOrderShippingMethod;
          break;
        }
      }
      const pickUpDateTime = body.get('pickUpDateTime');
      if (pickUpDateTime) {
        setPickUpDateTime(String(pickUpDateTime), { request });
      }

      const { availableCountries } = await getAvailableCountries({ request });
      if (availableCountries?.length === 0) {
        error = {
          errorCode: ErrorCode.UnknownError,
          message: 'No countries available',
        };
        break;
      }
      const shippingAddressResult = await setOrderShippingAddress(
        {
          city: 'default',
          company: 'default',
          countryCode: availableCountries[0].code,
          fullName: 'default',
          phoneNumber: 'default',
          postalCode: 'default',
          province: 'default',
          streetLine1: 'default',
          streetLine2: 'default',
        },
        { request },
      );

      if (
        shippingAddressResult.setOrderShippingAddress.__typename === 'Order'
      ) {
        activeOrder = shippingAddressResult.setOrderShippingAddress;
        return redirect('/checkout/payment');
      } else {
        error = shippingAddressResult.setOrderShippingAddress;
      }
      break;
    }

    default:
    // Don't do anything
  }
  let headers: ResponseInit['headers'] = {};
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  if (error) {
    session.flash('activeOrderError', error);
  }
  headers = {
    'Set-Cookie': await sessionStorage.commitSession(session),
  };

  // Prepare product info for toast if addItemToOrder was successful

  return json(
    {
      activeOrder: activeOrder || (await getActiveOrder({ request })),
      errorMessage: error?.message,
      addedProductInfo,
      success:
        formAction === 'addItemToOrder' && !!activeOrder && !error?.message,
      toastTriggered: Date.now(), // Unique ID for each action result
    },
    {
      headers,
    },
  );
}
