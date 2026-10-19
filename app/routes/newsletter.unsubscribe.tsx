import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { unSubscribeNewsLetter } from '~/providers/channel/channel';

type LoaderData = {
    success: boolean;
    message: string;
    alreadyUnsubscribed: boolean;
};

export async function loader({
    request,
}: LoaderFunctionArgs): Promise<LoaderData> {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
        return {
            success: false,
            message:
                'Invalid unsubscribe link. Please contact support if this is an error.',
            alreadyUnsubscribed: false,
        };
    }

    try {
        const data = await unSubscribeNewsLetter({ email }, { request });

        const message = data.removed
            ? 'You have successfully unsubscribed from our newsletter.'
            : 'You were already unsubscribed from our newsletter.';

        return {
            success: data.success,
            message,
            alreadyUnsubscribed: !data.removed,
        };
    } catch (error) {
        console.error('Unsubscribe error:', error);
        return {
            success: false,
            message:
                'There was an error while unsubscribing. Please try again later.',
            alreadyUnsubscribed: false,
        };
    }
}

export default function UnsubscribePage() {
    const { success, message, alreadyUnsubscribed } = useLoaderData<LoaderData>();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    let heading = 'Unsubscribed';
    if (success && alreadyUnsubscribed) heading = 'Already Unsubscribed';
    if (!success) heading = 'Oops!';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h1>
                <p className="text-gray-700 mb-6">{message}</p>

                <p className="text-gray-400 text-sm mb-6">
                    You will be redirected to the homepage shortly.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
}
