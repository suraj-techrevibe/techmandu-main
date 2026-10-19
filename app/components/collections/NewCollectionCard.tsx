import { Link } from '@remix-run/react';
import { PLACEHOLDER_IMAGE } from '~/constants';

interface NewCollectionCardProps {
  slug: string;
  title: string;
  imageURL: string;
}

const NewCollectionCard = ({
  slug,
  title,
  imageURL,
}: NewCollectionCardProps) => {
  return (
    <Link
      to={`/collections/${slug}`}
      className="flex flex-col items-center space-y-2 px-3"
    >
      <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
        <img
          src={imageURL ?? PLACEHOLDER_IMAGE}
          alt={title}
          className="size-full object-cover"
        />
      </div>
      <h3 className="text-sm sm:text-base text-center text-gray-700">
        {title}
      </h3>
    </Link>
  );
};

export default NewCollectionCard;
