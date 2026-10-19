import { ActionFunctionArgs } from '@remix-run/server-runtime';
import {
  applyCouponCode,
  getActiveOrder,
  removeCouponCode,
} from '~/providers/orders/order';

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const apiAction = String(body.get('action'));
  const couponCode = String(body.get('couponCode'));

  switch (apiAction) {
    case 'applyCouponCode':
      const result = await applyCouponCode(couponCode, {
        request,
      });
      if (result.applyCouponCode.__typename === 'Order') {
        return { activeOrder: result.applyCouponCode };
      } else {
        return {
          activeOrder: await getActiveOrder({ request }),
          errorMessage: result.applyCouponCode?.message,
        };
      }
    case 'removeCouponCode':
      try {
        const res = await removeCouponCode(couponCode, { request });
        if (res.removeCouponCode?.__typename === 'Order') {
          return { activeOrder: res.removeCouponCode };
        }
      } catch (error) {
        return {
          activeOrder: await getActiveOrder({ request }),
          errorMessage: 'Failed to remove coupon code.',
        };
      }
    default:
      return {
        activeOrder: await getActiveOrder({ request }),
      };
  }
}
