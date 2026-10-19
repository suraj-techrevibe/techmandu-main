
import React from 'react';
import { Link } from '@remix-run/react';
import banner2 from '~/assets/images/bannerImage/banner2.png';

export default function Banner2() {
  return (
    <section className="bg-rose-100 rounded-2xl overflow-hidden shadow-md">
      <div className="relative max-w-6xl mx-auto px-6 py-10 lg:py-14">
        {/* decorative white circle */}
        <div
          aria-hidden
          className="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-full bg-white opacity-90 pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Text column (on left for this banner) */}
          <div className="pr-4 lg:pr-12">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Introducing our
              <br />
              new collections
            </h3>

            <p className="mt-4 text-sm text-gray-700 max-w-xl">
              We have taken a big leap by changing our main processes and
              products.
            </p>

            <div className="mt-8">
              <Link
                to="/collections"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium shadow-sm transition-colors"
              >
                Buy Now
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="relative h-56 sm:h-72 lg:h-80 flex items-end justify-end">
            <img
              src={banner2}
              alt="banner 2"
              className="absolute -right-6 -bottom-6 w-auto max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
