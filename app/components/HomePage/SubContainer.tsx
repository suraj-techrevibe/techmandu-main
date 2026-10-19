import React from 'react';
import Purchase from '~/assets/svgs/subContainer/purchase.svg';
import EasyReturns from '~/assets/svgs/subContainer/easyReturn.svg';
import ShipFree from '~/assets/svgs/subContainer/shipFree.svg';

const SubContainer = () => {
  const features = [
    {
      id: 1,
      title: 'Purchase & Collection',
      description:
        'Earn points with every purchase, redeem them easily for cashback rewards.',
      icon: Purchase,
    },
    {
      id: 2,
      title: 'Easy Returns',
      description:
        'Enjoy hassle-free support for any factory defects or unexpected product faults.',
      icon: EasyReturns,
    },
    {
      id: 3,
      title: 'Ship Free',
      description:
        'Sign up now to receive free delivery on your first online order placed today.',
      icon: ShipFree,
    },
  ];

  return (
    <section className="container my-8">
      <div className="rounded-lg bg-[#F1F3FB] p-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {features.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col items-start gap-3 border border-transparent hover:shadow-md transition"
            >
              {/* icon first (top) */}
              <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                <img src={icon} alt={title} className="w-8 h-8" />
              </div>

              {/* title next */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                {title}
              </h3>

              {/* description last */}
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubContainer;
