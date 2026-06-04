import React, { useState, useEffect } from 'react';
import { Search, X, Star, Eye, TrendingUp, Clock } from 'lucide-react';
import api from '../service/api';

const SearchProduct = ({ isOpen, onClose, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  // Load products on mount
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      loadRecentSearches();
    }
  }, [isOpen]);

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setTrendingProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load recent searches from localStorage
  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  // Save search to recent searches
  const saveToRecentSearches = (query) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecentSearches(searchQuery.trim());
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      onClose();
    }
  };

  // Handle quick product click
  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
    onClose();
  };

  // Handle recent search click
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    saveToRecentSearches(query);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
    onClose();
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const rate = rating?.rate || 4.5;
    const fullStars = Math.floor(rate);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} size={14} className="text-gray-300" />);
    }
    return stars;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-0 top-0 z-50 animate-slide-down">
        <div className="bg-white shadow-2xl rounded-b-2xl">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Search Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Search Products
                </h2>
                <p className="text-gray-500 text-sm mt-1">Find your favorite products</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for? (e.g., laptop, shirt, jewelry...)"
                className="w-full px-5 py-4 pl-14 pr-32 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Results Preview */}
            {searchQuery.trim() && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Search Results ({filteredProducts.length})
                  </h3>
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={handleSearch}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                    >
                      View All Results →
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-purple-50 hover:border-purple-200 cursor-pointer transition-all duration-300 group"
                      >
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-2"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 line-clamp-1">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-xs text-gray-500">
                              ({product.rating?.count || 0})
                            </span>
                          </div>
                          <p className="text-purple-600 font-bold mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Eye size={18} className="text-gray-400 group-hover:text-purple-600 transition-all" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <div className="text-6xl mb-3">🔍</div>
                    <p className="text-gray-600 font-medium">No products found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Recent Searches */}
            {!searchQuery.trim() && recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock size={18} />
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(query)}
                      className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-600 rounded-full text-sm transition-all duration-300 flex items-center gap-2"
                    >
                      <Search size={14} />
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Products */}
            {!searchQuery.trim() && trendingProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-orange-500" />
                  <span className="text-lg font-semibold text-gray-900">Trending Products</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {trendingProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-purple-50 transition-all duration-300">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-20 object-contain"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 group-hover:text-purple-600 text-center">
                        {product.title.length > 30 ? product.title.substring(0, 27) + '...' : product.title}
                      </p>
                      <p className="text-purple-600 font-bold text-sm mt-1 text-center">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Search size={14} />
                  <span>Try: "laptop", "shirt", "jewelry"</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>Use specific keywords for better results</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Press Enter to see all results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-slide-down {
            animation: slide-down 0.4s ease-out;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c084fc;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9333ea;
          }
        `
      }} />
    </>
  );
};

export default SearchProduct;