import React, { useState, useEffect } from 'react';
import api from '../service/api';
import ViewDetailProduct from './ViewDetailProduct';
import { 
    ShoppingBag, X, Minus, Plus, Trash2, Eye, Star, Heart, 
    ChevronRight, Filter, Grid, List, Loader, 
    Grid3x3, Shirt, Sofa, Smartphone, Book, 
    Home, Laptop, Watch, Gift, Sparkles 
} from 'lucide-react';

const ProductFeature = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [viewMode, setViewMode] = useState('grid');
    
    // Pagination states
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Category icon mapping
    const getCategoryIcon = (category) => {
        const iconMap = {
            "men's clothing": <Shirt size={18} />,
            "women's clothing": <Shirt size={18} />,
            "jewelery": <Sparkles size={18} />,
            "electronics": <Smartphone size={18} />,
            "furniture": <Sofa size={18} />,
            "books": <Book size={18} />,
            "home decor": <Home size={18} />,
            "laptops": <Laptop size={18} />,
            "watches": <Watch size={18} />,
            "gifts": <Gift size={18} />,
            "Uncategorized": <Grid3x3 size={18} />
        };
        return iconMap[category] || <Grid3x3 size={18} />;
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
        const savedCart = localStorage.getItem('cart');
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Filter and sort products when dependencies change
    useEffect(() => {
        filterAndSortProducts();
    }, [products, selectedCategory, sortBy, priceRange]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
        setHasMore(true);
    }, [filteredProducts]);

    // Update displayed products when filtered products or current page changes
    useEffect(() => {
        const start = 0;
        const end = currentPage * itemsPerPage;
        const productsToShow = filteredProducts.slice(start, end);
        setDisplayedProducts(productsToShow);
        setHasMore(end < filteredProducts.length);
    }, [filteredProducts, currentPage, itemsPerPage]);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await api.getProducts();
            setProducts(data);
            setFilteredProducts(data);
            
            const uniqueCategories = [...new Set(data.map(product => product.category || 'Uncategorized'))];
            setCategories(uniqueCategories);
            
            const maxPrice = Math.max(...data.map(p => p.price));
            setPriceRange(prev => ({ ...prev, max: Math.ceil(maxPrice) }));
            
            setError(null);
        } catch (err) {
            setError('Failed to fetch products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = [...products];
        
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => 
                (product.category || 'Uncategorized') === selectedCategory
            );
        }
        
        filtered = filtered.filter(product => 
            product.price >= priceRange.min && product.price <= priceRange.max
        );
        
        switch(sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }
        
        setFilteredProducts(filtered);
    };

    const loadMoreProducts = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowDetailModal(true);
    };

    const toggleWishlist = (product) => {
        if (wishlist.find(item => item.id === product.id)) {
            setWishlist(wishlist.filter(item => item.id !== product.id));
            const btn = document.getElementById(`wishlist-${product.id}`);
            if (btn) {
                btn.classList.add('scale-75');
                setTimeout(() => btn.classList.remove('scale-75'), 300);
            }
        } else {
            setWishlist([...wishlist, product]);
            const btn = document.getElementById(`wishlist-${product.id}`);
            if (btn) {
                btn.classList.add('scale-125');
                setTimeout(() => btn.classList.remove('scale-125'), 300);
            }
        }
    };

    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
            
            const btn = document.getElementById(`cart-btn-${product.id}`);
            if (btn) {
                btn.innerHTML = 'Added! ✓';
                btn.classList.add('bg-green-500');
                setTimeout(() => {
                    btn.innerHTML = 'Add to Cart';
                    btn.classList.remove('bg-green-500');
                }, 1500);
            }
        } else {
            setCart([...cart, { ...product, quantity: quantity }]);
            
            const btn = document.getElementById(`cart-btn-${product.id}`);
            if (btn) {
                btn.innerHTML = 'Added! ✓';
                btn.classList.add('bg-green-500');
                setTimeout(() => {
                    btn.innerHTML = 'Add to Cart';
                    btn.classList.remove('bg-green-500');
                }, 1500);
            }
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

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

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setCart([]);
        }
    };

    const checkout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`🎉 Order placed successfully! Total: $${getCartTotal()}`);
        clearCart();
        setShowCart(false);
    };

    const renderStars = (rating) => {
        const stars = [];
        const rate = rating?.rate || 4.5;
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<Star key="half" size={16} className="fill-yellow-400 text-yellow-400 opacity-50" />);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i} size={16} className="text-gray-300" />);
        }
        return stars;
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50/30 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Our Collection
                            </span>
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our curated collection of high-quality products at amazing prices
                    </p>
                </div>

                {/* Items Per Page Selector */}
                <div className="flex justify-end mb-4">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value={4}>Show 4</option>
                        <option value={8}>Show 8</option>
                        <option value={12}>Show 12</option>
                        <option value={16}>Show 16</option>
                        <option value={20}>Show 20</option>
                    </select>
                </div>

                {/* Category Navigation with Icons */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-3">
                            {/* All Products Button */}
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                    selectedCategory === 'all'
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                                }`}
                            >
                                <Grid3x3 size={18} />
                                All Products
                            </button>
                            
                            {/* Category Buttons with Icons */}
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                                    }`}
                                >
                                    {getCategoryIcon(category)}
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Best Rating</option>
                                <option value="name">Name A-Z</option>
                            </select>

                            <button
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-purple-50 transition-all"
                            >
                                {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
                            </button>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-purple-50 transition-all flex items-center gap-2"
                            >
                                <Filter size={16} />
                                Filters
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mt-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 animate-fade-in">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-sm text-gray-600 block mb-2">Price Range</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                            className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                            placeholder="Min"
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                            className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                            placeholder="Max"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPriceRange({ min: 0, max: 1000 })}
                                    className="text-purple-600 text-sm hover:text-purple-700"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 text-sm">
                        Showing <span className="font-semibold text-purple-600">{displayedProducts.length}</span> of <span className="font-semibold">{filteredProducts.length}</span> products
                    </p>
                    {selectedCategory !== 'all' && (
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                            Clear filter <ChevronRight size={14} />
                        </button>
                    )}
                </div>

                {/* Cart Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="relative bg-white p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    >
                        <ShoppingBag size={24} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
                        {getCartItemCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                                {getCartItemCount()}
                            </span>
                        )}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 animate-shake">
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="float-right font-bold hover:text-red-900">×</button>
                    </div>
                )}

                {/* Loading Indicator */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-600 mx-auto"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ShoppingBag size={24} className="text-purple-600 animate-pulse" />
                                </div>
                            </div>
                            <p className="mt-6 text-gray-600 font-medium">Loading amazing products...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Products Grid/List View */}
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            : "space-y-4"
                        }>
                            {displayedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={viewMode === 'grid'
                                        ? "group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                        : "group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl flex"
                                    }
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    {/* Product Image */}
                                    <div className={`relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 cursor-pointer ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className={`w-full object-contain transition-all duration-700 group-hover:scale-110 ${viewMode === 'grid' ? 'h-64 p-6' : 'h-48 p-4'}`}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                                            }}
                                        />
                                        
                                        <button
                                            id={`wishlist-${product.id}`}
                                            onClick={() => toggleWishlist(product)}
                                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg z-10"
                                        >
                                            <Heart 
                                                size={18} 
                                                className={`transition-all duration-300 ${wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                            />
                                        </button>
                                        
                                        {hoveredProduct === product.id && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center transition-all duration-500 animate-fade-in">
                                                <button
                                                    onClick={() => handleViewDetails(product)}
                                                    className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                                                >
                                                    <Eye size={16} />
                                                    Quick View
                                                </button>
                                            </div>
                                        )}

                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                                            -33%
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className={`p-5 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                                        <div>
                                            <div className="mb-3">
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full">
                                                    {getCategoryIcon(product.category || 'Uncategorized')}
                                                    {product.category || 'Uncategorized'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex items-center gap-0.5">
                                                    {renderStars(product.rating)}
                                                </div>
                                                <span className="text-gray-500 text-xs">
                                                    ({product.rating?.count || Math.floor(Math.random() * 200) + 10})
                                                </span>
                                            </div>

                                            <h3 
                                                className="font-bold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors duration-300"
                                                onClick={() => handleViewDetails(product)}
                                            >
                                                {product.title.length > (viewMode === 'list' ? 80 : 50) 
                                                    ? product.title.substring(0, viewMode === 'list' ? 80 : 50) + '...' 
                                                    : product.title}
                                            </h3>

                                            {viewMode === 'list' && (
                                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                                </span>
                                                <span className="text-gray-400 line-through text-sm">
                                                    ${(product.price * 1.5).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(product)}
                                                className="flex-1 border-2 border-purple-600 text-purple-600 px-3 py-2.5 rounded-xl font-semibold text-sm hover:bg-purple-600 hover:text-white transition-all duration-300 hover:shadow-md"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                id={`cart-btn-${product.id}`}
                                                onClick={() => addToCart(product)}
                                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1"
                                            >
                                                <ShoppingBag size={16} />
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMore && filteredProducts.length > itemsPerPage && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={loadMoreProducts}
                                    disabled={loadingMore}
                                    className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loadingMore ? (
                                        <>
                                            <Loader size={20} className="animate-spin inline-block mr-2" />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load More Products
                                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                                                ↓
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Show all products button when all are loaded */}
                        {!hasMore && filteredProducts.length > itemsPerPage && (
                            <div className="text-center mt-8">
                                <p className="text-gray-500 text-sm">
                                    You've seen all {filteredProducts.length} products
                                </p>
                                <button
                                    onClick={() => {
                                        setCurrentPage(1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                    Back to top ↑
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && !error && (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="text-8xl mb-6 animate-bounce">🔍</div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            No Products Found
                        </h3>
                        <p className="text-gray-600">Try adjusting your filters or browse other categories</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('default');
                                setPriceRange({ min: 0, max: 1000 });
                                setCurrentPage(1);
                            }}
                            className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            Clear all filters →
                        </button>
                    </div>
                )}

                {/* Shopping Cart Sidebar */}
                {showCart && (
                    <>
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" onClick={() => setShowCart(false)}></div>
                        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                                    <p className="text-purple-100 text-sm mt-1">{getCartItemCount()} item(s)</p>
                                </div>
                                <button onClick={() => setShowCart(false)} className="text-white hover:text-gray-200 transition-all duration-300 hover:rotate-90 p-1">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-5">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-7xl mb-4 animate-pulse">🛒</div>
                                        <p className="text-gray-500 font-medium">Your cart is empty</p>
                                        <p className="text-gray-400 text-sm mt-2">Add some products to get started!</p>
                                        <button onClick={() => setShowCart(false)} className="mt-6 text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                            Continue Shopping →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 animate-slide-in-up">
                                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-2">
                                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.title}</h3>
                                                    <p className="text-purple-600 font-bold mt-1">${item.price}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all hover:scale-105">
                                                            <Minus size={14} className="mx-auto" />
                                                        </button>
                                                        <span className="text-sm font-semibold min-w-[24px] text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all hover:scale-105">
                                                            <Plus size={14} className="mx-auto" />
                                                        </button>
                                                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600 transition-all hover:scale-105">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {cart.length > 0 && (
                                <div className="border-t border-gray-200 p-5 bg-gray-50">
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-900 font-medium">${getCartTotal()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-green-600 font-medium">Free</span>
                                        </div>
                                        <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
                                            <span>Total</span>
                                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${getCartTotal()}</span>
                                        </div>
                                    </div>
                                    <button onClick={checkout} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-2">
                                        Checkout →
                                    </button>
                                    <button onClick={clearCart} className="w-full text-gray-500 text-sm hover:text-gray-600 transition-all">
                                        Clear Cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Product Detail Modal */}
                <ViewDetailProduct 
                    product={selectedProduct}
                    isOpen={showDetailModal}
                    onClose={() => {
                        setShowDetailModal(false);
                        setSelectedProduct(null);
                    }}
                    onAddToCart={(productWithQuantity) => {
                        if (selectedProduct) {
                            addToCart(selectedProduct, productWithQuantity?.quantity || 1);
                            setShowDetailModal(false);
                        }
                    }}
                />
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes slide-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
                .animate-slide-in-up { animation: slide-in-up 0.3s ease-out; }
                .animate-shake { animation: shake 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default ProductFeature;