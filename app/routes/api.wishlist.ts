import { ActionFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { getActiveCustomer } from '~/providers/customer/customer';
import { addItemToWishList, removeItemFromWishList } from '~/providers/wishlist/wishlist';


export async function loader() {
  return null;
}
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const channelId = formData.get('productId') as string | null;
  const isFavourite = formData.get('isFavourite') === 'true';
  const activeCustomer = await getActiveCustomer({request})


  if(!activeCustomer.activeCustomer)
    return redirect("/sign-in")



  if (!channelId) {
    return json(
      { success: false, error: 'Missing channel ID' },
      { status: 400 },
    );
  }

  try {
    const toggleFavorite = isFavourite
      ? removeItemFromWishList(channelId, { request })
      : addItemToWishList(channelId, { request });

    const res = await toggleFavorite;
    return json({ success: true });
  } catch (error: any) {
    console.error('Error in action:', error);
    return json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
