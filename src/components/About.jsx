const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                        About Us
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Learn more about our company and what makes us unique
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <img
                            src="https://wallpaperaccess.com/full/8972420.jpg" 
                            alt="About us" 
                            className="rounded-lg shadow-lg w-150 h-auto object-cover " 
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Story
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2024, we've been dedicated to providing exceptional 
                            services and products to our customers. Our journey began with 
                            a simple idea: to make a difference in people's lives through 
                            innovation and dedication.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Today, we're proud to serve thousands of satisfied customers 
                            and continue to grow with the same passion and commitment 
                            that started it all.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-blue-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                            Our Mission
                        </h3>
                        <p className="text-gray-600 text-center">
                            To deliver exceptional value and innovative solutions that 
                            empower our customers to achieve their goals and exceed their expectations.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-blue-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                            Our Vision
                        </h3>
                        <p className="text-gray-600 text-center">
                            To become a global leader in our industry, recognized for 
                            innovation, quality, and unwavering commitment to customer satisfaction.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h4>
                            <p className="text-gray-600">Constantly pushing boundaries to bring you the latest solutions.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h4>
                            <p className="text-gray-600">Building trust through transparency and ethical practices.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h4>
                            <p className="text-gray-600">Striving for the highest quality in everything we do.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Teamwork</h4>
                            <p className="text-gray-600">Collaborating to achieve remarkable results together.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h4>
                            <p className="text-gray-600">Putting our customers at the heart of every decision.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h4>
                            <p className="text-gray-600">Committed to protecting our planet for future generations.</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((member) => (
                            <div key={member} className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900">Team Member {member}</h4>
                                <p className="text-gray-600">Position Title</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;