import { Link } from '@remix-run/react';
import { GetBannerQuery } from '~/generated/graphql';

interface BannerProps {
    banner: GetBannerQuery['heroSectionBanners'][0];
}

const CarouselComponent1 = ({ banner }: BannerProps) => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 bg-gradient-to-r from-[#AEB9E5] to-[#425BC3] rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] overflow-hidden">

            {/* Left Side: Image */}
            <div className="w-full lg:w-auto flex-shrink-0 flex items-center justify-center">
                <img
                    src={banner?.image?.preview}
                    alt="Electronic Market Hero"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full lg:max-w-xl text-center lg:text-left mb-6 sm:mb-8 lg:mb-0 lg:mr-8 xl:mr-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    {banner?.title}
                </h2>
                <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
                    {banner?.description}
                </p>
                <Link
                    to={banner?.ctaLink || '#'}
                    className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 bg-primary hover:bg-indigo-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mx-auto lg:mx-0 w-fit"
                >
                    {banner?.ctaText}
                </Link>
            </div>


        </div>
    );
};

export default CarouselComponent1;

