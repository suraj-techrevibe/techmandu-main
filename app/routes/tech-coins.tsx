import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/server-runtime';
import UserLoggedIn from '~/components/tech-coins/UserLoggedIn';
import UserNotLoggedIn from '~/components/tech-coins/UserNotLoggedIn';
import { TechcoinTrasnsactionsQuery } from '~/generated/graphql';
import { getActiveCustomer } from '~/providers/customer/customer';
import { getTechcoinTrasnsactions } from '~/providers/tech-coins/TechCoins';
import BagIcon from '~/assets/icons/techcoins/BagIcon';
import AccountIcon from '~/assets/icons/techcoins/AccountIcon';
import VisitIcon from '~/assets/icons/techcoins/VisitIcon';
import ReferIcon from '~/assets/icons/techcoins/ReferIcon';
import ShippingIcon from '~/assets/icons/techcoins/ShippingIcon';
import DiscountIcon from '~/assets/icons/techcoins/DiscountIcon';
import Discount2Icon from '~/assets/icons/techcoins/Discount2Icon';

export async function loader({ request }: LoaderFunctionArgs) {
  const activeCustomer = await getActiveCustomer({ request });
  if (activeCustomer.activeCustomer?.id) {
    const techcoinTrasnsactions = await getTechcoinTrasnsactions(
      activeCustomer.activeCustomer?.id,
      { request },
    );
    return json({
      activeCustomer: activeCustomer.activeCustomer,
      techcoinTrasnsactions: techcoinTrasnsactions,
    });
  }
  return json({
    activeCustomer: null,
    techcoinTrasnsactions: [],
  });
}

const data1 = [
  {
    title: 'Make a purchase',
    desc: '10 Tech Coins per  Rs 5',
    icon: BagIcon,
  },
  {
    title: 'Create an account',
    desc: '25 Tech Coins',
    icon: AccountIcon,
  },
  {
    title: 'Visit',
    desc: '25 points',
    icon: VisitIcon,
  },
  {
    title: 'Refer a friend',
    desc: '10 Tech Coins',
    icon: ReferIcon,
  },
];
const data2 = [
  {
    title: 'Free shipping',
    desc: '1,000 Coins',
    icon: ShippingIcon,
  },
  {
    title: '$5 discount',
    desc: '500 Coins',
    icon: DiscountIcon,
  },
  {
    title: '10% discount',
    desc: '500 Coins',
    icon: Discount2Icon,
  },
];

export default function TechCoinsPage() {
  const { activeCustomer, techcoinTrasnsactions } =
    useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto px-5 py-6">
      <div className="px-3 sm:px-4 lg:px-5">
        <div className="flex items-center justify-center flex-col">
          <h2 className="font-outfit text-[#253574] font-normal text-xl lg:text-3xl text-center">
            Loyalty & Rewards
          </h2>
        </div>
        {activeCustomer?.id ? (
          <UserLoggedIn
            loyaltyPoints={activeCustomer.availableLoyaltyPoints}
            techcoinTrasnsactions={
              techcoinTrasnsactions as TechcoinTrasnsactionsQuery['techcoinTrasnsactions']
            }
          />
        ) : (
          <UserNotLoggedIn />
        )}

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
          <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
          <h3 className="text-center text-lg sm:text-xl lg:text-2xl font-outfit text-[#000000] w-full max-w-min whitespace-nowrap shrink-0">
            Earn Tech Coins
          </h3>
          <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
        </div>
        <div className="mt-5 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {data1.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center gap-2 sm:gap-[10px] border border-[#2535744D] rounded-[6px] py-5 px-4 sm:py-6 sm:px-5 lg:py-[30px] lg:px-[20px]"
            >
              <item.icon />
              <h3 className="text-sm sm:text-base lg:text-[17px] lg:leading-[30px] font-outfit text-black text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-[16px] lg:leading-[28px] font-outfit text-[#777777] text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
          <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
          <h3 className="text-center text-lg sm:text-xl lg:text-2xl font-outfit text-[#000000] w-full max-w-min whitespace-nowrap shrink-0">
            Rewards
          </h3>
          <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
        </div>
        <div className="mt-5 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {data2.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center gap-2 sm:gap-[10px] border border-[#2535744D] rounded-[6px] py-5 px-4 sm:py-6 sm:px-5 lg:py-[30px] lg:px-[20px]"
            >
              <item.icon />
              <h3 className="text-sm sm:text-base lg:text-[17px] lg:leading-[30px] font-outfit text-black text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-[16px] lg:leading-[28px] font-outfit text-[#777777] text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
