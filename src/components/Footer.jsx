import React, { useState } from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Newsletter Section */}
            <div className="bg-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-400 mb-6">Get the latest updates and offers directly to your inbox</p>
                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        {subscribed && (
                            <p className="text-green-400 mt-4">Thank you for subscribing!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            MyStore
                        </h2>
                        <p className="text-gray-400 text-sm mb-4">
                            Quality products, competitive prices, and excellent customer service since 2024.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">FB</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">TW</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">IG</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LI</a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="/products" className="text-gray-400 hover:text-white text-sm">All Products</a></li>
                            <li><a href="/categories" className="text-gray-400 hover:text-white text-sm">Categories</a></li>
                            <li><a href="/new-arrivals" className="text-gray-400 hover:text-white text-sm">New Arrivals</a></li>
                            <li><a href="/sale" className="text-gray-400 hover:text-white text-sm">Sale</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                            <li><a href="/careers" className="text-gray-400 hover:text-white text-sm">Careers</a></li>
                            <li><a href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
                            <li><a href="/press" className="text-gray-400 hover:text-white text-sm">Press</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</a></li>
                            <li><a href="/shipping" className="text-gray-400 hover:text-white text-sm">Shipping Info</a></li>
                            <li><a href="/returns" className="text-gray-400 hover:text-white text-sm">Returns</a></li>
                            <li><a href="/faq" className="text-gray-400 hover:text-white text-sm">FAQs</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} MyStore. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                            <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                            <a href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
                            <a href="/sitemap" className="text-gray-400 hover:text-white text-sm">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
