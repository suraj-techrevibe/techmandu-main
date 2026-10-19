import LoveIcon from '~/assets/icons/techcoins/LoveIcon';
import RewardsIcon from '~/assets/icons/techcoins/RewardsIcon';
import StarIcon from '~/assets/icons/techcoins/StarIcon';
import { TechcoinTrasnsactionsQuery } from '~/generated/graphql';

interface UserLoggedInProps {
  loyaltyPoints?: number | null | undefined;
  techcoinTrasnsactions: TechcoinTrasnsactionsQuery['techcoinTrasnsactions'];
}

const data1 = [
  {
    text: 'Your rewards',
    icon: LoveIcon,
  },
  {
    text: 'Earn coins',
    icon: StarIcon,
  },
  {
    text: 'Rewards',
    icon: RewardsIcon,
  },
];
const UserLoggedIn = ({
  loyaltyPoints = 0,
  techcoinTrasnsactions,
}: UserLoggedInProps) => {
  return (
    <div className="px-3 sm:px-4 lg:px-5">
      <div className="flex items-center justify-center flex-col">
        <p className="my-4 sm:my-5 text-center font-outfit text-sm sm:text-[16px] sm:leading-[27px] text-[#555555] max-w-[450px] px-1">
          You have {loyaltyPoints} points
        </p>

        <div className="flex items-center justify-center border-b border-[#533C511A] flex-wrap">
          {data1.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 sm:gap-2 py-3 px-3 sm:py-4 sm:px-4 lg:py-[17px] lg:px-[21px]"
            >
              <item.icon />
              <span className="text-sm sm:text-base font-outfit text-[#555555]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
        <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
        <h3 className="text-center text-lg sm:text-xl lg:text-2xl font-outfit text-[#000000] w-full max-w-min whitespace-nowrap shrink-0">
          Your rewards
        </h3>
        <div className="bg-[#00000033] w-full h-[1px] rounded-sm" />
      </div>
      {techcoinTrasnsactions.length > 0 ? (
        <div className="mt-5 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {techcoinTrasnsactions.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center gap-2 sm:gap-[10px] border border-[#2535744D] rounded-[6px] py-5 px-4 sm:py-6 sm:px-5 lg:py-[30px] lg:px-[20px]"
            >
              <h3 className="text-sm sm:text-base lg:text-[17px] lg:leading-[30px] font-outfit text-black text-center">
                {item.description}
              </h3>
              <p className="text-xs sm:text-sm lg:text-[16px] lg:leading-[28px] font-outfit text-[#777777] text-center">
                {item.points}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg sm:text-xl lg:text-2xl font-outfit text-[#000000] w-full mt-10">
          No rewards found
        </p>
      )}
    </div>
  );
};

export default UserLoggedIn;
