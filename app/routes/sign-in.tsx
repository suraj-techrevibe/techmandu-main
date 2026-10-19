import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { KeyRound, Mail, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import PasswordHideIcon from '~/assets/icons/PasswordHideIcon';
import PasswordShowIcon from '~/assets/icons/PasswordShowIcon';
import { GoogleSignInComponent } from '~/components/auth/GoogleSingnInComponent';
import { Button } from '~/components/Button';
import Container from '~/components/Container';
import { Input } from '~/components/Input';
import { GOOGLE_CLIENT_ID } from '~/constants';
import { ErrorResult } from '~/generated/graphql';
import { login } from '~/providers/account/account';
import { getActiveCustomer } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const activeCustomer = await getActiveCustomer({ request });
  if (activeCustomer.activeCustomer) {
    return redirect('/');
  }

  return { googleClientId: GOOGLE_CLIENT_ID };
}

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/') as string;
    const result = await login(email, password, rememberMe, { request });
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const { googleClientId } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSignInPage = pathname.includes('/sign-in');

  return (
    <Container className="py-8">
      <CustomBreadCrumb items={[{ name: 'Login', href: '/sign-in' }]} />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-white">
              <button
                onClick={() => navigate('/sign-in')}
                className={`flex-1 text-sm font-medium py-3 ${
                  isSignInPage
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className={`flex-1 text-sm font-medium py-3text-gray-600 hover:text-primary`}
              >
                Sign up
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                Login to Techmandu
              </h2>

              <div className="space-y-4">
                <login.Form method="post">
                  <fieldset
                    disabled={login.state !== 'idle'}
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={searchParams.get('redirectTo') ?? undefined}
                    />
                    <div className="space-y-3">
                      <Input
                        label="Email Address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                        icon={<Mail className="text-gray-300" size={18} />}
                      />
                      <div className="relative">
                        <Input
                          label="Password"
                          id="password"
                          name="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          autoComplete="current-password"
                          required
                          placeholder="Enter your password"
                          icon={
                            <KeyRound size={18} className="text-gray-300" />
                          }
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-4 -translate-y-1/3"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        >
                          {isPasswordVisible ? (
                            <PasswordHideIcon />
                          ) : (
                            <PasswordShowIcon />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                          className="h-4 w-4 text-gray-800 focus:outline-none focus:ring-0"
                          defaultChecked
                        />
                        <label
                          htmlFor="rememberME"
                          className="text-sm text-gray-700"
                        >
                          Keep me logged in
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password ?
                      </Link>
                    </div>

                    {login.data && login.state === 'idle' && (
                      <div className="rounded-md bg-red-50 p-3">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              We ran into a problem signing you in!
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                              {login.data.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-white !rounded-md py-3"
                      >
                        <span className="flex gap-3 items-center justify-center">
                          {login.state !== 'idle' && (
                            <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                          )}
                          Login
                        </span>
                      </Button>
                    </div>
                  </fieldset>
                </login.Form>

                <div className="flex items-center gap-3 py-3">
                  <div className="flex-1 border-t border-gray-200" />
                  <div className="text-sm text-gray-400">Or</div>
                  <div className="flex-1 border-t border-gray-200" />
                </div>

                <div className="w-full">
                  <GoogleSignInComponent
                    googleClientId={googleClientId || ''}
                    className="w-full"
                  />
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{' '}
                  <Link to="/sign-up" className="text-primary hover:underline">
                    {' '}
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
