import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { LoadMoreButton } from '~/components/common/LoadMore';
import { getCollections } from '~/providers/collections/collections';

const COLLECTIONS_PER_PAGE = 8;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;

  // Fetch collections with pagination
  const collectionsResponse = await getCollections(request, {
    take: COLLECTIONS_PER_PAGE,
    skip: (page - 1) * COLLECTIONS_PER_PAGE,
  });

  const collections = collectionsResponse || [];

  const hasMoreCollections = collections.length === COLLECTIONS_PER_PAGE;

  return json({
    collections,
    hasMoreCollections,
    page,
  });
}

export default function CategoriesPage() {
  const { collections, hasMoreCollections, page } =
    useLoaderData<typeof loader>();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.slug}`}
            className="group block border rounded-lg p-4 hover:shadow transition"
          >
            {collection.featuredAsset?.preview ? (
              <img
                src={collection.featuredAsset.preview}
                alt={collection.name}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-md mb-3" />
            )}

            <p className="text-gray-800 font-medium group-hover:text-pink-600">
              {collection.name}
            </p>
          </Link>
        ))}
      </div>

      {hasMoreCollections && (
        <div className="flex justify-center mt-8">
          <LoadMoreButton to={`/categories?page=${page + 1}`} />
        </div>
      )}
    </div>
  );
}
