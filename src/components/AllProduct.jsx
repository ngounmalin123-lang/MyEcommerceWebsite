import React, { useState, useEffect } from 'react';
import api from '../service/api';
import ViewDetailProduct from './ViewDetailProduct';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Filter and sort products whenever dependencies change
    useEffect(() => {
        let result = [...products];
        
        // Filter by search term
        if (searchTerm) {
            result = result.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory);
        }
        
        // Sort products
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }
        
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [products, searchTerm, selectedCategory, sortBy]);

    // GET: Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await api.getProducts();
            setProducts(data);
            setFilteredProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // GET: Fetch categories
    const fetchCategories = async () => {
        try {
            const data = await api.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    // Handle view product details
    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowDetailModal(true);
    };

    // Add to cart functionality
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
            alert(`Added another ${product.title} to cart!`);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
            alert(`${product.title} added to cart!`);
        }
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        alert('Product removed from cart!');
    };

    // Update quantity
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
    };

    // Calculate cart total
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Get cart item count
    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    // Clear cart
    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setCart([]);
            alert('Cart cleared!');
        }
    };

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSortBy('default');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with Cart */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                            All Products
                        </h1>
                        <p className="text-gray-600">Browse our complete collection of amazing products</p>
                    </div>
                    
                    {/* Cart Button */}
                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
                        </svg>
                        {getCartItemCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {getCartItemCount()}
                            </span>
                        )}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 shadow-md">
                        <div className="flex justify-between items-center">
                            <span>{error}</span>
                            <button 
                                onClick={() => setError(null)}
                                className="text-red-700 font-bold hover:text-red-900"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 flex items-center space-x-3 shadow-xl">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="text-gray-700 font-medium">Loading products...</span>
                        </div>
                    </div>
                )}

                {/* Shopping Cart Sidebar */}
                {showCart && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                {cart.length === 0 ? (
                                    <div className="text-center py-8">
                                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
                                        </svg>
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>
                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <div key={item.id} className="border-b py-4">
                                                <div className="flex gap-4">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title}
                                                        className="w-20 h-20 object-contain bg-gray-50 rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-blue-600 font-bold mt-1">
                                                            ${item.price.toFixed(2)}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="ml-auto text-red-600 hover:text-red-700 text-sm"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="mt-6 pt-4 border-t">
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold">Total:</span>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    ${getCartTotal()}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => alert('Checkout functionality coming soon!')}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                                                >
                                                    Proceed to Checkout
                                                </button>
                                                <button
                                                    onClick={clearCart}
                                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                                >
                                                    Clear Cart
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Filter & Sort Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search Bar */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                placeholder="Search by title or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    {(searchTerm || selectedCategory !== 'all' || sortBy !== 'default') && (
                        <div className="mt-4 text-right">
                            <button
                                onClick={resetFilters}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {currentProducts.length} of {filteredProducts.length} products
                    </p>
                </div>

                {/* Products Grid */}
                {!loading && currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div 
                                        className="relative h-56 overflow-hidden bg-gray-100 cursor-pointer"
                                        onClick={() => handleViewDetails(product)}
                                    >
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="p-5">
                                        <h3 
                                            className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[56px] cursor-pointer hover:text-blue-600"
                                            onClick={() => handleViewDetails(product)}
                                        >
                                            {product.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[40px]">
                                            {product.description}
                                        </p>
                                        
                                        <div className="mb-3">
                                            <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {product.category}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-1 text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
                                                </svg>
                                                Add to Cart
                                            </button>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleViewDetails(product)}
                                            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all text-sm font-medium"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 border rounded-lg transition-all ${
                                            currentPage === number
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    !loading && (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-2 text-gray-500">Try adjusting your filters or search term.</p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )
                )}

                {/* View Detail Product Modal */}
                <ViewDetailProduct 
                    product={selectedProduct}
                    isOpen={showDetailModal}
                    onClose={() => {
                        setShowDetailModal(false);
                        setSelectedProduct(null);
                    }}
                    onAddToCart={() => {
                        if (selectedProduct) {
                            addToCart(selectedProduct);
                            setShowDetailModal(false);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default AllProduct;