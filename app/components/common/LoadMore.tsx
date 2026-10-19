// import { useNavigation, useSearchParams } from '@remix-run/react';
// import { Loader2 } from 'lucide-react';

// export function LoadMoreButton() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigation = useNavigation();

//   const isNavigating = navigation.state === 'loading';

//   const currentPage = Number(searchParams.get('page')) || 1;

//   function loadMore() {
//     setSearchParams(
//       { page: String(currentPage + 1) },
//       { preventScrollReset: true },
//     );
//   }

//   return (
//     <div className="flex justify-center">
//       <button
//         onClick={loadMore}
//         className="font-semibold py-3 px-3 md:px-6 rounded-lg border border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
//       >
//         Load More {isNavigating && <Loader2 className="animate-spin" />}
//       </button>
//     </div>
//   );
// }

import { Link } from '@remix-run/react';

type LoadMoreButtonProps = {
  to: string;
};

export function LoadMoreButton({ to }: LoadMoreButtonProps) {
  return (
    <Link
      to={to}
      className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
    >
      Load More
    </Link>
  );
}
