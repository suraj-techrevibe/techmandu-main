import { Link } from '@remix-run/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginSignUp from '~/assets/svgs/Navbar/login_signup.svg';
import { useRootLoader } from '~/utils/use-root-loader';
import ProfileHover from './ProfileHover';

const Profile = () => {
  const data = useRootLoader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const avatarUrl = data?.activeCustomer?.activeCustomer?.customFields?.avatarUrl;
  const user = data?.activeCustomer?.activeCustomer;
  const isSignedIn = Boolean(user);

  const toggleMenuOpen = () => {
    if (!isSignedIn) return;
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {isSignedIn ? (
        <button
          onClick={toggleMenuOpen}
          className="flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">
            {avatarUrl ?
              <img
                src={avatarUrl.preview as string}
                alt={user?.firstName || 'User'}
                className="w-full h-full object-cover rounded-full"
              />
              :
              user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'G'
            }
          </div>
          <span className="hidden md:block text-xs mt-1 text-gray-700">
            {isSignedIn ? t('account.myAccount') : t('account.signIn')}
          </span>
        </button>
      ) : (
        <Link
          to="/sign-in"
          className="flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
            <img src={LoginSignUp} className="w-4 h-4 text-gray-700" />
          </div>
          <span className="hidden md:block text-xs mt-1 text-gray-700">
            {isSignedIn ? t('account.myAccount') : 'Login/Sign Up'}
          </span>
        </Link>
      )}

      {isMenuOpen && (
        <div className="absolute top-20 right-0 md:right-5">
          <ProfileHover setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </div>
  );
};

export default Profile;
