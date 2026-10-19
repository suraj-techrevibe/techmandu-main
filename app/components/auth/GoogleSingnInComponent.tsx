import { useFetcher } from '@remix-run/react';
import { GoogleCallbackResponse, GoogleSignIn } from './GoogleSignIn';
import { Loader2 } from 'lucide-react';

export function GoogleSignInComponent({
  googleClientId,
  redirectTo,
  className,
}: {
  googleClientId: string;
  redirectTo?: string;
  className?: string;
}) {
  const fetcher = useFetcher();
  const handleGoogleSignIn = (response: GoogleCallbackResponse) => {
    fetcher.submit(
      {
        oauth: 'google',
        token: response.credential,
        ...(redirectTo && { redirectTo }),
      },
      { action: '/api/authenticate', method: 'POST' },
    );
  };

  return fetcher.state === 'idle' ? (
    <GoogleSignIn
      GOOGLE_CLIENT_ID={googleClientId}
      onSuccessCallback={handleGoogleSignIn}
      buttonOptions={{
        shape: 'rectangular',
        size: 'large',
      }}
      className={className}
    />
  ) : (
    <div className="flex items-center justify-center my-3">
      <Loader2 className="animate-spin text-primary" />
    </div>
  );
}
