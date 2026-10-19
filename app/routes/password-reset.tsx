import { ArrowPathIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Form, useActionData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import PasswordHideIcon from '~/assets/icons/PasswordHideIcon';
import PasswordShowIcon from '~/assets/icons/PasswordShowIcon';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { resetPassword } from '~/providers/account/account';
import {
  RegisterValidationErrors,
  validatePasswordResetForm,
} from '~/utils/registration-helper';

export async function action({ params, request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return;
  }

  const body = await request.formData();
  const fieldErrors = validatePasswordResetForm(body);

  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }

  const password = body.get('password') as string;

  const result = await resetPassword(token, password);

  if (result.__typename === 'CurrentUser') {
    return redirect('/sign-in');
  } else if (result.__typename === 'PasswordValidationError') {
    const formError: RegisterValidationErrors = {
      form: result.errorCode,
    };
    return json(formError, {
      status: 401,
    });
  } else {
    const resetError: ErrorResult = {
      errorCode: result?.errorCode as ErrorCode,
      message: result?.message as string,
    };
    return json(resetError, {
      status: 401,
    });
  }
}

export default function passwordResetPage() {
  const formErrors = useActionData<RegisterValidationErrors>();
  const actionData = useActionData<ErrorResult>();
  const [spinner, setSpinner] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setSpinner(false);
  }, [actionData]);
  const showSpinner = () => {
    setSpinner(true);
  };
  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg sm:rounded-2xl sm:px-10">
            <h2 className="text-center text-3xl font-semibold text-gray-900">
              Reset password
            </h2>
            <p className="mt-3 text-center text-gray-500">
              Recover your account by resetting your password.
            </p>

            <Form
              className="mt-8 space-y-6"
              method="post"
              onSubmit={() => showSpinner()}
            >
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Password"
                    error={formErrors?.password}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Create your password"
                  />
                  <button
                    type="button"
                    aria-label={
                      isPasswordVisible ? 'Hide password' : 'Show password'
                    }
                    className="absolute top-11 right-4"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <PasswordShowIcon />
                    ) : (
                      <PasswordHideIcon />
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
                  />
                  <button
                    type="button"
                    aria-label={
                      isPasswordRepeatVisible
                        ? 'Hide password'
                        : 'Show password'
                    }
                    className="absolute right-4 top-11"
                    onClick={() =>
                      setIsPasswordRepeatVisible(!isPasswordRepeatVisible)
                    }
                  >
                    {isPasswordRepeatVisible ? (
                      <PasswordShowIcon />
                    ) : (
                      <PasswordHideIcon />
                    )}
                  </button>
                </div>
              </div>

              {actionData?.message && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 mt-2">
                        {actionData.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white rounded-lg py-3 text-sm font-medium flex gap-2 items-center justify-center"
                >
                  Reset password
                  {spinner && (
                    <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
