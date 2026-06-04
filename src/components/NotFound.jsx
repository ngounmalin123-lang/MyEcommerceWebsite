import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
          404
        </div>
        
        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
        
        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-purple-600 hover:text-purple-700">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;