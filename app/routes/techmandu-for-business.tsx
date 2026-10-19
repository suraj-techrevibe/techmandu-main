import { Link } from '@remix-run/react';
import { useState } from 'react';
import BusinessHero from '~/assets/images/business_hero.png';

export default function TechmanduForBusiness() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container pb-8 lg:pb-12 space-y-12">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row min-h-[500px] bg-white overflow-hidden shadow-sm relative">
                    {/* Left Side - Image Section */}
                    <div className="lg:w-1/2 relative overflow-hidden">
                        <img
                            src={BusinessHero}
                            alt="Techmandu for Business"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-orange-500/10 mix-blend-multiply" />
                    </div>

                    {/* Right Side - Content Section */}
                    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden bg-[#D9D9D9]">
                        <div className="max-w-md w-full relative z-10">
                            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
                                Techmandu <br />
                                for business
                            </h1>
                            <p className="text-lg text-black/80 mb-8 leading-relaxed">
                                We have taken a big leap by changing our main processes and products.
                            </p>
                            <Link
                                to="/sign-in"
                                className="inline-block px-10 py-4 bg-[#253574] text-white font-semibold rounded-lg hover:bg-[#1a2654] transition-all transform hover:scale-105 shadow-lg text-lg"
                            >
                                Log in to Shop
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section Container */}
                <div className="bg-[#D9ECF4] overflow-hidden shadow-sm relative p-12 lg:p-20">
                    {/* Decorative Circle - Shifted to 30% visibility */}
                    <div
                        className="absolute -right-[315px] top-1/2 -translate-y-1/2 rounded-full bg-[#B3AAAAB2]"
                        style={{
                            width: '450px',
                            height: '450px',
                            transform: 'translateY(-50%)',
                        }}
                    />

                    <div className="text-center relative z-10">
                        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6">
                            What is TechMandu for Business?
                        </h2>
                        <p className="text-lg text-black/80 mb-12 leading-relaxed max-w-4xl mx-auto">
                            Techmandu for Business is focuses on providing reliable tech products with a smooth online shopping experience.
                            It offers quality gadgets, fast delivery, trusted customer support, and a user-friendly platform
                            that makes buying electronics easier and more convenient for customers.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start max-w-5xl mx-auto px-4">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-40 rounded-full bg-white flex flex-col items-center justify-center mb-6 shadow-sm transform transition-transform hover:scale-105">
                                    <span className="text-4xl font-bold text-[#253574]">5%</span>
                                    <span className="text-lg font-semibold text-[#253574]">OFF</span>
                                </div>
                                <p className="text-base text-black/90 font-medium max-w-[200px]">
                                    Save 5% on thousand of business essentials
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm transform transition-transform hover:scale-105">
                                    <div className="text-[#253574]">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-base text-black/90 font-medium max-w-[200px]">
                                    Business services that supports you team
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm transform transition-transform hover:scale-105">
                                    <div className="text-[#253574]">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="1" y="3" width="15" height="13"></rect>
                                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-base text-black/90 font-medium max-w-[200px]">
                                    Fast delivery on same day
                                </p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <Link
                                to="/sign-up"
                                className="inline-block px-12 py-3.5 bg-[#253574] text-white font-semibold rounded-full hover:bg-[#1a2654] transition-all transform hover:scale-105 shadow-md text-lg"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Business Essentials Section */}
                <div className="bg-white overflow-hidden shadow-sm p-4 lg:p-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Side - Content */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                            <h2 className="text-2xl lg:text-3xl font-bold text-black">
                                Business essentials
                            </h2>
                            <p className="text-lg text-black/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Save now on thousands of business essentials from gadgets, furnitures, stationary and more.
                            </p>
                            <Link
                                to="/collections/business-essentials"
                                className="inline-block px-10 py-3 border-2 border-[#253574] text-[#253574] font-semibold rounded-full hover:bg-[#253574] hover:text-white transition-all transform hover:scale-105"
                            >
                                Shop now
                            </Link>
                        </div>

                        {/* Right Side - Proper Square Decorative Box */}
                        <div className="w-full max-w-[350px] lg:w-[40%] aspect-square bg-[#B3AAAAB2] rounded-[24px] shadow-inner" />
                    </div>
                </div>
                {/* FAQ Section */}
                <FAQSection />

                {/* Keep In Touch Section */}
                <div className="bg-white p-6 lg:p-10 mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#253574] flex-shrink-0">
                            Want to keep in touch?
                        </h3>
                        <p className="text-md text-black/80 font-medium text-center lg:text-left flex-grow">
                            Yes please! Keep me up to date on the latest products, eCatalogues, inspiration and more.
                        </p>
                        <Link
                            to="/sign-up"
                            className="inline-block px-10 py-3 bg-[#253574] text-white font-bold rounded-full hover:bg-[#1a2654] transition-all transform hover:scale-105 shadow-md flex-shrink-0"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do business accounts for small businesses work at Techmandu?",
            answer: "A business account gives small businesses access to exclusive pricing on a wide range of products, and automatic 5% savings. It's designed to help small businesses manage their office supply needs efficiently and affordably."
        },
        {
            question: "Are there any fees to create an Techmandu for Business account?",
            answer: "No, creating a Techmandu for Business account is completely free. We want to support businesses by providing value without any upfront costs."
        },
        {
            question: "What are the benefits of using Techmandu for corporate purchasing?",
            answer: "Benefits include tax-exempt purchasing for eligible organizations, multi-user accounts for teams, spend tracking tools, and dedicated account management support for high-volume needs."
        },
        {
            question: "What types of products are included in exclusive prices for businesses?",
            answer: "Exclusive pricing covers essential categories like laptops, office furniture, networking equipment, stationary, and bulk technology accessories."
        }
    ];

    return (
        <div className="py-12 lg:py-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#253574] text-center mb-12">
                Frequently asked questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-4 px-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`rounded-lg overflow-hidden border ${openIndex === index ? 'border-[#253574] ring-1 ring-[#253574]/20' : 'border-transparent'}`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(index === openIndex ? null : index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`faq-answer-${index}`}
                            className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openIndex === index ? 'bg-[#D9D9D9]/50' : 'bg-[#D9D9D9]'}`}
                        >
                            <span className="text-lg font-semibold text-[#253574] pr-8">
                                {faq.question}
                            </span>
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                                {openIndex === index ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                )}
                            </div>
                        </button>

                        {openIndex === index && (
                            <div
                                id={`faq-answer-${index}`}
                                role="region"
                                className="p-6 bg-[#D9D9D9]/30 border-t border-black/5"
                            >
                                <p className="text-lg text-black/80 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center space-y-6">
                <p className="text-black/60 font-medium">Feel free to contact us</p>
                <Link
                    to="/contact"
                    className="inline-block px-12 py-4 bg-[#253574] text-white font-bold rounded-lg hover:bg-[#1a2654] transition-all transform hover:scale-105 shadow-lg"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
}
