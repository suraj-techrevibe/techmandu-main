import { useRootLoader } from '~/utils/use-root-loader';
import SecondNav from './SecondNav';
import TopNav from './TopNav';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;

  return (
    <header className="bg-white sticky top-0 z-50">
      <TopNav
        onCartIconClick={onCartIconClick}
        cartQuantity={cartQuantity}
        isSignedIn={isSignedIn}
      />
      <SecondNav />
    </header>
  );
}
