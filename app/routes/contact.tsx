import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { Mail, MapPin, Phone } from 'lucide-react';
import { createContact } from '~/providers/channel/channel';

import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
        return { error: 'Please fill in all required fields.' };
    }

    try {
        const response = await createContact({
            name,
            phone,
            emailAddress: email,
            subject,
            message,
        }, { request })

        return json({ success: true, data: response });
    } catch (error) {
        console.error('Error in action:', error);
        if (error instanceof Error) {
            return json(
                { success: false, error: error.message || 'Unknown error' },
                { status: 500 },
            );
        }
        return json(
            { success: false, error: 'Unknown error' },
            { status: 500 },
        );
    }

}

const contact = () => {
    const fetcher = useFetcher<typeof action>();
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const d = fetcher.data;
        if (!d) return;

        // success with returned contact object
        if ('success' in d && d.success && 'data' in d && d.data) {
            toast('Your Message has been submitted. We will get back to you soon.');
            formRef.current?.reset();
            return;
        }

        // server returned structured error payload: { success: false, error: string }
        if ('success' in d && !d.success && 'error' in d && d.error) {
            toast.error('Error: ' + d.error);
            return;
        }

        // legacy / other error shape: { error: string }
        if ('error' in d && d.error) {
            toast.error('Error: ' + d.error);
            return;
        }

        // fallback to fetcher.errors if present (non-JSON validation errors)
        // fetcher.errors is not part of the action return type but may exist from Remix
        // keep it as a last-resort diagnostic
        // @ts-ignore
        if (fetcher.errors && Array.isArray(fetcher.errors) && fetcher.errors.length > 0) {
            // @ts-ignore
            toast.error('Error: ' + (fetcher.errors[0]?.message || 'Failed to submit the form.'));
        }
    }, [fetcher.data]);


    return (
        <div className='max-w-7xl mx-auto px-4 py-6 md:py-8'>
            <CustomBreadCrumb items={[{ name: 'Contact Us', href: '/contact' }]} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                {/* Left Side - Contact Form */}
                <div className='bg-white'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>Contact Us</h2>
                    <p className='text-gray-600 mb-8'>Have any questions for us? Don't hesitate to contact us.</p>

                    <fetcher.Form ref={formRef} method='post' className='space-y-6'>
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                                Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder='Enter your name'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                required
                            />
                        </div>

                        {/* Phone and Email Row */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-2'>
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id='phone'
                                    name='phone'
                                    placeholder='Enter your name'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email Address <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder='Enter your name'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label htmlFor="subject" className='block text-sm font-medium text-gray-700 mb-2'>
                                Subject
                            </label>
                            <input
                                type="text"
                                name='subject'
                                id='subject'
                                placeholder='Enter Subject'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className='block text-sm font-medium text-gray-700 mb-2'>
                                Message <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={6}
                                placeholder='Enter your message...'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type='submit'
                                disabled={fetcher.state === 'submitting' || fetcher.state === 'loading'}
                                className='w-full md:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-800 transition duration-200 shadow-sm disabled:opacity-60'
                            >
                                {fetcher.state === 'submitting' || fetcher.state === 'loading' ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </fetcher.Form>
                </div>

                {/* Right Side - Contact Info */}
                <div className='bg-gray-50 rounded-2xl p-8 md:p-10 h-fit'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Let's Keep in Touch!</h2>
                    <p className='text-gray-600 mb-8'>
                        We would love to hear from you. Contact us for any inquiries you might have for us.
                    </p>

                    <ul className='space-y-6'>
                        <li className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm'>
                                <Phone className='w-5 h-5 text-primary' />
                            </div>
                            <p className='text-gray-900 pt-2 font-medium'>+977 982-5284717</p>
                        </li>
                        <li className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm'>
                                <Mail className='w-5 h-5 text-primary' />
                            </div>
                            <p className='text-gray-900 pt-2 font-medium'>inquiry@techmandu.com.np</p>
                        </li>
                        <li className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm'>
                                <MapPin className='w-5 h-5 text-primary' />
                            </div>
                            <p className='text-gray-900 pt-2 font-medium'>Maharajgunj, Kathmandu, Nepal</p>
                        </li>
                    </ul>
                </div>
            </div >
        </div >
    )
}

export default contact