import { useLoaderData, useNavigate } from '@remix-run/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { KHALTI_CALLBACK_URL } from '~/constants';

export async function loader() {
  return { khaltiUrl: KHALTI_CALLBACK_URL };
}

export default function KhaltiVerification() {
  const { khaltiUrl } = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString);
    if (urlSearchParams.size === 0) {
      navigate('/checkout/failure');
    }
    const orderCode = urlSearchParams.get('purchase_order_id');
    const url = khaltiUrl + `?${urlSearchParams.toString()}`;
    async function handleCallback() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data: { status: boolean } = await response.json();
        if (data.status) {
          setIsLoading(false);
          return navigate(`/checkout/confirmation/${orderCode}`);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[300px] size-full">
      {isLoading ? <ProcessingPayment /> : <Redirecting />}
    </div>
  );
}

function ProcessingPayment() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1>Processing Payment</h1>
      <Loader2 className="animate-spin" />
    </div>
  );
}

function Redirecting() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1>Redirecting to Order Confirmation</h1>
      <Loader2 className="animate-spin" />
    </div>
  );
}
