'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';

type Props = {
  images: string[];
};

export default function ProductImageCarousel({ images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
