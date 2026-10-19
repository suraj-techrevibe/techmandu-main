import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { CartLoaderData } from '~/routes/api.active-order';

export function useActiveOrder() {
  const activeOrderFetcher = useFetcher<CartLoaderData>({ key: 'active-order' });
  useEffect(() => {
    if (activeOrderFetcher.state === 'idle' && !activeOrderFetcher.data) {
      activeOrderFetcher.load('/api/active-order');
    }
  }, [activeOrderFetcher]);

  function refresh() {
    activeOrderFetcher.load('/api/active-order');
  }

  const { activeOrder } = activeOrderFetcher.data ?? {};
  const removeItem = (lineId: string) => {
    activeOrderFetcher.submit(
      {
        action: 'removeItem',
        lineId,
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };
  const adjustOrderLine = (lineId: string, quantity: number) => {
    activeOrderFetcher.submit(
      {
        action: 'adjustItem',
        lineId,
        quantity: quantity.toString(),
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };
  return {
    activeOrderFetcher,
    activeOrder,
    removeItem,
    adjustOrderLine,
    refresh,
  };
}
