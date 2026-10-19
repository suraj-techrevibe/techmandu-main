import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { useRootLoader } from '~/utils/use-root-loader';
import CarouselComponent1 from './CarouselComponent1';
import CarouselComponent2 from './CarouselComponent2';

const Hero = () => {
  const { activeChannel } = useRootLoader();
  const banners = activeChannel.customFields?.heroSection || [];

  return (
    <div className="container relative">
      {banners.length > 0 && (
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                {index % 2 === 0 ? (
                  <CarouselComponent1 banner={banner} />
                ) : (
                  <CarouselComponent2 banner={banner} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      )}
    </div>
  );
};

export default Hero;
