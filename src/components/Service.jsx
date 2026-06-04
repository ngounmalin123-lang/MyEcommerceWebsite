import React from 'react';

const Service = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-600">
                        We provide the best services for our customers
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Service 1 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-blue-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Free Shipping
                        </h3>
                        <p className="text-gray-600">
                            Free shipping on all orders over $50
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-purple-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L16.95 7.05M5.636 5.636l1.414 1.414M12 3v2m0 14v2M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            24/7 Support
                        </h3>
                        <p className="text-gray-600">
                            Round the clock customer support
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-green-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Money Back
                        </h3>
                        <p className="text-gray-600">
                            30 days money back guarantee
                        </p>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-red-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Secure Payment
                        </h3>
                        <p className="text-gray-600">
                            100% secure payment methods
                        </p>
                    </div>

                    {/* Service 5 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-yellow-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Premium Quality
                        </h3>
                        <p className="text-gray-600">
                            Highest quality products guaranteed
                        </p>
                    </div>

                    {/* Service 6 */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-indigo-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Fast Delivery
                        </h3>
                        <p className="text-gray-600">
                            Express delivery within 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;