import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import SearchProduct from './SearchProduct';
import account from './Account';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // This already exists!
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLink, setActiveLink] = useState('');

  // Function to update cart count from localStorage
  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
      setCartCount(totalItems);
    } else {
      setCartCount(0);
    }
  };

  // Function to update wishlist count
  const updateWishlistCount = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistCount(wishlist.length);
    } else {
      setWishlistCount(0);
    }
  };

  // Load counts on component mount
  useEffect(() => {
    updateCartCount();
    updateWishlistCount();
    setActiveLink(window.location.pathname);
  }, []);

  // Set up event listeners for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartCount();
      updateWishlistCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    
    const handleAddToCartClick = () => {
      setTimeout(handleCartUpdate, 100);
    };
    
    document.body.addEventListener('click', handleAddToCartClick);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      document.body.removeEventListener('click', handleAddToCartClick);
    };
  }, []);

  // Poll for cart changes (as a fallback)
  useEffect(() => {
    const interval = setInterval(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
        if (totalItems !== cartCount) {
          setCartCount(totalItems);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [cartCount]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navigateTo = (path) => {
    setActiveLink(path);
    window.location.href = path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/all-products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <button 
              onClick={() => navigateTo('/')} 
              className="flex-shrink-0 cursor-pointer group"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300">
                MyStore
              </h1>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigateTo(link.path)}
                  className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 group ${
                    activeLink === link.path
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {link.name}
                  {activeLink === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                  )}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    activeLink === link.path ? 'scale-x-100' : ''
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Button - Opens modal */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={() => navigateTo('/wishlist')}
                className="relative text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => navigateTo('/cart')}
                className="relative text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Button */}
              <button 
                onClick={() => navigateTo('/account')}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300"
              >
                <User size={20} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Search Toggle - Opens modal */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-purple-600 transition-all duration-300"
              >
                <Search size={20} />
              </button>

              {/* Mobile Cart */}
              <button 
                onClick={() => navigateTo('/cart')}
                className="relative text-gray-600 hover:text-purple-600 transition-all duration-300"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-purple-600 focus:outline-none transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Input - REMOVE THIS if you're using the modal */}
          {/* The search input below is replaced by the modal, so remove it to avoid confusion */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigateTo(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeLink === link.path
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="border-t border-gray-100 my-3"></div>
              
              <button
                onClick={() => {
                  navigateTo('/wishlist');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-all duration-300 flex items-center gap-3"
              >
                <Heart size={18} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-all duration-300 flex items-center gap-3"
              >
                <User size={18} />
                Account
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SearchProduct Modal */}
      <SearchProduct 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery=""
      />
    </>
  );
};

export default Navbar;