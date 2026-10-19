import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Form, useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/server-runtime';
import { Button } from '~/components/Button';

export async function action() {
  return redirect('/');
}

export default function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-md border-primary">
        <div className="bg-white pt-3 pb-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form className="space-y-6" method="post">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex justify-center">
                <div className="flex-grow">
                  <CheckCircleIcon
                    className="h-20 w-20 m-auto mb-2 text-green-700"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <p className=" mb-5">
                Password reset link has been successfully sent to your email
              </p>
              <Button className='bg-primary text-white w-full p-3 rounded-md' type="submit" onClick={()=>{navigate("/")}}>
                Go Home
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
