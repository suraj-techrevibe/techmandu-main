import React from 'react';
import { Link } from '@remix-run/react';
import {
  BuildingOfficeIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const BecomeSeller = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-primary2 m-10 rounded-2xl py-12 lg:py-16 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BuildingOfficeIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">
                Start Your Business Journey
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Become a
              <span className="block text-yellow-300">Seller Today</span>
            </h2>

            <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Join thousands of successful vendor on TechMandu and grow your
              business with our powerful e-commerce platform.
            </p>

            {/* CTA Button */}
            <Link
              to="/vendor-registration"
              className="inline-flex items-center bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <BuildingOfficeIcon className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Become a Seller
              <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative lg:flex lg:justify-end">
            {/* Main Illustration Container */}
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full transform rotate-6"></div>
              <div className="absolute inset-2 bg-white/5 backdrop-blur-sm rounded-full transform -rotate-3"></div>

              {/* Content */}
              <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30">
                <div className="text-center">
                  {/* Central Icon */}
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <BuildingOfficeIcon className="w-10 h-10 text-white" />
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Row 1 */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-yellow-300/20 rounded-lg flex items-center justify-center mb-2">
                        <ShoppingBagIcon className="w-6 h-6 text-yellow-300" />
                      </div>
                      <span className="text-blue-100 text-xs">Products</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-300/20 rounded-lg flex items-center justify-center mb-2">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-300" />
                      </div>
                      <span className="text-blue-100 text-xs">Earnings</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-300/20 rounded-lg flex items-center justify-center mb-2">
                        <ChartBarIcon className="w-6 h-6 text-blue-300" />
                      </div>
                      <span className="text-blue-100 text-xs">Analytics</span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-purple-300/20 rounded-lg flex items-center justify-center mb-2">
                        <UserGroupIcon className="w-6 h-6 text-purple-300" />
                      </div>
                      <span className="text-blue-100 text-xs">Customers</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-pink-300/20 rounded-lg flex items-center justify-center mb-2">
                        <GlobeAltIcon className="w-6 h-6 text-pink-300" />
                      </div>
                      <span className="text-blue-100 text-xs">
                        Global Reach
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-300/20 rounded-lg flex items-center justify-center mb-2">
                        <TruckIcon className="w-6 h-6 text-orange-300" />
                      </div>
                      <span className="text-blue-100 text-xs">Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-300 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
