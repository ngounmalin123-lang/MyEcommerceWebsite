import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Star, Truck, Shield, RefreshCw, Heart, Minus, Plus } from 'lucide-react';

const ViewDetailProduct = ({ product, isOpen, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuantity(1);
            setAddingToCart(false);
            setActiveImage(0);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    // Sample gallery images (using product image for demo)
    const galleryImages = [product.image, product.image, product.image];

    const renderStars = (rating) => {
        const stars = [];
        const rate = rating?.rate || 4.5;
        const fullStars = Math.floor(rate);
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i} size={16} className="text-gray-300" />);
        }
        return stars;
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        onAddToCart({ ...product, quantity });
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Left - Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative bg-gray-50 rounded-xl p-6 flex items-center justify-center min-h-[400px]">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition z-10"
                                >
                                    <Heart 
                                        size={18} 
                                        className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}
                                    />
                                </button>
                                <img 
                                    src={galleryImages[activeImage]} 
                                    alt={product.title}
                                    className="w-full h-auto max-h-80 object-contain"
                                />
                            </div>
                            
                            {/* Thumbnails */}
                            <div className="flex gap-2 justify-center">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                            activeImage === idx ? 'border-purple-500 shadow-md' : 'border-transparent hover:border-gray-300'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Thumbnail ${idx + 1}`} 
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right - Product Info */}
                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <span className="inline-block text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                    {product.category || 'Product'}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({product.rating?.count || 128} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-purple-600">
                                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                </span>
                                <span className="text-gray-400 line-through text-sm">
                                    ${(product.price * 1.5).toFixed(2)}
                                </span>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Save 33%
                                </span>
                            </div>

                            {/* Description */}
                            <div className="py-2">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-lg font-semibold w-8 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                                    >
                                        <Plus size={14} />
                                    </button>
                                    <span className="text-sm text-gray-500 ml-2">
                                        Total: ${((product.price || 0) * quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-3 py-3">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Truck size={14} className="text-purple-500 flex-shrink-0" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Shield size={14} className="text-purple-500 flex-shrink-0" />
                                    <span>2 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <RefreshCw size={14} className="text-purple-500 flex-shrink-0" />
                                    <span>30 Day Returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <ShoppingBag size={14} className="text-purple-500 flex-shrink-0" />
                                    <span>Secure Checkout</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={addingToCart}
                                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {addingToCart ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag size={18} />
                                            Add to Cart - ${((product.price || 0) * quantity).toFixed(2)}
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                >
                                    Continue Shopping
                                </button>
                            </div>

                            {/* Stock Info */}
                            <div className="text-center pt-2">
                                <p className="text-xs text-gray-400">
                                    ✓ In stock • Ready to ship
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailProduct;