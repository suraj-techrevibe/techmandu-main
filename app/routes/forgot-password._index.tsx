import { XCircleIcon } from '@heroicons/react/24/outline';
import { Form, useActionData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { requestPasswordReset } from '~/providers/account/account';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  if (typeof email === 'string') {
    const result = await requestPasswordReset(email);
    if (result?.__typename === 'Success') {
      return redirect('/forgot-password/success');
    } else {
      const requestResetError: ErrorResult = {
        errorCode: result?.errorCode as ErrorCode,
        message: result?.message as string,
      };
      return json(requestResetError, {
        status: 401,
      });
    }
  }
  return json({ message: 'Email is required' }, { status: 400 });
}

export default function forgotPasswordPage() {
  const [spinner, setSpinner] = useState(false);
  const actionData = useActionData<ErrorResult>();

  useEffect(() => {
    setSpinner(false);
  }, [actionData]);
  const showSpinner = () => {
    setSpinner(true);
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <CustomBreadCrumb items={[{ name: 'Forgot Password', href: '/forgot-password' }]} />
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Forget Password
          </h2>

          <p className="mt-4 text-center text-gray-500">
            Enter the email address or mobile phone number associated with your Techmandu account.
          </p>

          <Form className="mt-6" method="post" onSubmit={() => showSpinner()}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7A2.5 2.5 0 0018.5 6h-13A2.5 2.5 0 003 8.5z"
                    />
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 8l-9 6-9-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-12 pr-3 py-3 rounded-lg border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="Email"
                />
              </div>
            </div>

            {actionData && (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{actionData.message}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-white rounded-lg py-3 font-medium flex items-center justify-center"
              >
                Send Code
                {spinner && (
                  <span className="ml-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </Button>
            </div>
          </Form>

          <div className="mt-6 text-sm text-gray-700 space-y-2">
            <div>
              Already have an account?{' '}
              <a href="/sign-in" className="text-primary hover:underline">
                Log in
              </a>
            </div>
            <div>
              Don&apos;t have account?{' '}
              <a href="/sign-up" className="text-primary hover:underline">
                Sign Up
              </a>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-100" />

          <p className="text-sm text-gray-500">
            You may contact{' '}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Customer Service
            </a>{' '}
            for help restoring access to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
