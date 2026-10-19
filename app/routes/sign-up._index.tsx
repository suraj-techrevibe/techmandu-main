import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import {
  ActionFunctionArgs,
  DataFunctionArgs,
  json,
  redirect,
} from '@remix-run/server-runtime';
import { KeyRound, Mail, PhoneCall, User, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import PasswordHideIcon from '~/assets/icons/PasswordHideIcon';
import PasswordShowIcon from '~/assets/icons/PasswordShowIcon';
import { GoogleSignInComponent } from '~/components/auth/GoogleSingnInComponent';
import { Button } from '~/components/Button';
import Container from '~/components/Container';
import { Input } from '~/components/Input';
import { GOOGLE_CLIENT_ID } from '~/constants';
import { registerCustomerAccount } from '~/providers/account/account';
import { getActiveCustomer } from '~/providers/customer/customer';
import {
  extractRegistrationFormValues,
  RegisterValidationErrors,
  validateRegistrationForm,
} from '~/utils/registration-helper';
export async function loader({ request }: DataFunctionArgs) {
  const activeCustomer = await getActiveCustomer({ request });
  if (activeCustomer.activeCustomer) {
    return redirect('/');
  }
  return { googleClientId: GOOGLE_CLIENT_ID };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const fieldErrors = validateRegistrationForm(body);
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }

  const variables = extractRegistrationFormValues(body);
  const result = await registerCustomerAccount({ request }, variables);
  if (result.__typename === 'Success') {
    return redirect('/sign-up/success');
  } else {
    const formError: RegisterValidationErrors = {
      form: result.errorCode,
    };
    return json(formError, { status: 401 });
  }
}

import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';

export default function SignUp() {
  const { googleClientId } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const formErrors = useActionData<RegisterValidationErrors>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAccountTypePersonal, setIsAccountTypePersonal] =
    useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] =
    useState<boolean>(false);

  const isSignUpPage = pathname.includes('/sign-up');

  return (
    <Container className="py-8">
      <CustomBreadCrumb items={[{ name: 'Sign Up', href: '/sign-up' }]} />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-white">
              <button
                onClick={() => navigate('/sign-in')}
                className={`flex-1 text-sm font-medium py-3 text-gray-600 hover:text-primary`}
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className={`flex-1 text-sm font-medium py-3 ${isSignUpPage
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                  }`}
              >
                Sign up
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                Create your account
              </h2>

              <Form className="space-y-4" method="post">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get('redirectTo') ?? undefined}
                />

                <Input
                  label="First name *"
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="ex.John"
                  className="w-full"
                  icon={<User size={18} className="text-gray-300" />}
                  required
                />
                <Input
                  label="Last name *"
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="ex.Doe"
                  className="w-full"
                  icon={<User size={18} className="text-gray-300" />}
                  required
                />

                <Input
                  label="Email address"
                  error={formErrors?.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  icon={<Mail size={18} className="text-gray-300" />}
                  required
                />

                <Input
                  label="Phone number"
                  error={formErrors?.phoneNumber}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="phone"
                  placeholder="ex: 9876543210"
                  icon={<PhoneCall size={18} className="text-gray-300" />}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    error={formErrors?.password}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Create your password"
                    icon={<KeyRound size={18} className="text-gray-300" />}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/3"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <PasswordHideIcon />
                    ) : (
                      <PasswordShowIcon />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    label="Repeat password"
                    error={formErrors?.repeatPassword}
                    id="repeatPassword"
                    name="repeatPassword"
                    type={isPasswordRepeatVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Confirm your password"
                    icon={<KeyRound size={18} className="text-gray-300" />}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/3"
                    onClick={() =>
                      setIsPasswordRepeatVisible(!isPasswordRepeatVisible)
                    }
                  >
                    {isPasswordRepeatVisible ? (
                      <PasswordHideIcon />
                    ) : (
                      <PasswordShowIcon />
                    )}
                  </button>
                </div>

                {formErrors?.form && (
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
                          We ran into a problem while creating your account!
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                          {formErrors.form}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-sm text-gray-500 w-full">
                    What type of customer are you?
                  </p>

                  <div className="flex items-center gap-2 p-1">
                    <label
                      className={`grow cursor-pointer relative inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium transition
                        ${isAccountTypePersonal
                          ? 'bg-primary text-white shadow'
                          : 'bg-white text-primary border border-primary/20'
                        }`}
                    >
                      <input
                        className="sr-only"
                        id="Personal"
                        name="accountType"
                        type="radio"
                        value="personal"
                        checked={isAccountTypePersonal === true}
                        onChange={() => setIsAccountTypePersonal(true)}
                      />
                      Personal
                    </label>

                    <label
                      className={`grow cursor-pointer relative inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium transition
                        ${!isAccountTypePersonal
                          ? 'bg-primary text-white shadow'
                          : 'bg-white text-primary border border-primary/20'
                        }`}
                    >
                      <input
                        className="sr-only"
                        id="Business"
                        name="accountType"
                        type="radio"
                        value="business"
                        checked={isAccountTypePersonal === false}
                        onChange={() => setIsAccountTypePersonal(false)}
                      />
                      Business
                    </label>
                  </div>

                  {/* hidden value for form submit */}
                  <input
                    type="hidden"
                    name="isBusiness"
                    value={isAccountTypePersonal ? 'false' : 'true'}
                  />
                </div>

                {!isAccountTypePersonal && (
                  <div className='flex flex-col gap-4'>
                    <Input
                      label="VAT/PAN Number"
                      error={formErrors?.vatpanNumber}
                      id="vatpanNumber"
                      name="vatpanNumber"
                      type="text"
                      placeholder="VAT/PAN Number"
                      required={!isAccountTypePersonal}
                    />
                    <Input
                      label="BussinessName"
                      error={formErrors?.bussinessName}
                      id="bussinessName"
                      name="bussinessName"
                      type="text"
                      placeholder="Bussiness Name"
                      required={!isAccountTypePersonal}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="h-4 w-4 text-gray-800 focus:outline-none focus:ring-0"
                    defaultChecked
                  />
                  <label htmlFor="rememberME" className="text-sm text-gray-700">
                    I agree to{' '}
                    <Link to="/terms" className="underline text-primary">
                      Terms & Conditions
                    </Link>
                  </label>
                </div>

                <Button
                  className="w-full bg-primary text-white !rounded-md py-3"
                  type="submit"
                >
                  Create Account
                </Button>

                <div className="flex items-center gap-3 py-3">
                  <div className="flex-1 border-t border-gray-200" />
                  <div className="text-sm text-gray-400">Or</div>
                  <div className="flex-1 border-t border-gray-200" />
                </div>

                {isAccountTypePersonal && (
                  <GoogleSignInComponent
                    googleClientId={googleClientId || ''}
                  />
                )}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-primary hover:underline">
                    {' '}
                    Login
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
