import { json, type ActionFunctionArgs } from '@remix-run/node';
import { subscribeToNewsLetter } from '~/providers/channel/channel';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
        return json(
            { success: false, error: 'Email is required' },
            { status: 400 }
        );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return json(
            { success: false, error: 'Invalid email address' },
            { status: 400 }
        );
    }

    try {
        const response = await subscribeToNewsLetter({ email }, { request });

        if (response.success) {
            return json({
                success: true,
                message: 'Successfully subscribed to our newsletter!',
            });
        } else {
            return json(
                { success: false, error: 'Subscription failed. Please try again.' },
                { status: 400 }
            );
        }
    } catch (error) {
        return json(
            { success: false, error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}

export async function loader() {
    return json({ message: 'Method not allowed' }, { status: 405 });
}
