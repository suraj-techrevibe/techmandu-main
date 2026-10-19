import { ActionFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { getOrderByCode } from '~/providers/orders/order';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const orderId = formData.get('orderId') as string;

  if (!orderId) {
    return json({ error: 'Please provide both Order ID and Billing Email.' });
  }

  try {
    return redirect(`/track-order?ordercode=${orderId}`);
  } catch (e) {
    console.error(e);
    return json({ error: 'An error occurred while tracking the order.' });
  }
}
