import { Link } from '@remix-run/react';

const UserNotLoggedIn = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <p className="my-4 sm:my-5 text-center font-outfit text-[16px] leading-[27px] text-[#555555] max-w-[450px] px-1">
        Join Tech Coins and get rewarded while you shop. You'll get 25 points
        for signing up. What are you waiting for?
      </p>
      <Link
        to="/sign-in"
        className="text-white text-sm sm:text-base font-outfit bg-[#253574] rounded-[3px] py-2 px-4 sm:py-[7px] sm:px-[18px] hover:bg-[#1a2654]"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default UserNotLoggedIn;
