import { Link } from '@remix-run/react';
import { ActiveChannelQuery, GetBannerQuery } from '~/generated/graphql';
import placeHolderImage from '~/assets/images/placeholder.png';

type Channel = NonNullable<ActiveChannelQuery['activeChannel']>;
type CustomFields = NonNullable<Channel['customFields']>;
type Banner = NonNullable<CustomFields['heroSection']>[number];

const CarouselComponent2 = ({ banner }: { banner: Banner }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12 bg-indigo-50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 lg:p-14 w-full min-h-[220px] sm:min-h-[350px] lg:min-h-[450px] overflow-hidden">
      {/* Left Side: Text Content */}
      <div className="flex-1 text-left">
        <div className="inline-block border border-indigo-400 rounded-lg px-3 py-1 mb-2 sm:mb-4">
          <p className="text-[10px] sm:text-xs font-semibold text-indigo-900 uppercase tracking-wider">
            {banner.tagline}
          </p>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-[1.1]">
          {banner?.heading}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-8 text-[11px] sm:text-sm lg:text-lg leading-snug sm:leading-relaxed max-w-[280px] sm:max-w-md font-medium">
          {banner?.subtext}
        </p>
        <Link
          to={banner?.buttonUrl || '#'}
          className="inline-flex items-center justify-center bg-primary hover:bg-indigo-800 text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg text-[11px] sm:text-base font-medium shadow-sm hover:shadow-md transition-all duration-300"
        >
          {banner?.buttonLabel}
        </Link>
      </div>

      {/* Right Side: Image */}
      <div className="w-[35%] sm:w-1/2 flex-shrink-0 flex items-center justify-center">
        <img
          src={banner?.imageUrl || placeHolderImage}
          alt={banner?.heading || 'Hero'}
          className="w-full h-auto object-contain max-h-[140px] sm:max-h-[300px] lg:max-h-[400px] transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default CarouselComponent2;
