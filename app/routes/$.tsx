import { ArrowLeftIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import ErrorImage from '~/assets/images/errorPage.png'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full text-center">
                {/* Animated 404 Illustration */}
                <div className="mb-8">
                    <div className="relative">
                        <img
                            src={ErrorImage}
                            alt="404 Error"
                            className="w-80 h-80 mx-auto object-contain"
                        />
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Oops! Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        The page you're looking for seems to have wandered off into cyberspace.
                    </p>
                    <p className="text-sm text-gray-500">
                        Don't worry, it happens to the best of us!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    >
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                </div>

                {/* Search Suggestion */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        Or try searching for what you need:
                    </p>
                    <div className="relative max-w-xs mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    const target = e.target as HTMLInputElement;
                                    if (target.value.trim()) {
                                        window.location.href = `/search?q=${encodeURIComponent(target.value)}`;
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotFoundPage