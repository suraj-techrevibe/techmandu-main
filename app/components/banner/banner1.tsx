import React from 'react';
import { Link } from '@remix-run/react';
import banner1 from '~/assets/images/bannerImage/banner1.png'

export default function Banner1() {
  return (
    <section className="bg-indigo-300 rounded-2xl overflow-hidden shadow-md">
      <div className="relative max-w-6xl mx-auto px-6 py-10 lg:py-14">
        {/* Decorative white circle */}
        <div
          aria-hidden
          className="absolute -left-24 -bottom-24 w-[520px] h-[520px] rounded-full bg-white opacity-90 pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Text column */}
          <div className="pl-4 lg:pl-12">
            <p className="text-xs font-semibold tracking-wider text-gray-800 uppercase">
              Collect your
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extralight text-gray-900 leading-tight">
              Best Collection
              <br />
              of Years
            </h2>

            <p className="mt-6 text-2xl font-semibold text-gray-900">10% OFF</p>

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
          <div className="relative h-56 sm:h-72 lg:h-80">
            <img
              src={banner1}
              alt="banner 1"
              className="absolute -left-6 -bottom-6 w-auto max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}