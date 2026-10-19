import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { search } from '~/providers/products/products';

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const q = String(body.get('q'));
  if (!q || q.length < 1) return json({ data: [] }); 
  try {
    const res = await search(
      { input: { term: q, take: 5, groupByProduct: true } },
      { request },
    );
    return json({
      data: res?.search?.items,
    });
  } catch (err) {
    console.error(err);
    return json({ data: [] });
  }
}
