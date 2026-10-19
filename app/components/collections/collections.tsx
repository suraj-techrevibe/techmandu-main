import { useRootLoader } from '~/utils/use-root-loader';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import NewCollectionCard from './NewCollectionCard';

const Collections = () => {
  const data = useRootLoader();

  const nonRootCollections = data.allCollections?.filter(
    (col) => col?.parent?.name !== '__root_collection__',
  );

  return (
    <div className="container flex justify-center mx-auto">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-3">
          {nonRootCollections &&
            nonRootCollections?.length > 0 &&
            nonRootCollections.map((collection) => (
              <CarouselItem
                key={collection.id}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="h-full p-1">
                  <NewCollectionCard
                    slug={collection.slug}
                    title={collection.name}
                    imageURL={collection.featuredAsset?.preview as string}
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Collections;
