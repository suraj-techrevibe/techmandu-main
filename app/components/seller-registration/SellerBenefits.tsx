import { HandCoins, Settings, TrendingUp } from 'lucide-react';

export const SellerBenefits = () => {
    return (
        <section className="bg-[#f3f4f6] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-semibold text-center text-gray-900 mb-4">
                    Benefits
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    You will get many features that help you...
                </p>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                    {/* Left side - Benefits cards in specific layout */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* First row: Two cards side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Benefit 1: Save costs */}
                            <div className="bg-[#ecedf1] rounded-2xl p-8 text-center shadow-sm">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <HandCoins className="w-12 h-12 text-[#312e81]" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                                    Save costs
                                </h3>
                                <p className="text-sm text-[#4b5563] leading-relaxed">
                                    Save the cost of handling calls and providing free service to your customers
                                </p>
                            </div>

                            {/* Benefit 2: Self-integration */}
                            <div className="bg-[#ecedf1] rounded-2xl p-8 text-center shadow-sm">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <Settings className="w-12 h-12 text-[#312e81]" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                                    Self-integration
                                </h3>
                                <p className="text-sm text-[#4b5563] leading-relaxed">
                                    Khalna Basalasso integrates with your systems in minutes
                                </p>
                            </div>
                        </div>

                        {/* Second row: One card centered */}
                        <div className="flex justify-center">
                            <div className="bg-[#ecedf1] rounded-2xl p-8 text-center shadow-sm max-w-xl w-full">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <TrendingUp className="w-12 h-12 text-[#312e81]" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                                    Improve the customer experience
                                </h3>
                                <p className="text-sm text-[#4b5563] leading-relaxed px-4">
                                    Simplify the process for your customers by removing the need to switch between devices and applications
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Media */}
                    <div className="w-full lg:w-1/3 flex items-center justify-center">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg group">
                            {/* <img
                                src="https://images.unsplash.com/photo-1586333216068-0e44b045331c?q=80&w=1470&auto=format&fit=crop"
                                alt="Service Delivery"
                                className="w-full h-full object-cover"
                            /> */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/10">
                                <button
                                    type="button"
                                    className="w-20 h-20 rounded-full bg-[#312e81] flex items-center justify-center hover:bg-[#1e1b4b] transition-all transform  shadow-2xl"
                                    aria-label="Play video"
                                >
                                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
