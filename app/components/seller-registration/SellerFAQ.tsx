import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'How can I sell on Techmandu?',
        answer:
            "To start selling on Techmandu, create a new account using your phone number. Complete the sign-up process by verifying your email, adding your pickup address, and uploading the required documents for verification. Once your store is approved, add your first product, and you're ready to sell.",
    },
    {
        question: 'What categories can I sell on Techmandu?',
        answer:
            "With multiple categories on Techmandu, you'll find the perfect fit for your products. However, it's essential to avoid listing counterfeit, dangerous, or prohibited items and those restricted by law or cultural norms.",
    },
    {
        question: 'How much commission does Techmandu charge?',
        answer:
            "Opening a shop on Techmandu is free! However, a small commission is deducted from each order's payment, with rates varying based on the product category.",
    },
];

export const SellerFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[#f3f4f6] pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#ecedf1] rounded-2xl py-6 mb-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-center text-[#312e81]">
                        Frequently asked questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg font-medium text-indigo-900">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Feel free to contact us</p>
                    <button
                        type="button"
                        className="px-8 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};
