import { Link } from '@remix-run/react';
import { GetBannerQuery } from '~/generated/graphql';
import { cn } from '~/lib/utils';

interface BannersProps {
  banners: GetBannerQuery['heroSectionBanners'];
}

const Banners = ({ banners }: BannersProps) => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-2 gap-2 lg:gap-6">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="relative overflow-hidden rounded-2xl shadow-lg aspect-[9/7]"
          >
            {/* Background Image */}
            <img
              src={banner.image.preview}
              alt={banner.title || 'Banner Image'}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content Overlay */}
            <div
              className={cn('relative h-full flex items-center p-3 md:p-6', {
                'justify-end': index === 0,
              })}
            >
              <div
                className={cn('max-w-lg', {
                  'flex flex-col items-end': index === 0,
                })}
              >
                {/* Main Header */}
                <h2
                  className={cn(
                    'text-sm sm:text-2xl md:text-3xl lg:text-6xl mb-1 md:mb-4',
                    {
                      'text-end': index === 0,
                    },
                  )}
                >
                  {banner.title}
                </h2>

                {/* Description for banner 2 */}
                {
                  <p
                    className={cn(
                      'text-[10px] sm:text-base mb-1 md:mb-4 max-w-md',
                      {
                        'text-end': index === 0,
                        'text-sm sm:text-5xl mt-1 md:mt-6':
                          banner?.description?.length < 15,
                      },
                    )}
                  >
                    {banner.description}
                  </p>
                }

                {/* CTA Button */}
                <Link
                  to={banner.ctaLink}
                  className="inline-block bg-[#F15A27] text-white font-semibold px-3 py-1 md:px-8 md:py-2 rounded-md md:rounded-lg text-[10px] md:text-base transition-colors duration-300 shadow-md"
                >
                  {banner.ctaText || 'Shop Now'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
