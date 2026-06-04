import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Product slides data
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=500&fit=crop",
      title: "Premium T-Shirt Collection",
      price: "$29.99",
      originalPrice: "$59.99",
      discount: "-50%",
      badge: "Best Seller"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=500&fit=crop",
      title: "Classic Denim Jacket",
      price: "$79.99",
      originalPrice: "$129.99",
      discount: "-38%",
      badge: "Trending"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=500&fit=crop",
      title: "Summer Dress",
      price: "$49.99",
      originalPrice: "$89.99",
      discount: "-44%",
      badge: "Limited Edition"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=500&fit=crop",
      title: "Sport Shoes",
      price: "$89.99",
      originalPrice: "$149.99",
      discount: "-40%",
      badge: "Hot Deal"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=500&fit=crop",
      title: "Winter Coat",
      price: "$119.99",
      originalPrice: "$199.99",
      discount: "-40%",
      badge: "New Arrival"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with email:', email);
      alert('Thank you for subscribing! 🎉');
      setEmail('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                🎉 Summer Sale is Live
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Wellcome 
              <span className="text-purple-600"> MyStore</span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Shop the latest trends with amazing discounts up to 50% off. 
              Quality products, fast delivery, and exceptional customer service.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Free Shipping</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">24/7 Support</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Secure Payment</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">30-Day Returns</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Shop Now →
              </button>
              <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition duration-300 transform hover:scale-105">
                View Collections
              </button>
            </div>

            {/* Newsletter Section */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3 font-medium">
                📧 Get 10% off on your first order
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Auto Sliding Product Showcase */}
          <div className="relative">
            {/* Main Slider Container */}
            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl overflow-hidden">
              {/* Slides */}
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0">
                      <div className="relative">
                        {/* Discount Badge */}
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                          {slide.discount}
                        </div>
                        
                        {/* Secondary Badge */}
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                          {slide.badge}
                        </div>
                        
                        {/* Product Image */}
                        <img 
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-80 object-cover rounded-xl"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="text-center mt-6">
                        <h3 className="text-xl font-bold text-gray-800">{slide.title}</h3>
                        <div className="mt-3">
                          <span className="text-3xl font-bold text-purple-600">{slide.price}</span>
                          <span className="text-gray-400 line-through ml-2">{slide.originalPrice}</span>
                        </div>
                        <button className="mt-4 w-full bg-white text-purple-600 py-2 rounded-lg font-semibold border border-purple-600 hover:bg-purple-600 hover:text-white transition duration-300">
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition duration-300 z-20"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition duration-300 z-20"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              {/* Auto-play Toggle Button */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-lg transition duration-300 z-20"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                )}
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-8 bg-purple-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="text-center mt-2 text-sm text-gray-500">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-5 -left-5 bg-yellow-400 rounded-full p-2 shadow-lg animate-bounce">
              <span className="text-xl">⚡</span>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
              <span className="text-white text-sm font-bold">NEW</span>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default HeroSection;