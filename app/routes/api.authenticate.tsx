import { ActionFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { authenticate } from '~/providers/account/account';

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = formData.get('token');
  const oauth = formData.get('oauth');
  const redirectTo = formData.get('redirectTo');
  if (typeof token !== 'string') {
    return json({
      success: false,
      message: 'Invalid token',
    });
  }

  switch (oauth) {
    case 'google': {
      try {
        const res = await authenticate({ google: { token } }, { request });

        if (res.authenticate.__typename === 'CurrentUser') {
          if (redirectTo) {
            return redirect(String(redirectTo), { headers: res._headers });
          }
          return json(
            {
              success: true,
              message: null,
            },
            {
              headers: res._headers,
            },
          );
        }

        return json({
          success: false,
          message: res.authenticate.message,
        });
      } catch (error) {
        return json({
          success: false,
          message: 'Server refused to authenticate.',
        });
      }
    }
    default:
      break;
  }
  return json({
    success: false,
    message: 'Invalid oauth method',
  });
}
