import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { transitionOrderToState } from '~/providers/checkout/checkout';
import { getActiveOrder } from '~/providers/orders/order';
import {
  reedemTechCoins,
  revertTechCoinRedemption,
} from '~/providers/tech-coins/TechCoins';

export async function loader() {
  return null;
}

export interface RedeemTechCoinsResponse {
  message: string;
  success: boolean;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const apiAction = String(body.get('action'));

  const orderId = String(body.get('orderId'));

  if (!orderId) {
    return json<RedeemTechCoinsResponse>({
      message: 'Missing order id.',
      success: false,
    });
  }

  switch (apiAction) {
    case 'redeemTechCoins': {
      const coins = Number(body.get('coins'));
      if (!Number.isFinite(coins) || coins <= 0) {
        return json<RedeemTechCoinsResponse>({
          message: 'Enter a valid number of TechCoins.',
          success: false,
        });
      }

      try {
        await transitionOrderToState('ArrangingPayment', { request });
        const result = await reedemTechCoins(orderId, coins, { request });
        if (
          result.reedemTechCoins.__typename === 'InsufficientLoyaltyPointsError'
        ) {
          return json<RedeemTechCoinsResponse>({
            message: result.reedemTechCoins.message,
            success: false,
          });
        }
      } catch (error) {
        return json<RedeemTechCoinsResponse>({
          message: 'Failed to redeem TechCoins.',
          success: false,
        });
      }
      return json<RedeemTechCoinsResponse>({
        message: 'TechCoins redeemed successfully.',
        success: true,
      });
    }
    case 'revertTechCoinRedemption': {
      try {
        await revertTechCoinRedemption(orderId, { request });
        transitionOrderToState('AddingItems', { request });
      } catch (error) {
        return json<RedeemTechCoinsResponse>({
          message: 'Failed to remove TechCoins.',
          success: false,
        });
      }
      return json<RedeemTechCoinsResponse>({
        message: 'TechCoins removed successfully.',
        success: true,
      });
    }
    default: {
      return json<RedeemTechCoinsResponse>({
        message: 'Invalid action.',
        success: false,
      });
    }
  }
}
